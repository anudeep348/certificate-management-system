import { db } from "@/app/db";
import { CourseForm } from "@/components/courses/CourseForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

async function NewCoursePage() {
  const auth = await currentUser();

  if (!auth) return redirect("/signin");

  const user = await db.user.findUnique({
    where: {
      externalId: auth.id,
    },
  });

  if (!user) return redirect("/signin");
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button variant="secondary" asChild>
          <Link href="/courses">
            <ArrowLeft className="h-4 w-4" />
            <p className="ml-2">Go Back</p>
          </Link>
        </Button>
      </div>
      <div className="max-w-5xl min-w-xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-6 text-center">
          Create New Course
        </h1>
        <Card className="p-8 shadow-lg">
          <CourseForm />
        </Card>
      </div>
    </div>
  );
}

export default NewCoursePage;
