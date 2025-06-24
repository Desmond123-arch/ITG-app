import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form";
import { Input } from "../input";
import { Button } from "../button";
import { CheckCircleIcon, FileIcon, UploadIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { MultiSelect } from "../ multi-select";
import { Cat, Dog, Fish, Rabbit, Turtle } from "lucide-react";

const skills = [
    { value: "react", label: "React", icon: Turtle },
    { value: "angular", label: "Angular", icon: Cat },
    { value: "vue", label: "Vue", icon: Dog },
    { value: "svelte", label: "Svelte", icon: Rabbit },
    { value: "ember", label: "Ember", icon: Fish },
  ];

export const JobSeekerForms = () => {
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

    const formSchema = z.object({
        name: z.string().min(15, "Name is required").max(50),
        email: z.string().email("Invalid email address entered"),
        password: z.string()
            .min(8, "Password must be at least 8 characters long")
            .max(50, "Password must not exceed 50 characters")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            .regex(/[0-9]/, "Password must contain at least one number")
            .regex(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&)"),
        confirm_password: z.string().min(1, "Confirm password to proceed"),
        phone: z.string().regex(/^\+?[0-9]{10}$/, "Must be 10 digits (optionally start with +)"),
        address: z.string(),
        roleid: z.string(),
        skills: z.array(z.string()),
        disability_type: z.string().min(5, "Length must be at most 5"),
        resume: z
            .any()
            .refine((file) => file instanceof File, "File is required")
            .refine((file) => file?.size <= 5 * 1024 * 1024, "File must be under 5MB") // Max 5MB
            .refine(
                (file) => ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file?.type),
                "Only PDF and Word documents (DOC, DOCX) are allowed"
            ),
        preferred_location: z.string().min(5, "Location preference is required")
    }).refine((data) => data.password === data.confirm_password, { message: "Passwords must match", path: ["confirm_password"] })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            password: "",
            confirm_password: "",
            email: "",
            phone: "",
            address: "",
            roleid: "1",
            skills: [],
            preferred_location: "Remote"
        },

    })
    function onSubmit(values: z.infer<typeof formSchema>) {

        console.log(values)
    }
    const [fileName, setFileName] = useState("")
    const [isUploaded, setIsUploaded] = useState(false)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (file: File | null) => void) => {
        const file = e.target.files?.[0] || null;
        onChange(file);
        if (file) {
            setFileName(file.name);
            setIsUploaded(true);
        } else {
            setFileName("");
            setIsUploaded(false);
        }
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 p-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Full name" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Personal email" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirm_password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Re-type password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="+123456789" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Street, City" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="disability_type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Disability</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Blind" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="preferred_location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Preferred Location</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="skills"
                    render={() => (
                        <FormItem>
                            <FormLabel>Skills</FormLabel>
                            <FormControl>
                                <MultiSelect
                                    options={skills}
                                    onValueChange={setSelectedSkills}
                                    defaultValue={selectedSkills}
                                    placeholder="Select skills"
                                    variant="inverted"
                                    animation={2}
                                    maxCount={3}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="resume"
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                        <FormItem className="p-6 border rounded-lg shadow-sm">
                            <FormLabel>Resume</FormLabel>
                            <FormControl>
                                <div className="relative w-full">
                                    <div
                                        className={`relative border-2 border-dashed rounded-lg p-6 transition-all ${isUploaded ? "bg-primary/5 border-primary" : "hover:bg-muted/50 border-muted-foreground/25"}`}
                                    >
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            {isUploaded ? (
                                                <>
                                                    <CheckCircleIcon className="h-8 w-8 text-primary" />
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <FileIcon className="h-4 w-4 text-muted-foreground" />
                                                        <span className="text-sm font-medium truncate max-w-[250px]">{fileName}</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <UploadIcon className="h-8 w-8 text-muted-foreground" />
                                                    <p className="text-sm text-muted-foreground text-center">
                                                        Drag and drop your resume here or click to browse
                                                    </p>
                                                </>
                                            )}
                                            <Input
                                                type="file"
                                                accept=".pdf,.doc,.docx"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                onChange={(e) => handleFileChange(e, onChange)}
                                                {...fieldProps}
                                            />
                                        </div>
                                    </div>
                                    {isUploaded && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="mt-2 text-xs"
                                            onClick={() => {
                                                setFileName("")
                                                setIsUploaded(false)
                                            }}
                                        >
                                            Change file
                                        </Button>
                                    )}
                                </div>
                            </FormControl>
                            <FormMessage className="mt-2" />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-[85%] mx-auto">Submit</Button>
            </form>
        </Form>
    );
}

