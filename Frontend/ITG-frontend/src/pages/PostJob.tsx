import { JobForm } from "@/components/ui/Forms/postJob";

const PostAJob = () => {
    return (
        <div className="w-full h-max pb-10">
            <div className="mt-7 w-1/2 h-max mx-auto flex flex-col shadow-md px-6 py-4 rounded-md">
                <JobForm/>
            </div>
        </div>
    );
}

export default PostAJob;