"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    quote:
      "CertifyPro made it incredibly easy to issue and manage certificates for our event attendees. The automation features saved us hours of manual work, and our users loved the professional-looking certificates!",
    author: "John Reynolds",
    title: "Event Organizer",
    fallback: "JR",
    imgSrc: "/users/user-1.png",
  },
  {
    quote:
      "CertifyPro took the stress out of certificate management. From customizable templates to automated delivery and real-time tracking, it has everything I need to provide a seamless experience for my trainees!",
    author: "Emily Roberts",
    title: "Corporate Trainer",
    fallback: "ER",
    imgSrc: "/users/user-2.png",
  },
  {
    quote:
      "We needed a hassle-free way to generate and distribute certificates for our employee training programs. CertifyPro’s bulk certificate issuance and tracking features streamlined the entire process!",
    author: "Samantha Lee",
    title: "HR Manager",
    fallback: "SL",
    imgSrc: "/users/user-3.png",
  },
  {
    quote:
      "As an educator, CertifyPro has been a game-changer. I can now issue branded, secure certificates to my students with just a few clicks, and the verification feature ensures authenticity!",
    author: "Michael Carter",
    title: "Online Course Creator",
    fallback: "MC",
    imgSrc: "/users/user-4.jpg",
  },
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section id="testimonials" className="py-20 border-y border-slate-200">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Hear from the organizations that have transformed their certificate
            management with our platform.
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <Card className="border-2">
            <CardContent className="p-8 md:p-12">
              <Quote className="mb-6 h-12 w-12 text-primary/20" />
              <blockquote className="mb-8 text-xl font-medium leading-relaxed md:text-2xl">
                {testimonials[currentIndex].quote}
              </blockquote>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={testimonials[currentIndex].imgSrc}
                    alt={testimonials[currentIndex].author}
                  />
                  <AvatarFallback>
                    {testimonials[currentIndex].fallback}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">
                    {testimonials[currentIndex].author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonials[currentIndex].title}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 flex justify-center items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {testimonials.map((_, index) => (
              <Button
                key={index}
                variant="outline"
                size="icon"
                className={`h-2 w-2 rounded-full p-0 ${
                  index === currentIndex ? "bg-primary" : "bg-secondary"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
