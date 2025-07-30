import { User } from "@/types/User";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { FileBadge, Eye, Ellipsis, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateResumeUrl } from "@/store/authSlice";

interface Props {
  user: User | null;
  onRefresh?: () => void;
}

const ResumeCard: React.FC<Props> = ({ user, onRefresh }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  if (!user?.job_seeker?.resume_url) return null;

  const resumeUrl = user.job_seeker.resume_url;
  const fileName = resumeUrl.split("/").pop() ?? "resume.pdf";
  const extension = fileName.split(".").pop() ?? "";
  const nameWithExtension = `${user.name}.${extension}`;
  const BUCKET_NAME = "resumes";

  const handleDelete = async () => {
    if (!user?.email) return;
    setIsLoading(true);
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/files`, {
        params: { publicUrl: user.job_seeker?.resume_url },
      });

      dispatch(updateResumeUrl(null));
      toast.success("Resume deleted");
      onRefresh?.();
    } catch {
      toast.error("Failed to delete resume");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (file: File) => {
    if (!user?.email) return;

    const formData = new FormData();
    formData.append("file", file);
    setIsLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/files/upload`,
        formData,
        {
          params: {
            email: user.email,
            bucketName: BUCKET_NAME,
            isUpdate: true,
          },
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const newUrl = res.data?.data?.publicUrl;
      if (newUrl) {
        dispatch(updateResumeUrl(newUrl));
      }

      toast.success("Resume updated");
      onRefresh?.();
    } catch {
      toast.error("Failed to upload resume");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="border rounded-md w-full p-5 md:min-w-[450px] sm:w-max relative">
        <div className="grid grid-cols-[20px_1fr_20px] w-full gap-5">
          <div className="relative top-1">
            <FileBadge />
          </div>
          <div className="flex flex-col">
            <h1 className="font-semibold text-black text-xl">{nameWithExtension}</h1>
          </div>
          <div className="relative">
            <Popover>
              <PopoverTrigger disabled={isLoading}>
                <Ellipsis />
              </PopoverTrigger>

              <PopoverContent className="bg-white border flex flex-col gap-1 rounded-md p-1 relative">
                {isLoading && (
                  <div className="absolute inset-0 bg-white bg-opacity-70 z-10 flex items-center justify-center rounded-md">
                    <Loader2 className="animate-spin w-4 h-4 text-gray-500" />
                  </div>
                )}

                <a
                  className="rounded-sm px-2 py-1 hover:bg-gray-100 cursor-pointer text-left"
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Preview
                </a>

                <button
                  className="rounded-sm px-2 py-1 hover:bg-gray-100 cursor-pointer text-left flex items-center gap-2"
                  onClick={() => fileInputRef.current?.click()}
                  type="button"
                  disabled={isLoading}
                >
                  Change
                  {isLoading && <Loader2 className="animate-spin w-4 h-4" />}
                </button>

                <a
                  className="rounded-sm px-2 py-1 hover:bg-gray-100 cursor-pointer text-left"
                  href={`${import.meta.env.VITE_BACKEND_URL}/files/download?publicUrl=${encodeURIComponent(resumeUrl)}`}
                  download
                >
                  Download
                </a>

                <button
                  className="rounded-sm px-2 py-1 hover:bg-red-200 text-red-600 cursor-pointer text-left flex items-center gap-2"
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  disabled={isLoading}
                >
                  Delete
                  {isLoading && <Loader2 className="animate-spin w-4 h-4" />}
                </button>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="ml-[40px]">
          <p>Date added: 12/1/2024</p>
          <div className="flex gap-2 items-center mt-1">
            <Eye className="w-4 h-4" />
            <p className="text-sm text-gray-600">Visible to hiring employers</p>
          </div>
        </div>

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => {
            const selected = e.target.files?.[0];
            if (selected) handleUpload(selected);
          }}
        />
      </div>

      <ConfirmModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Resume?"
        description="Are you sure you want to delete your resume? This action cannot be undone."
      />
    </>
  );
};

export default ResumeCard;
