import { Award, BarChart, Cloud, Download, Users, Zap } from "lucide-react";

function Features() {
  return (
    <section id="features" className="py-20 border-y border-slate-200">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Everything You Need to Manage Certificates
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Our comprehensive platform provides all the tools you need to
            create, manage, and distribute certificates for your courses and
            programs.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Award className="h-10 w-10 text-primary" />}
            title="Beautiful Certificate Templates"
            description="Choose from dozens of professionally designed certificate templates or create your own custom design."
          />
          <FeatureCard
            icon={<Users className="h-10 w-10 text-primary" />}
            title="Recipient Management"
            description="Easily manage recipients/students, import from CSV, and organize them by courses/events."
          />
          <FeatureCard
            icon={<Cloud className="h-10 w-10 text-primary" />}
            title="Cloud Storage"
            description="All certificates are securely stored in the cloud and accessible anytime, anywhere."
          />
          <FeatureCard
            icon={<Zap className="h-10 w-10 text-primary" />}
            title="Bulk Generation"
            description="Generate hundreds of certificates in seconds with our powerful bulk processing tools."
          />
          <FeatureCard
            icon={<Download className="h-10 w-10 text-primary" />}
            title="Multiple Export Options"
            description="Download certificates as PDF, PNG, or in bulk as a ZIP file for easy distribution."
          />
          <FeatureCard
            icon={<BarChart className="h-10 w-10 text-primary" />}
            title="Analytics Dashboard"
            description="Track certificate issuance, views, and downloads with comprehensive analytics."
          />
        </div>
      </div>
    </section>
  );
}

export default Features;

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:ring-1 hover:ring-primary">
      <div className="mb-4">{icon}</div>
      <h3 className="mb-2 text-xl font-medium">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
