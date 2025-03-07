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
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { createCourse } from "@/lib/actions/courseActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TemplateGallery } from "@/components/courses/TemplateGallery";
// import { useMutation } from "@tanstack/react-query";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Course name must be at least 2 characters.",
  }),
  startDate: z.date({
    required_error: "Start date is required.",
  }),
  endDate: z.date({
    required_error: "End date is required.",
  }),
  description: z.string().optional(),
});

export function CourseForm() {
  const [isPending, setIsPending] = useState<boolean | undefined>(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null
  );
  const [selectedBadgeId, setSelectedBadgeId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("details");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // const { mutate: onFormSubmit, isPending } = useMutation({
  //   mutationKey: ["course-creation"],
  //   mutationFn: onSubmit,
  // });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!selectedTemplateId) {
      toast.error("Template required", {
        description: "Please select a certificate template.",
      });
      setActiveTab("templates");
      return;
    }

    if (!selectedBadgeId) {
      toast.error("Badge required", {
        description: "Please select a certificate badge.",
      });
      setActiveTab("templates");
      return;
    }

    setIsPending(true);
    try {
      const templateUrl = `https://pub-c2c4a8da5d0f487b97550528cc38d19d.r2.dev/templates/${selectedTemplateId}.png`;
      const badgeUrl = `https://pub-c2c4a8da5d0f487b97550528cc38d19d.r2.dev/badges/${selectedBadgeId}.png`;

      await createCourse({
        ...values,
        templateUrl,
        badgeUrl,
      });

      toast.success("Course created", {
        description: "Your course has been created successfully.",
      });

      router.push("/courses");
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Failed to create course. Please try again.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Course Details</TabsTrigger>
            <TabsTrigger value="templates">Templates & Badges</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6 pt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Web Development Fundamentals"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The full name of the course.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      The date when the course begins.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      The date when the course ends.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter course description..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A brief description of the course content.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="button" onClick={() => setActiveTab("templates")}>
                Next: Choose Templates
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6 pt-4">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium">
                  Certificate Templates and Badges
                </h2>
                <p className="text-sm text-muted-foreground">
                  Choose from our predefined templates and badges for your
                  course certificates.
                </p>
              </div>

              <TemplateGallery
                selectedTemplateId={selectedTemplateId}
                selectedBadgeId={selectedBadgeId}
                onTemplateSelect={setSelectedTemplateId}
                onBadgeSelect={setSelectedBadgeId}
              />
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => setActiveTab("details")}
              >
                Back to Details
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Course
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
}
