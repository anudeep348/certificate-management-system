import { db } from "@/app/db";
import { RecipientForm } from "@/components/recipients/RecipientForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

async function NewRecipientPage() {
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
          <Link href="/recipients">
            <ArrowLeft className="h-4 w-4" />
            <p className="ml-2">Go Back</p>
          </Link>
        </Button>
      </div>
      <div className="max-w-5xl min-w-xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-6 text-center">
          Add New Recipient
        </h1>
        <Card className="p-8 shadow-lg">
          <RecipientForm />
        </Card>
      </div>
    </div>
  );
}

export default NewRecipientPage;
