import { currentUser } from "@clerk/nextjs/server";
import { db } from "../../db";
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
    <section className="container p-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome, {user?.fullName}
          </h1>
        </div>

        <p>dashboard is under development</p>
      </div>
    </section>
  );
}
