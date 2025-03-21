import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form";
import { Input } from "../input";
import { useMultiStepForm } from "@/hooks/use-multistep";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


const formSchema = z
    .object({
        name: z.string().optional(), // type fixing
        email: z.string().email("Invalid email address entered").optional(),
        company_name: z.string({ required_error: "Company name is required" }),
        company_email: z.string().email("Invalid email address entered"),
        company_description: z.string().min(2, "More details is required"),
        company_web_url: z.string().url(),

        //second stage
        phone: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid phone number. Must be 10 digits and can start with +"),
        address: z.string().min(1, "Address is required"),
        password: z.string()
            .min(8, "Password must be at least 8 characters long")
            .max(50, "Password must not exceed 50 characters")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            .regex(/[0-9]/, "Password must contain at least one number")
            .regex(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&)"),
        confirm_password: z.string().min(1, "Confirm password to proceed"),
    }).refine((data) => data.password === data.confirm_password, {
        message: "Passwords must match",
        path: ["confirm_password"]
    });


export function MultiStepViewer({ form }: { form: any }) {
    const stepFormElements: { [key: number]: JSX.Element } = {
        0: <>
        <h3 className="text-lg font-bold">Company General Info</h3>
            <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel>Company name</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Enter your company name"
                                type={"text"}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="company_email"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel>Company email</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Enter your email"
                                type={"email"}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="company_description"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Company Description</FormLabel>
                        <FormControl>
                            <textarea
                                {...field}
                                placeholder="Short summary of your company"
                                className="w-full rounded-md border px-3 py-2"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="company_web_url"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel>Company Web Url</FormLabel>
                        <FormControl>
                            <Input
                                type="url"
                                placeholder="Your company web url"
                                {...field}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
        </>,
        1: <>
            <h3 className="text-lg font-bold">Company Personal Info</h3>
            <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel>Company Phone Number</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Company Phone Number"
                                {...field}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel>Company Address</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Region, Country"
                                {...field}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input
                                type="password"
                                placeholder="Password"
                                {...field}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                            <Input
                                type="password"
                                placeholder="Confirm your password"
                                {...field}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
        </>
    }
    const steps = Object.keys(stepFormElements).map(Number);

    const {
        currentStep,
        isLastStep,
        isFirstStep,
        goToNext,
        goToPrevious
    } = useMultiStepForm({
        initialSteps: steps,
        onStepValidation: async () => {
            const stepFields: { [key: number]: string[] } = {
                0: ["company_name", "company_email", "company_description", "company_web_url"],
                1: ["phone", "address", "password", "confirm_password"]
            }
            const fieldsToValidate = stepFields[currentStep - 1]
            const isValid = await form.trigger(fieldsToValidate);
            return isValid;
        }
    });
    const current = stepFormElements[currentStep - 1]
    return (
        <div className="flex flex-col gap-2">
            <div>
                <span className="">
                    Step {currentStep} of {steps.length}
                </span>
                {/* <Progress value={(currentStep / steps.length) * 100} className="bg-black"/> */}
                {/* <Progress value={progress} className="w-[60%] bg-black" /> */}
            </div>
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.4, type: 'spring' }}
                    className="flex flex-col gap-2"
                >
                    {current}
                </motion.div>
            </AnimatePresence>
            <div className="w-full flex justify-between">
                <Button onClick={goToPrevious} disabled={isFirstStep}>Previous</Button>
                {isLastStep ? (
                    <Button type="submit">Submit</Button>
                ) : (
                    <Button onClick={(e) => {
                        e.preventDefault()
                        goToNext()
                    }} type="button">Next</Button>
                )}
            </div>
        </div>
    )
}
const EmployerSignUp = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            company_name: '',
            company_email: '',
            company_description: '',
            company_web_url: '',
            address: '',
            phone: '',
            password: '',
            confirm_password: '',
            name: "",
            email: ""
        }
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        //to match database
        values["name"] = values["company_name"]
        values["email"] = values["company_email"]
        console.log(values)
    }

    return (
        <div>
            <Form {...form}>
                <form className="flex flex-col p-2 md:p-5 w-full mx-auto rounded-md max-w-3xl gap-2 border" onSubmit={form.handleSubmit(onSubmit)}>
                    <MultiStepViewer form={form} />
                </form>
            </Form>
        </div>
    );
}

export default EmployerSignUp;
