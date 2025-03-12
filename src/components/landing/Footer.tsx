import Link from "next/link";

function Footer() {
  return (
    <footer className="border-t w-full bg-muted/20">
      <div className="container mx-auto px-4 py-4 lg:px-8 border-t">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CertifyPro. All rights reserved.
          </p>
          <div className="flex gap-4">
            <p className="text-sm text-muted-foreground">
              Developed by
              <Link href="https://github.com/anudeep348">
                {" "}
                Anudeep Sirigiri
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
