"use server";

import { db } from "@/app/db";
import { currentUser } from "@clerk/nextjs/server";

export async function getCertificates() {
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

  const certificatesData = await db.certificate.findMany({
    include: {
      recipient: true,
      course: true,
    },
  });

  const certificates = certificatesData.map((val) => {
    return {
      id: val.id,
      recipientName: val.recipient.name,
      recipientEmail: val.recipient.email,
      courseId: val.course.id,
      courseName: val.course.name,
      generatedAt: val.issuedAt,
      certificateUrl: val.qrCodeUrl,
    };
  });

  return certificates;
}
