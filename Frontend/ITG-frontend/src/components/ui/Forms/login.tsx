import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form";
import { Input } from "../input";
import { Button } from "../button";

const formSchema = z.object({
    email: z.string().email("A valid email is required"),
    password: z.string({ required_error: "A password is required" }).min(3, "A valid password is required")
})
export const LoginForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}  className="flex flex-col gap-6 bg-slate-50 border-2 shadow-lg rounded-md w-[60%] md:w-[30%] px-2 py-5 mx-auto">
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
                <Button type="submit" className="w-full"> Log in</Button>
            </form>
        </Form>
    );
}