"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Database, BarChart, CheckIcon } from "lucide-react";
import Image from "next/image";

function FeatureShowcase() {
  const [activeTab, setActiveTab] = useState("certificates");

  return (
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Powerful Features for Every Need
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Explore the key features that make our platform the preferred choice
            for certificate management.
          </p>
        </div>

        <Tabs
          defaultValue="certificates"
          value={activeTab}
          onValueChange={setActiveTab}
          className="mx-auto max-w-5xl"
        >
          <div className="mb-8 flex justify-center">
            <TabsList className="grid h-48 md:h-24 p-2 w-full max-w-2xl grid-cols-2 md:grid-cols-4">
              <TabsTrigger
                value="certificates"
                className="flex flex-col gap-2 py-3"
              >
                <Award className="h-5 w-5" />
                <span>Certificates</span>
              </TabsTrigger>
              <TabsTrigger
                value="recipients"
                className="flex flex-col gap-2 py-3"
              >
                <Users className="h-5 w-5" />
                <span>Recipients</span>
              </TabsTrigger>
              <TabsTrigger value="courses" className="flex flex-col gap-2 py-3">
                <Database className="h-5 w-5" />
                <span>Events</span>
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="flex flex-col gap-2 py-3"
              >
                <BarChart className="h-5 w-5" />
                <span>Analytics</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <Card className="border-2">
            <CardContent className="p-0">
              <TabsContent value="certificates" className="mt-0">
                <TabContent
                  heading="Beautiful Certificate Templates"
                  description="Choose from dozens of professionally designed templates or create your own custom design with our easy-to-use editor."
                  feature1="Professional design templates"
                  feature2="Custom branding and logos"
                  feature3="QR code verification"
                  feature4="Multiple export formats"
                  imgSrc="/svg/certification-cuate.svg"
                  imgAlt="Customizing Templates"
                />
              </TabsContent>

              <TabsContent value="recipients" className="mt-0">
                <TabContent
                  heading="Efficient Recipient Management"
                  description="Easily manage recipients individually or in bulk. Import from CSV and Excel organize by Events/Courses, track certificate."
                  feature1="Bulk import and management"
                  feature2="Organize by courses or events"
                  feature3="Accept both CSV and Excel formats"
                  feature4="Seamless Recipient management"
                  imgSrc="/svg/spreadsheets.svg"
                  imgAlt="Bulk Uploads"
                />
              </TabsContent>

              <TabsContent value="courses" className="mt-0">
                <TabContent
                  heading="Comprehensive Event Management"
                  description="Create and manage unlimited events with customizable templates tailored to different event types."
                  feature1="Unlimited event creation*"
                  feature2="Event-specific template"
                  feature3="Flexible customization"
                  feature4="Seamless event management"
                  imgSrc="/svg/buffer-amico.svg"
                  imgAlt="Select templates for all type of Events"
                />
              </TabsContent>

              <TabsContent value="analytics" className="mt-0">
                <TabContent
                  heading="Powerful Analytics Dashboard"
                  description="Gain insights into certificate issuance, recipient engagement, and verification rates with our comprehensive analytics."
                  feature1="Certificate issuance metrics"
                  feature2="Recipient engagement tracking"
                  feature3="Verification rate monitoring"
                  feature4="Exportable reports"
                  imgSrc="/svg/dashboard-amico.svg"
                  imgAlt="Analytics dashboard"
                />
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </section>
  );
}

interface TabContentProps {
  heading: string;
  description: string;
  feature1: string;
  feature2: string;
  feature3: string;
  feature4: string;
  imgSrc: string;
  imgAlt: string;
}

function TabContent({
  heading,
  description,
  feature1,
  feature2,
  feature3,
  feature4,
  imgSrc,
  imgAlt,
}: TabContentProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col justify-center p-6 md:p-10">
        <h3 className="mb-2 text-2xl font-bold">{heading}</h3>
        <p className="mb-8 text-muted-foreground">{description}</p>
        <ul className="space-y-2">
          <ListFeatures title={feature1} />
          <ListFeatures title={feature2} />
          <ListFeatures title={feature3} />
          <ListFeatures title={feature4} />
        </ul>
      </div>
      <div className="bg-muted/70 rounded-lg p-2 md:p-4">
        <div className="overflow-hidden bg-card p-2 w-full rounded-lg border shadow-lg">
          <Image
            src={imgSrc}
            alt={imgAlt}
            className="h-full w-full object-contain"
            height={100}
            width={100}
          />
        </div>
      </div>
    </div>
  );
}

function ListFeatures({ title }: { title: string }) {
  return (
    <li className="flex items-center gap-3">
      <span className="rounded-full bg-primary/20 p-1 text-primary">
        <CheckIcon className="size-4" />
      </span>
      <span>{title}</span>
    </li>
  );
}

export default FeatureShowcase;