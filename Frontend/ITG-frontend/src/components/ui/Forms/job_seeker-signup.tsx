import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "../form";
import { Input } from "../input";
import { useDispatch } from 'react-redux';
import { login } from "@/store/authSlice";
import { useMultiStepForm } from "@/hooks/use-multistep";
import { Button } from "../button";
import { motion, AnimatePresence } from 'framer-motion'
import { MultiSelect } from "../multi-select";
import { CheckCircleIcon, Eye, EyeOff, FileIcon, UploadIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { programmingSkills } from "@/store/options";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";

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
            .regex(/[@$!%*?&#]/, "Password must contain at least one special character (@$!%*?&#)"),
        confirm_password: z.string().min(1, "Confirm password to proceed"),
        phone: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid phone number. Must be 10 digits and can start with +"),
        address: z.string().min(1, "Address is required"),
        region: z.string().min(1, "Region is required"),
        disabilityType: z.string().min(1, "Disability is required"),
        preferredLocation: z.string().min(1, "Preferred location is required"),
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

    const [showPassword, setShowPassword] = useState({
        password: false,
        confirm_password: false,
    });

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
                            <FormLabel>Password</FormLabel>*
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        type={showPassword.password ? "text" : "password"}
                                        placeholder="Password"
                                        {...field}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => { setShowPassword({ ...showPassword, password: !showPassword.password }) }}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                        tabIndex={-1}
                                    >
                                        {showPassword.password ? <Eye size={16} /> : <EyeOff size={16} />}
                                    </Button>
                                </div>

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirm_password"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Confirm Password</FormLabel> *
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        type={showPassword.confirm_password ? "text" : "password"}
                                        placeholder="Confirm your password"
                                        autoComplete="new-password"
                                        {...field}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => { setShowPassword({ ...showPassword, confirm_password: !showPassword.confirm_password }) }}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                        tabIndex={-1}
                                    >
                                        {showPassword.confirm_password ? <Eye size={16} /> : <EyeOff size={16} />}
                                    </Button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </>,
        1: <><h3 className="text-lg font-bold">Personal Info</h3>
            <FormField
                control={form.control}
                name="disabilityType"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel>Disability Type</FormLabel> *

                        <FormControl>
                            <>
                                <Select
                                    value={["Low vision", "Blind", "Deaf", "Mobility", "Autism Spectrum Disorders", "Dyslexia", "Other"].includes(field.value) ? field.value : "Other"}
                                    onValueChange={(val) => {
                                        if (val !== "Other") {
                                            field.onChange(val);
                                        } else {
                                            // Keep the custom value as-is (don't override)
                                            field.onChange("");
                                        }
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select or enter your own" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Low vision">Low vision</SelectItem>
                                        <SelectItem value="Blind">Blind</SelectItem>
                                        <SelectItem value="Deaf">Deaf</SelectItem>
                                        <SelectItem value="Mobility">Mobility</SelectItem>
                                        <SelectItem value="Autism Spectrum Disorders">Autism Spectrum Disorders</SelectItem>
                                        <SelectItem value="Dyslexia">Dyslexia</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>

                                {(!["Low vision", "Blind", "Deaf", "Mobility", "Autism Spectrum Disorders", "Dyslexia"].includes(field.value)) && (
                                    <Input
                                        className="mt-2"
                                        placeholder="Please specify your disability"
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                    />
                                )}
                            </>
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel>Region</FormLabel> *

                        <FormControl>
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your region" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Greater Accra">Greater Accra</SelectItem>
                                    <SelectItem value="Ashanti">Ashanti</SelectItem>
                                    <SelectItem value="Central">Central</SelectItem>
                                    <SelectItem value="Western">Western</SelectItem>
                                    <SelectItem value="Eastern">Eastern</SelectItem>
                                    <SelectItem value="Volta">Volta</SelectItem>
                                    <SelectItem value="Northern">Northern</SelectItem>
                                    <SelectItem value="Upper East">Upper East</SelectItem>
                                    <SelectItem value="Upper West">Upper West</SelectItem>
                                    <SelectItem value="Bono">Bono</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel>City</FormLabel> *
                        <FormControl>
                            <Input
                                placeholder="City"
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
                                placeholder="0456720123"
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
                    return (
                        <FormItem className="w-full">
                            <FormLabel>Skills</FormLabel> *
                            <MultiSelect
                                options={programmingSkills}
                                onValueChange={(selected) => field.onChange(selected)}
                                defaultValue={[]}
                                placeholder="Select Skills"
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
                name="preferredLocation"
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
            // Define the fields that should be validated at each step
            const stepFields: { [key: number]: string[] } = {
                0: ["firstname", "lastname", "email", "password", "confirm_password"],
                1: ["disabilityType", "region","address", "phone", "preferredLocation"]
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
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            region:"",
            confirm_password: "",
            phone: "",
            address: "",
            disabilityType: "",
            preferredLocation: "",
            skills: [],
            name: ""
        },
    });
    async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        console.log('submitting');
        values["name"] = `${values.firstname} ${values.lastname}`;
        values["address"] = `${values.address}, ${values.region}`;

        let resumeUrl = "";

        if (values.resume) {
            const formData = new FormData();
            formData.append("file", values.resume);

            const uploadRes = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/files/upload`,
                formData,
                {
                    params: { email: values.email },
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const path = uploadRes.data?.data?.path;
            if (!path) throw new Error("Upload failed: no path returned");

            resumeUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/file-upload/${path}`;
        }

        const jsonData = {
            name: values.name,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirm_password,
            phone: values.phone,
            address: values.address,
            role: "job_seeker",
            disabilityType: values.disabilityType,
            preferredLocation: values.preferredLocation,
            skills: values.skills,
            resumeUrl,
        };

        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
            jsonData
        );

        console.log("submitted: ", response.data);
        const { user, token } = response.data;
        dispatch(login({ user, token }));
        localStorage.setItem("data", JSON.stringify(response.data));

        navigate('/');
        } catch (error: any) {
            if(error.response?.status === 409){
                navigate('/login')
            }
            console.error("Signup error:", error.response?.data || error.message);
        }
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


