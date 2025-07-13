import { JobForm } from "@/components/ui/Forms/postJob";

const PostAJob = () => {
    return (
        <div className="w-full min-h-screen bg-gray-100 pb-10 overflow-x-hidden bg-red-500">
            <div className="mt-7 w-full max-w-xl mx-auto flex flex-col shadow-md px-6 py-8 rounded-md bg-white">
                <JobForm/>
            </div>
        </div>
    );
}

export default PostAJob;