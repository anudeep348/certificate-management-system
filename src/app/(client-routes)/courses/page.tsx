import { db } from "@/app/db";
import { CourseList } from "@/components/courses/CourseList";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

async function CoursesPage() {
  const auth = await currentUser();

  if (!auth) return redirect("/signin");

  const user = await db.user.findUnique({
    where: {
      externalId: auth.id,
    },
  });

  if (!user) return redirect("/signin");

  return (
    <MaxWidthWrapper className="flex w-full h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
        <Button asChild>
          <Link href="/courses/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Course
          </Link>
        </Button>
      </div>
      <CourseList />
    </MaxWidthWrapper>
  );
}

export default CoursesPage;
