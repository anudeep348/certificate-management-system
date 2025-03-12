import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background py-20 md:py-32">
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl">
          Issue Professional Certificates <br className="hidden md:inline" />
          <span className="text-primary">With Just a Few Clicks</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-xl text-muted-foreground">
          Streamline your certification process with our all-in-one platform.
          Create, manage, and distribute certificates for courses, events, and
          achievements effortlessly.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/signup">Start Your Free 14-Day Trial</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#how-it-works">See How It Works</Link>
          </Button>
        </div>

        <div className="mt-16 flex justify-center p-2 shadow-xl max-w-xl bg-slate-100 ring-1 ring-slate-300 rounded-lg mx-auto">
          <div className="w-full rounded-lg border bg-card shadow-md">
            <Image
              src="/svg/certification-bro.svg"
              alt="Person holding a certificate"
              className="h-auto w-full rounded-md object-contain"
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>

      <div className="absolute -top-24 right-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
    </section>
  );
}

export default Hero;
