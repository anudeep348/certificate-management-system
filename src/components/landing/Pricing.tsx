"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { CheckCircle2 } from "lucide-react";

function Pricing() {
  const [billingAnnually, setBillingAnnually] = useState(true);

  return (
    <section id="pricing" className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Choose the plan thats right for your organization. Starter plan
            include a 14-day free trial.
          </p>
        </div>

        <div className="space-y-8">
          <div className="flex justify-center">
            <div className="flex items-center gap-4 rounded-lg border bg-card p-1">
              <span
                className={`px-3 py-1 text-sm ${
                  !billingAnnually ? "font-medium" : "text-muted-foreground"
                }`}
              >
                Monthly
              </span>
              <Switch
                checked={billingAnnually}
                onCheckedChange={setBillingAnnually}
              />
              <span
                className={`px-3 py-1 text-sm ${
                  billingAnnually ? "font-medium" : "text-muted-foreground"
                }`}
              >
                Annually <span className="text-xs text-primary">Save 20%</span>
              </span>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <CardDescription>
                  Perfect for small organizations and individuals
                </CardDescription>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold">
                    {billingAnnually ? "$29" : "$39"}
                  </span>
                  <span className="ml-1 text-muted-foreground">/ month</span>
                </div>
                {billingAnnually && (
                  <p className="text-sm text-muted-foreground">
                    Billed annually (${29 * 12})
                  </p>
                )}
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  <PricingFeature>
                    Up to 100 certificates per month
                  </PricingFeature>
                  <PricingFeature>5 certificate templates</PricingFeature>
                  <PricingFeature>Basic recipient management</PricingFeature>
                  <PricingFeature>Email delivery</PricingFeature>
                  <PricingFeature>QR code verification</PricingFeature>
                  <PricingFeature>1 admin user</PricingFeature>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/signup">Start Free Trial</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="relative flex flex-col border-primary">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-medium text-primary-foreground">
                Most Popular
              </div>
              <CardHeader>
                <CardTitle>Professional</CardTitle>
                <CardDescription>
                  Ideal for growing businesses and schools
                </CardDescription>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold">
                    {billingAnnually ? "$79" : "$99"}
                  </span>
                  <span className="ml-1 text-muted-foreground">/ month</span>
                </div>
                {billingAnnually && (
                  <p className="text-sm text-muted-foreground">
                    Billed annually (${79 * 12})
                  </p>
                )}
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  <PricingFeature>
                    Up to 1,000 certificates per month
                  </PricingFeature>
                  <PricingFeature>20 certificate templates</PricingFeature>
                  <PricingFeature>Advanced recipient management</PricingFeature>
                  <PricingFeature>Bulk import and export</PricingFeature>
                  <PricingFeature>Custom branding</PricingFeature>
                  <PricingFeature>Analytics dashboard</PricingFeature>
                  <PricingFeature>5 admin users</PricingFeature>
                  <PricingFeature>Priority email support</PricingFeature>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/signup">Start Free Trial</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>
                  For large organizations with advanced needs
                </CardDescription>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold">
                    {billingAnnually ? "$199" : "$249"}
                  </span>
                  <span className="ml-1 text-muted-foreground">/ month</span>
                </div>
                {billingAnnually && (
                  <p className="text-sm text-muted-foreground">
                    Billed annually (${199 * 12})
                  </p>
                )}
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  <PricingFeature>Unlimited certificates</PricingFeature>
                  <PricingFeature>
                    Unlimited certificate templates
                  </PricingFeature>
                  <PricingFeature>Advanced recipient management</PricingFeature>
                  <PricingFeature>Bulk operations</PricingFeature>
                  <PricingFeature>
                    Custom branding and white labeling
                  </PricingFeature>
                  <PricingFeature>
                    Advanced analytics and reporting
                  </PricingFeature>
                  <PricingFeature>Unlimited admin users</PricingFeature>
                  <PricingFeature>Dedicated account manager</PricingFeature>
                  <PricingFeature>24/7 priority support</PricingFeature>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/signup">Contact Sales</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingFeature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
      <span>{children}</span>
    </li>
  );
}

export default Pricing;
