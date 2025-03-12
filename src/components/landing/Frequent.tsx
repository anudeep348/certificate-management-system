"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the certificate verification system work?",
    answer:
      "Each certificate we generate includes a unique QR code that links to a verification page on our secure server. When scanned, it displays the certificate details and confirms its authenticity. This helps prevent forgery and gives recipients a way to prove their credentials are legitimate.",
  },
  {
    question: "Can I use my own certificate design?",
    answer:
      "While we offer a variety of professional templates, you can also upload your own designs or work with our team to create custom templates that match your brand. Our platform supports custom fonts, colors, logos, and layouts.",
  },
  {
    question: "Is there a limit to how many certificates I can generate?",
    answer:
      "The number of certificates you can generate depends on your subscription plan. Our Starter plan includes up to 100 certificates per month, Professional allows up to 1,000, and Enterprise offers unlimited certificate generation. You can always upgrade your plan as your needs grow.",
  },
  {
    question: "How do recipients receive their certificates?",
    answer:
      "Recipients can receive certificates in several ways: via email with a PDF attachment, through a unique link to download their certificate, or through your learning management system if you use our API integration. You can also batch download certificates to distribute them manually.",
  },
  {
    question: "Can I integrate CertifyPro with my existing LMS or CRM?",
    answer:
      "Yes, we offer API integration with popular learning management systems and CRM platforms. This allows for automatic certificate generation when students complete courses in your LMS, or for tracking certificate issuance in your CRM. Our Enterprise plan includes dedicated support for custom integrations.",
  },
  {
    question: "What happens to my data if I cancel my subscription?",
    answer:
      "We retain your data for 30 days after subscription cancellation, giving you time to download any important information. After this period, your data is permanently deleted from our servers. We recommend exporting all certificates and recipient data before cancelling if you wish to keep these records.",
  },
  {
    question: "Is my data secure on your platform?",
    answer:
      "Security is our top priority. We use industry-standard encryption for all data, both in transit and at rest. Our servers are hosted in secure facilities with regular security audits. We're GDPR compliant and never share your data with third parties without your explicit permission.",
  },
  {
    question: "Do you offer bulk upload for recipients?",
    answer:
      "Yes, you can bulk upload recipient information using CSV or Excel files. This makes it easy to add large groups of recipients at once, such as for a graduating class or conference attendees. Our system will validate the data and alert you to any issues before processing.",
  },
];

function Frequent() {
  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Find answers to common questions about our certificate management
            platform.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

export default Frequent;
