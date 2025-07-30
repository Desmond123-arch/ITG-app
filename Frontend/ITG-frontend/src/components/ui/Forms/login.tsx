import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form";
import { Input } from "../input";
import { Button } from "../button";
import {useState} from 'react'
import axios from 'axios'
import { setSavedJobs } from "@/store/savedJobsSlice";
import { setAppliedJobs } from "@/store/seekerApplicationSlice";
import { login } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
    email: z.string().email("A valid email is required"),
    password: z.string({ required_error: "A password is required" }).min(3, "A valid password is required")
})

export const LoginForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState<string>('')
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signin`, values);
            const { status, data } = response.data;

            if (status === 'success') {
                const { user, accessToken, role } = data;
                dispatch(login({ user, token: accessToken, role }));
                axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
                console.log('logged in successfully')

                const [savedJobsRes, applicationsRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_BACKEND_URL}/jobseeker/saved`, {
                        headers: { Authorization: `Bearer ${accessToken}` },
                    }),
                    axios.get(`${import.meta.env.VITE_BACKEND_URL}/applications`, {
                        headers: { Authorization: `Bearer ${accessToken}` },
                    })
                ]);

                console.log('gotten all data')
                console.log("saved jobs: ", savedJobsRes.data.data)
                console.log("saved applications: ", applicationsRes.data)
                const savedJobIds = savedJobsRes.data.data.map((job: any) => job.job.id.toString());
                console.log('done mapping jobs: ', savedJobIds)
                const appliedJobIds = applicationsRes.data.data.jobs.map((app: any) => app.id.toString());
                console.log('done mapping appliactions', appliedJobIds)

                dispatch(setSavedJobs(savedJobIds));
                dispatch(setAppliedJobs(appliedJobIds));

                navigate('/');
            }
        } catch (error: any) {
            setError(error.response?.data?.message || "Login failed");
            console.error("Login error:", error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}  className="flex flex-col gap-6 bg-white border-2 shadow-lg rounded-md w-[60%] md:w-[30%] px-5 py-5 mx-auto">
                <h2 className="text-center text-2xl underline underline-offset-1">Login into your account</h2>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => {
                        return (
                            <FormItem className="w-full">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Email"
                                        type="email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                    }}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Password</FormLabel> *
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Enter your password"
                                    type="password"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )
                    }
                />
                {
                    error && <h1 className="text-red-600">{error}</h1>
                }
                <Button type="submit" className="w-full"> Log in</Button>
            </form>
        </Form>
    );
}