import { currentUser } from "@clerk/nextjs/server";
import { db } from "../db";
import { redirect } from "next/navigation";

export default async function Home() {
  const auth = await currentUser();

  if (!auth) return redirect("/signin");

  const user = await db.user.findUnique({
    where: {
      externalId: auth.id,
    },
  });

  if (!user) return redirect("/signin");

  return (
    <div>
      <h1 className="text-2xl mb-4">Welcome,{user?.fullName}</h1>
      <p>
        This is going to be dashboard. Please go to Courses and add New Course.
      </p>
    </div>
  );
}
