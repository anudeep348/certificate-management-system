"use server";

import { db } from "@/app/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function getAuthSync() {
  const auth = await currentUser();

  if (auth == null) return redirect("/signup");

  const user = await db.user.findUnique({
    where: {
      externalId: auth.id,
    },
  });

  if (user) return redirect("/");

  await db.user.create({
    data: {
      firstName: auth.firstName || "",
      lastName: auth.lastName || "",
      fullName: auth.fullName!,
      email: auth.emailAddresses[0].emailAddress,
      externalId: auth.id,
    },
  });

  return JSON.stringify({ isSynced: true });
}
