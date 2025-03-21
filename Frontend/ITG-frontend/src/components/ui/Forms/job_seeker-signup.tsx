import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "../form";
import { Input } from "../input";
import { useMultiStepForm } from "@/hooks/use-multistep";
import { Button } from "../button";
import { motion, AnimatePresence } from 'framer-motion'
import { MultiSelect } from "../multi-select";
import { CheckCircleIcon, FileIcon, UploadIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";
const formSchema = z
    .object({
        firstname: z.string({ required_error: "First name is required" }).max(50),
        lastname: z.string({ required_error: "Last name is required" }).max(50),
        name: z.string().optional(), // type fixing
        email: z.string().email("Invalid email address entered"),
        password: z.string()
            .min(8, "Password must be at least 8 characters long")
            .max(50, "Password must not exceed 50 characters")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            .regex(/[0-9]/, "Password must contain at least one number")
            .regex(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&)"),
        confirm_password: z.string().min(1, "Confirm password to proceed"),
        phone: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid phone number. Must be 10 digits and can start with +"),
        address: z.string().min(1, "Address is required"),
        disability_type: z.string().min(1, "Disability is required"),
        preferred_location: z.string().min(1, "Preferred location is required"),
        skills: z.array(z.string()).min(1, "At least one skill is required"),
        resume: z
            .instanceof(File, { message: "File is required" })
            .refine((file) => file.size <= 5 * 1024 * 1024, "File must be under 5MB")
            .refine(
                (file) => ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type),
                "Only PDF and Word documents (DOC, DOCX) are allowed"
            ),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Passwords must match",
        path: ["confirm_password"],
    });

export function MultiStepViewer({ form }: { form: any }) {
    const [fileName, setFileName] = useState("");
    const [isFileUploaded, setisFileUploaded] = useState(false);

    const handleFileUpload = (
        e: ChangeEvent<HTMLInputElement>,
        onChange: (file: File | null) => void
    ) => {
        const file = e.target.files?.[0] || null;
        onChange(file);
        if (file) {
            setFileName(file.name);
            setisFileUploaded(true);
        } else {
            setFileName("");
            setisFileUploaded(false);
        }
    };


    const stepFormElements: {
        [key: number]: JSX.Element
    } = {
        0:
            <><h3 className="text-lg font-bold">General Info</h3>
                <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>First name</FormLabel> *
                            <FormControl>
                                <Input
                                    placeholder="Enter First Name"
                                    type={"text"}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )
                    }
                />
                <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Last Name</FormLabel> *
                            <FormControl>
                                <Input
                                    placeholder="Enter last name"
                                    type={"text"}
                                    value={field.value}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        field.onChange(val);
                                    }}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )
                    }
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Email</FormLabel> *
                            <FormControl>
                                <Input
                                    placeholder="john.doe@gmail.com"
                                    type={"text"}
                                    value={field.value}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        field.onChange(val);
                                    }}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )
                    }
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
                <FormField
                    control={form.control}
                    name="confirm_password"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Confirm Password</FormLabel> *
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
            </>,
        1: <div><h3 className="text-lg font-bold">Personal Info</h3>
            <FormField
                control={form.control}
                name="disability_type"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel>Disability Type</FormLabel> *
                        <FormControl>
                            <Input
                                placeholder="disability eg. Blind, Deaf"
                                type={"text"}
                                value={field.value}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    field.onChange(val);
                                }}
                            />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                )
                }
            />
            <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel>Address</FormLabel> *
                        <FormControl>
                            <Input
                                placeholder="City, Region"
                                type={"text"}
                                value={field.value}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    field.onChange(val);
                                }}
                            />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                )
                }
            />
            <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel>Phone number</FormLabel> *
                        <FormControl>
                            <Input
                                placeholder="+233 123 123 123"
                                type={"tel"}
                                value={field.value}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    field.onChange(val);
                                }}
                            />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                )
                }
            />

            <FormField
                control={form.control}
                name="skills"
                render={({ field }) => {
                    const options = [
                        { value: '1', label: 'Option 1' },
                        { value: '2', label: 'Option 2' },
                        { value: '3', label: 'Option 3' },
                    ]
                    return (
                        <FormItem className="w-full">
                            <FormLabel>Skills</FormLabel> *
                            <MultiSelect
                                options={options}
                                onValueChange={(selected) => field.onChange(selected)}
                                defaultValue={[]}
                                placeholder="Select frameworks"
                                variant="inverted"
                                // animation={2}
                                maxCount={3}
                            />
                            <FormMessage />
                        </FormItem>
                    )
                }}
            />
            <FormField
                control={form.control}
                name="preferred_location"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel>Preferred Location</FormLabel> *
                        <FormControl>
                            <Input
                                placeholder="eg. Remote, etc"
                                type={"text"}
                                value={field.value}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    field.onChange(val);
                                }}
                            />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                )
                }
            />
            <FormField
                control={form.control}
                name="resume"
                render={({ field: { value, onChange, ...rest } }) => {
                    return (
                        <FormItem className="w-full">
                            <FormLabel>Resume</FormLabel> *
                            <FormControl>
                                <div className="relative w-full h-32 flex flex-col items-center justify-center">
                                    <div
                                        className={`relative w-full h-full border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 transition-all ${isFileUploaded ? "bg-primary/10 border-primary" : "hover:bg-muted/50 border-muted-foreground/25"
                                            }`}
                                    >
                                        {isFileUploaded ? (
                                            <>
                                                <CheckCircleIcon className="h-8 w-8 text-primary" />
                                                <div className="flex items-center gap-2 mt-2">
                                                    <FileIcon className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm font-medium truncate max-w-[250px]">
                                                        {fileName}
                                                    </span>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <UploadIcon className="h-8 w-8 text-muted-foreground" />
                                                <p className="text-sm text-muted-foreground text-center">
                                                    Drag and drop or click to upload resume
                                                </p>
                                            </>
                                        )}
                                        <Input
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            onChange={(e) => handleFileUpload(e, onChange)}
                                            {...rest}
                                        />
                                    </div>
                                    {isFileUploaded && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="mt-2 text-xs"
                                            onClick={() => {
                                                setFileName("");
                                                setisFileUploaded(false);
                                                onChange(null); // Clear the file from form state
                                            }}
                                        >
                                            Change Resume
                                        </Button>
                                    )}
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )
                }}
            />

        </div>
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
            // Define the fields that should be validated at each step
            const stepFields: { [key: number]: string[] } = {
                0: ["firstname", "lastname", "email", "password", "confirm_password"],
                1: ["disability_type", "address", "phone", "preferred_location"]
            };
            // Get the fields for the current step
            const fieldsToValidate = stepFields[currentStep - 1];
            // Manually trigger validation for the specific fields
            const isValid = await form.trigger(fieldsToValidate);
            console.log(isValid)
            return isValid;
        },
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

const JobSeekerSignUp: React.FC = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirm_password: "",
            phone: "",
            address: "",
            disability_type: "",
            preferred_location: "",
            skills: [],
            name: ""
        },
    });
    function onSubmit(values: z.infer<typeof formSchema>) {
        values["name"] = `${values.firstname} ${values.lastname}`
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
    )
}

export default JobSeekerSignUp;


