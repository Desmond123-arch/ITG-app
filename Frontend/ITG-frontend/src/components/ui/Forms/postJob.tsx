import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form"
import { Input } from "../input"
import { programmingSkills } from "@/store/options"
import { MultiSelect } from "../multi-select"

import { Popover, PopoverContent, PopoverTrigger } from "../popover"
import { format } from "date-fns"
import { Button } from "../button"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "../calendar"

const jobTypeOptions = [
  { value: "full_time", label: "Full Time" },
  { value: "part_time", label: "Part Time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
]

const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "closed", label: "Closed" },
]

const formSchema = z.object({
  title: z.string().min(5, "Job title is required"),
  description: z.string().min(10, "A job description is required"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  requirements: z.string().min(10, "The requirements for the job are required"),
  location: z.string().min(2, "Location is required"),
  yearsOfExperience: z.string().min(1, "Years of experience is required"),
  salaryRange: z.string().min(3, "A valid salary range is required"),
  jobType: z.string().min(3, "A valid job type is required"),
  status: z.string().min(3, "A valid status is required"),
  deadline: z.date(),
})

export function JobForm({ }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      skills: [],
      requirements: "",
      location: "",
      yearsOfExperience: "",
      salaryRange: "",
      jobType: "full_time",
      status: "draft",
      deadline: new Date(),
    }
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter job title" {...field} />
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
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    placeholder="Describe the job, responsibilities, etc."
                    className="w-full rounded-md border px-3 py-2 min-h-[80px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Skills</FormLabel>
                <MultiSelect
                  options={programmingSkills}
                  onValueChange={field.onChange}
                  defaultValue={[]}
                  placeholder="Select required skills"
                  variant="inverted"
                  maxCount={5}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="requirements"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Requirements</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    placeholder="List the requirements for the job (e.g. education, certifications, etc.)"
                    className="w-full rounded-md border px-3 py-2 min-h-[60px]"
                  />
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
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Accra, Ghana" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="yearsOfExperience"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Years of Experience</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 3+ years" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="salaryRange"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Salary Range</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. $1000 - $2000/month" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jobType"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Job Type</FormLabel>
                <FormControl>
                  <select
                    className="w-full rounded-md border px-3 py-2 text-base font-normal md:text-sm"
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <option value="" disabled>Select job type</option>
                    {jobTypeOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <select
                    className="w-full rounded-md border px-3 py-2 text-base font-normal md:text-sm"
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <option value="" disabled>Select status</option>
                    {statusOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Application Deadline</FormLabel>
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
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full text-center mt-6">Submit</Button>
        </form>
      </Form>
    </div>
  )
}
