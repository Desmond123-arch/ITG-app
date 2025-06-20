import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import JobSeekerSignUp from "@/components/ui/Forms/job_seeker-signup";
import EmployerSignUp from "@/components/ui/Forms/employer-signup";
import { Link } from "react-router-dom";

const SignUp = () => {
    return (
        <div className="bg-gray-100 w-full h-max pb-10">
            <div className="mt-7 w-full h-max mx-auto flex flex-col justify-center items-center">
                <Tabs defaultValue="job_seekers" className="w-full flex items-center flex-col" >
                    <div className="w-[80%] md:w-max mx-auto">
                        <TabsList className="flex w-full text-xl rounded-lg">
                            <TabsTrigger value="job_seekers" className="bg-gray-200 data-[state=active]:text-black data-[state=active]:bg-slate-50 data-[state=active]:font-semibold py-3 px-5 text-sm md:text-xl rounded-xl rounded-r-none border-r-2 ">For Job Seekers</TabsTrigger>
                            <TabsTrigger value="employers"  className="bg-gray-200 data-[state=active]:text-black data-[state=active]:bg-slate-50 data-[state=active]:font-semibold py-3 px-5 text-sm md:text-xl rounded-xl rounded-l-none border-l-2">For Employers</TabsTrigger>
                        </TabsList>
                    </div>
                    <div className="w-[80%] lg:w-[40%] shadow-md bg-slate-50 mt-0.5 rounded-md">
                        <TabsContent value="job_seekers" >
                            <JobSeekerSignUp />
                        </TabsContent>
                        <TabsContent value="employers">
                            <EmployerSignUp/>
                        </TabsContent>
                    </div>
                </Tabs>
                <p>Already have an account? <Link to={"/login"} className="underline text-blue-950">Log in</Link></p>
            </div>
        </div>
    );
}

export default SignUp;
