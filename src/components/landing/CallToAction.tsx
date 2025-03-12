import Link from "next/link";
import { Button } from "../ui/button";

function CallToAction() {
  return (
    <section className="bg-primary py-20 text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
          Ready to Streamline Your Certificate Management?
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-xl text-primary-foreground/80">
          Join thousands of organizations that trust our platform for their
          certification needs.
        </p>
        <Button size="lg" variant="secondary" asChild>
          <Link href="/signup">Start Your Free 14-Day Trial</Link>
        </Button>
        <p className="mt-4 text-sm text-primary-foreground/70">
          No credit card required. Cancel anytime.
        </p>
      </div>
    </section>
  );
}

export default CallToAction;
