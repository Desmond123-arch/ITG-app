import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { EmployerForms, JobSeekerForms } from "@/components/ui/SignUpUI/forms";
import { useState } from "react";
const SignUp = () => {
    const [currentForm, setCurrentForm] = useState("job_seeker")

    return (
        <div className="my-4 w-full">
            <h3 className="text-primary text-3xl text-center">Sign Up</h3>
            <div className="container w-[40%] mx-auto mt-5">
                <div className="flex items-center justify-center">
                    <Button
                        className={"border-none  bg-white hover:bg-slate-100 shadow-lg text-gray-600 p-7 text-xl rounded-r-none " + `${currentForm === 'job_seeker' ? "bg-gray-300" : "bg-white"}`}
                        onClick={() => setCurrentForm("job_seeker")}>
                        For Job Seekers
                    </Button>
                    <Button
                        className={"border-none bg-white hover:bg-slate-100 shadow-lg text-gray-600 p-7 text-xl rounded-l-none " + `${currentForm === 'employer' ? "bg-gray-300" : "bg-white"}`}
                        onClick={() => setCurrentForm("employer")}
                    >For Employers</Button>
                </div>
                <div className="rounded-md shadow-md border-t-2 border-slate-100">
                    {currentForm === "job_seeker" ?
                        (<JobSeekerForms />)
                        : (<EmployerForms />)}
                </div>

            </div>
        </div>
    );
}

export default SignUp;

{/* <Input type="text" placeholder="full name"/>
            <Input type="password" placeholder="password"/>
            <Input type="email" placeholder="email address"/>
            <Input type="tel" placeholder="Phone number"/>
            <Input type="text" placeholder="Address"/>

            <div>
                <Input  type="text" placeholder="Company name"></Input>
                <Input type="text" placeholder="Company description"></Input>
                <Input type="text" placeholder="Company email"></Input>
                <Input type="file" placeholder="Company logo"></Input>
                <Input type="url" placeholder="Company website link"></Input>
            </div>

            <div>
                <Input type="text" placeholder="Disability type"></Input>
                <Input type="file" placeholder="Resume"></Input>
                <Input type="text" placeholder="Skills"></Input>
                <Input type="text" placeholder="Preferred Job Location"></Input>
            </div> */}