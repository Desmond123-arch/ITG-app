import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import JobSeekerSignUp from "@/components/ui/Forms/job_seeker-signup";
import EmployerSignUp from "@/components/ui/Forms/employer-signup";

const SignUp = () => {
    return (
        <div className="bg-gray-100 w-full h-full">
            <div className="mt-7 w-full h-max mx-auto flex justify-center">
                <Tabs defaultValue="job_seekers" className="w-full flex items-center flex-col" >
                    <div>
                        <TabsList className="flex w-full text-xl rounded-lg">
                            <TabsTrigger value="job_seekers" className="bg-gray-200 data-[state=active]:text-black data-[state=active]:bg-slate-50 data-[state=active]:font-semibold py-3 px-5 text-xl rounded-xl rounded-r-none border-r-2 ">For Job Seekers</TabsTrigger>
                            <TabsTrigger value="employers"  className="bg-gray-200 data-[state=active]:text-black data-[state=active]:bg-slate-50 data-[state=active]:font-semibold py-3 px-5 text-xl rounded-xl rounded-l-none border-l-2">For Employers</TabsTrigger>
                        </TabsList>
                    </div>
                    <div className="w-[80%] md:w-[40%] shadow-md bg-slate-50 mt-0.5 rounded-md">
                        <TabsContent value="job_seekers" >
                            <JobSeekerSignUp />
                        </TabsContent>
                        <TabsContent value="employers">
                            <EmployerSignUp/>
                        </TabsContent>
                    </div>
                </Tabs>

            </div>
        </div>
    );
}

export default SignUp;