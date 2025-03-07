import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { CertificateList } from "@/components/certificates/CertificateList";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/app/db";

async function CertificatesPage() {
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
        <h1 className="text-3xl font-bold tracking-tight">Certificates</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Generate All
        </Button>
      </div>
      <CertificateList />
    </div>
  );
}

export default CertificatesPage;
