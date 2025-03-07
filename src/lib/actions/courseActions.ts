"use server";

import { db } from "@/app/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

type CourseData = {
  name: string;
  startDate: Date;
  endDate: Date;
  description?: string;
  templateUrl: string;
  badgeUrl: string;
};

export async function createCourse(data: CourseData) {
  const auth = await currentUser();
  if (!auth) {
    throw new Error("Please Login First");
  }

  const user = await db.user.findFirst({
    where: {
      externalId: auth.id,
    },
  });

  if (!user) {
    throw new Error("No User Found. Please login");
  }

  try {
    await db.course.create({
      data: {
        name: data.name,
        startDate: data.startDate,
        endDate: data.endDate,
        description: data.description || "",
        templateUrl: data.templateUrl,
        badgeUrl: data.badgeUrl,
        createdBy: user.id,
      },
    });
    return { message: "ceated sucessfully" };
  } catch (error) {
    console.log(error);
    throw new Error("There was an error while creating the course");
  } finally {
    revalidatePath("/courses");
  }
}

export async function getCourses() {
  const auth = await currentUser();

  if (!auth) throw new Error("Please login first");

  const user = await db.user.findFirst({
    where: {
      externalId: auth.id,
    },
  });

  if (!user) throw new Error("No user found. Please login");

  const fullCourses = await db.course.findMany({
    where: {
      createdBy: user.id,
    },
    include: {
      recipients: true,
      certificates: true,
    },
  });

  const courses = fullCourses.map((val) => {
    return {
      id: val.id,
      name: val.name,
      startDate: val.startDate,
      endDate: val.endDate,
      recipentsCount: val.recipients.length,
      certificatesCount: val.certificates.length,
    };
  });

  return courses;
}
