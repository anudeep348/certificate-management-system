import { Button } from "@/components/ui/button";
import { PlusCircle, Upload } from "lucide-react";
import { RecipientList } from "@/components/recipients/RecipientsList";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/app/db";

async function RecipientsPage() {
  const auth = await currentUser();

  if (!auth) return redirect("/signin");

  const user = await db.user.findUnique({
    where: {
      externalId: auth.id,
    },
  });

  if (!user) return redirect("/signin");
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Recipients</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/recipients/upload">
              <Upload className="mr-2 h-4 w-4" />
              Bulk Upload
            </Link>
          </Button>
          <Button asChild>
            <Link href="/recipients/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Recipient
            </Link>
          </Button>
        </div>
      </div>
      <RecipientList />
    </div>
  );
}

export default RecipientsPage;
