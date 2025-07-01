import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form"
import { Input } from "../input"
import { programmingSkills } from "@/store/options"
import { MultiSelect } from "../multi-select"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select"
import { Popover, PopoverContent, PopoverTrigger } from "../popover"
import { format } from "date-fns"
import { Button } from "../button"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "../calendar"


const formSchema = z.
    object({
        title: z.string().min(5, "Job title is required"),
        description: z.string().min(10, "A job description is required"),
        skills: z.array(z.string()).min(1, "At least one skill is required"),
        requirements: z.string().min(10, "The requirements for the job are required"),
        location: z.string(),
        region: z.string().optional(),
        yearsOfExperience: z.string(),
        salaryRange: z.string().min(3, "A valid salary range is required"),
        jobType: z.string().min(3, "A valid job type is required"),
        deadline: z.date()
    })

export function JobForm({ }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            skills: [],
            requirements: "",
            region: "",
            location: "",
            yearsOfExperience: "",
            salaryRange: "",
            jobType: "",
            deadline: new Date()
        }
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        values.location = `${values.location}, ${values.region}`
        delete values.region
        try {
            console.log("submitting");
            console.log(values);
        } catch (error) {
            throw error;
        }

    }

    return (
        <div className="w-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter job title"
                                        type={"text"}
                                        value={field.value}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            field.onChange(val);
                                        }} />

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Description</FormLabel> *
                                <FormControl>
                                    <Input
                                        placeholder="Describe the Job"
                                        type={"text"}
                                        value={field.value}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            field.onChange(val)
                                        }}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
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
                        name="requirements"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Requirements</FormLabel> *
                                <FormControl>
                                    <textarea
                                        {...field}
                                        placeholder="E.g. your main requirements"
                                        className="w-full rounded-md border px-3 py-2"
                                    />
                                </FormControl>
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
                        name="location"
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
                        name="yearsOfExperience"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Years of Experience required</FormLabel> *
                                <FormControl>
                                    <Input
                                        placeholder="What is the minium years of experience required"
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
                        name="salaryRange"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>What is the range of the expected Salary</FormLabel> *
                                <FormControl>
                                    <Input
                                        placeholder="What is the minium years of experience required"
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
                        name="jobType"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Job Type</FormLabel> *
                                <FormControl>
                                    <Input
                                        placeholder="What is the field of the job?"
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
                        name="deadline"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Job </FormLabel> *
                                <FormControl>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                data-empty={!field.value}
                                                className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
                                            >
                                                <span className="flex items-center gap-2">
                                                    <CalendarIcon className="h-4 w-4" />
                                                    <span>{field.value ? format(field.value, "PPP") : "Pick a date"}</span>
                                                </span>
                                            </Button>
                                        </PopoverTrigger>

                                        <PopoverContent className="w-auto p-0">
                                            <Calendar mode="single" selected={field.value} onSelect={(e) => field.onChange(e)} />
                                        </PopoverContent>
                                    </Popover>
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )
                        }
                    />
                </form>
            </Form>
        </div>
    )
}