const baseEmployerSchema = z.object({
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(50, "Password must not exceed 50 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&)"),
    confirm_password: z.string().min(1, "Confirm password to proceed"),
    phone: z.string().regex(/^\+?[0-9]{10}$/, "Must be 10 digits (optionally start with +)"),
    address: z.string().min(1, "Address is required"),
    roleid: z.string().min(1, "Role is required"),

    // Employer-specific fields (company info)
    company_name: z.string().min(1, "Company name is required"),
    company_email: z.string().email("Invalid company email"),
    company_description: z
        .string()
        .min(10, "Description must be at least 10 characters")
        .max(300, "Description cannot exceed 300 characters"),
    company_web_url: z.string().url("Invalid company URL"),
    company_logo: z
        .any()
        .refine((file) => file instanceof File, "Logo file is required")
        .refine((file) => file.size <= 5 * 1024 * 1024, "File must be under 5MB") // 5MB limit
        .refine(
            (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
            "Only JPG, JPEG, or PNG images are allowed"
        ),
});

const employerSchema = baseEmployerSchema
    .refine((data) => data.password === data.confirm_password, {
        message: "Passwords must match",
        path: ["confirm_password"],
    })
    .transform((data) => ({
        ...data,
        name: data.company_name,
        email: data.company_email,
    }));

type EmployerFormValues = z.input<typeof baseEmployerSchema>;
type EmployerSubmitValues = z.output<typeof employerSchema>;

export const EmployerForms = () => {
    const form = useForm<EmployerFormValues>({
        resolver: zodResolver(employerSchema),
        defaultValues: {
            password: "",
            confirm_password: "",
            phone: "",
            address: "",
            roleid: "2",
            company_name: "",
            company_email: "",
            company_description: "",
            company_web_url: "",
            company_logo: null,
        },
    });


    const [logoName, setLogoName] = useState("");
    const [isLogoUploaded, setIsLogoUploaded] = useState(false);


    const handleLogoChange = (
        e: ChangeEvent<HTMLInputElement>,
        onChange: (file: File | null) => void
    ) => {
        const file = e.target.files?.[0] || null;
        onChange(file);
        if (file) {
            setLogoName(file.name);
            setIsLogoUploaded(true);
        } else {
            setLogoName("");
            setIsLogoUploaded(false);
        }
    };

    function onSubmit(values: EmployerFormValues) {
        const transformedData = employerSchema.parse(values) as EmployerSubmitValues;
        console.log("Employer form data:", transformedData);

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
                {/* COMPANY NAME */}
                <FormField
                    control={form.control}
                    name="company_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Your Company Name" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* COMPANY EMAIL */}
                <FormField
                    control={form.control}
                    name="company_email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company Email</FormLabel>
                            <FormControl>
                                <Input {...field} type="email" placeholder="info@company.com" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* PASSWORD */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input {...field} type="password" placeholder="Password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* CONFIRM PASSWORD */}
                <FormField
                    control={form.control}
                    name="confirm_password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input {...field} type="password" placeholder="Re-type Password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* PHONE */}
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="+1234567890" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* ADDRESS */}
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Street, City, Country" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />




                {/* COMPANY DESCRIPTION */}
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

                {/* COMPANY WEB URL */}
                <FormField
                    control={form.control}
                    name="company_web_url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company Website</FormLabel>
                            <FormControl>
                                <Input {...field} type="url" placeholder="https://yourcompany.com" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* COMPANY LOGO (File Upload) */}
                <FormField
                    control={form.control}
                    name="company_logo"
                    render={({ field: { value, onChange, ...rest } }) => (
                        <FormItem className="p-4 border border-dashed rounded-md">
                            <FormLabel>Company Logo</FormLabel>
                            <FormControl>
                                <div className="relative w-full h-32 flex flex-col items-center justify-center">
                                    <div
                                        className={`relative w-full h-full border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 transition-all ${isLogoUploaded ? "bg-primary/10 border-primary" : "hover:bg-muted/50 border-muted-foreground/25"
                                            }`}
                                    >
                                        {isLogoUploaded ? (
                                            <>
                                                <CheckCircleIcon className="h-8 w-8 text-primary" />
                                                <div className="flex items-center gap-2 mt-2">
                                                    <FileIcon className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm font-medium truncate max-w-[250px]">
                                                        {logoName}
                                                    </span>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <UploadIcon className="h-8 w-8 text-muted-foreground" />
                                                <p className="text-sm text-muted-foreground text-center">
                                                    Drag and drop or click to upload logo
                                                </p>
                                            </>
                                        )}
                                        <Input
                                            type="file"
                                            accept=".jpg,.jpeg,.png"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            onChange={(e) => handleLogoChange(e, onChange)}
                                            {...rest}
                                        />
                                    </div>
                                    {isLogoUploaded && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="mt-2 text-xs"
                                            onClick={() => {
                                                setLogoName("");
                                                setIsLogoUploaded(false);
                                                onChange(null);
                                            }}
                                        >
                                            Change Logo
                                        </Button>
                                    )}
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* SUBMIT */}
                <Button type="submit" className="w-[85%] mx-auto mt-4">
                    Submit
                </Button>
            </form>
        </Form>
    );
};
