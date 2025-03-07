"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Download, Loader2, Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { bulkUploadRecipients } from "@/lib/actions/recipientActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  courseId: z.string({
    required_error: "Please select a course.",
  }),
  file: z.instanceof(File, {
    message: "Please upload a file.",
  }),
});

// Mock course data
const courses = [
  { id: "WD101", name: "Web Development Fundamentals" },
  { id: "DS202", name: "Data Science Bootcamp" },
  { id: "UX303", name: "UX Design Principles" },
  { id: "MA404", name: "Mobile App Development" },
  { id: "CC505", name: "Cloud Computing Essentials" },
];

export function BulkUploadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  async function onSubmit() {
    setIsSubmitting(true);
    try {
      const { message } = await bulkUploadRecipients();
      toast.info(message);

      router.push("/recipients");
    } catch (error) {
      console.error("Error uploading recipients:", error);
      toast.error("Failed to upload recipients. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4">
            <h2 className="text-lg font-medium">Instructions</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Upload an Excel file (.xlsx) with recipient information. The file
              should have the following columns:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
              <li>Name (required): Full name of the recipient</li>
              <li>Email (required): Email address of the recipient</li>
            </ul>
            <div className="mt-4">
              <Button variant="outline" size="sm" asChild>
                <a href="/templates/recipients-template.xlsx">
                  <Download className="mr-2 h-4 w-4" />
                  Download Template
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="courseId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name} ({course.id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  The course for which the certificates will be issued.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="file"
            render={({ field: { onChange, ...rest } }) => (
              <FormItem>
                <FormLabel>Upload File</FormLabel>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      document.getElementById("file-upload")?.click()
                    }
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Select File
                  </Button>
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".xlsx"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setFile(e.target.files[0]);
                        onChange(e.target.files[0]);
                      }
                    }}
                    {...rest} 
                    value={undefined}
                  />
                  {file && (
                    <span className="text-sm text-muted-foreground">
                      {file.name}
                    </span>
                  )}
                </div>
                <FormDescription>
                  Upload an Excel file (.xlsx) with recipient information.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Upload Recipients
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
