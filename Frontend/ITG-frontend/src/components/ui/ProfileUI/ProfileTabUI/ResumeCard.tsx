import { User } from '@/types/User';
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import { FileBadge, Eye, Ellipsis } from 'lucide-react';
import { useRef } from 'react';

interface Props {
  user: User | null;
  onChangeResume?: (file: File) => void;
  onDeleteResume?: () => void;
}

const ResumeCard: React.FC<Props> = ({ user, onChangeResume, onDeleteResume }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!user?.job_seeker?.resume_url) return null;

  const resumeUrl = user.job_seeker.resume_url;

  const fileName = resumeUrl.split('/').pop() ?? 'resume.pdf';
  const extension = fileName.split('.').pop() ?? '';
  const nameWithExtension = `${user.name}.${extension}`;

  return (
    <div className="border rounded-md w-full p-5 md:min-w-[450px] sm:w-max">
      <div className="grid grid-cols-[20px_1fr_20px] w-full gap-5">
        <div className="relative top-1">
          <FileBadge />
        </div>
        <div className="flex flex-col">
          <h1 className="font-semibold text-black text-xl">{nameWithExtension}</h1>
        </div>
        <div>
          <Popover>
            <PopoverTrigger>
              <Ellipsis />
            </PopoverTrigger>
            <PopoverContent className="bg-white border flex flex-col gap-1 rounded-md p-1">
              <a
                className="rounded-sm px-2 py-1 hover:bg-gray-100 cursor-pointer text-left"
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Preview
              </a>
              <button
                className="rounded-sm px-2 py-1 hover:bg-gray-100 cursor-pointer text-left"
                onClick={() => fileInputRef.current?.click()}
                type="button"
              >
                Change
              </button>
              <a
                className="rounded-sm px-2 py-1 hover:bg-gray-100 cursor-pointer text-left"
                href={resumeUrl}
                download
              >
                Download
              </a>
              <button
                className="rounded-sm px-2 py-1 hover:bg-red-200 text-red-600 cursor-pointer text-left"
                type="button"
                onClick={() => {
                  if (confirm('Are you sure you want to delete your resume?')) {
                    onDeleteResume?.();
                  }
                }}
              >
                Delete
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
        style={{ display: 'none' }}
        onChange={(e) => {
          const selected = e.target.files?.[0];
          if (selected) {
            onChangeResume?.(selected);
          }
        }}
      />
    </div>
  );
};

export default ResumeCard;
