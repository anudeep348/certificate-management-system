import { Award, BookOpen, Send, UserPlus } from "lucide-react";

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Generate Certificates in Minutes, Not Hours
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Our streamlined process makes certificate management effortless.
            Follow these simple steps to get started.
          </p>
        </div>

        {/* Desktop  */}
        <div className="relative hidden md:block">
          <svg
            className="absolute left-1/2 top-0 h-full -translate-x-1/2 z-0"
            width="50%"
            height="100%"
            viewBox="0 0 600 800"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M320,0 C360,100 340,100 300,200 
           C260,300 260,300 300,400 
           C340,500 340,500 300,600 
           C260,700 260,700 300,800"
              fill="none"
              stroke="rgb(36,99,255)"
              strokeWidth="4"
              strokeDasharray="8,8"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>

          <div className="relative mx-auto pt-4 max-w-4xl">
            <div className="relative z-10 mb-24 flex justify-end">
              <div className="w-1/2 pl-13">
                <DesktopStep
                  number={1}
                  title="Create a Event"
                  icon={<BookOpen className="h-6 w-6" />}
                  description="Set up your event/course by adding all the details, and select from our beautiful certificate templates."
                  position="right"
                />
              </div>
            </div>

            <div className="relative z-10 mb-24 mt-4 flex justify-start">
              <div className="w-1/2 pr-10">
                <DesktopStep
                  number={2}
                  title="Add Recipients"
                  icon={<UserPlus className="h-6 w-6" />}
                  description="Add recipients individually or upload a CSV or Excecl file to import hundreds of recipients in seconds."
                  position="left"
                />
              </div>
            </div>

            <div className="relative z-10 mb-24 flex justify-end">
              <div className="w-1/2 pl-10">
                <DesktopStep
                  number={3}
                  title="Generate Certificates"
                  icon={<Award className="h-6 w-6" />}
                  description="With one click, generate personalized certificates for all recipients with unique QR verification codes."
                  position="right"
                />
              </div>
            </div>

            <div className="relative z-10 flex justify-start">
              <div className="w-1/2 pr-12">
                <DesktopStep
                  number={4}
                  title="Distribute Instantly"
                  icon={<Send className="h-6 w-6" />}
                  description="Send certificates via email, provide download links, or download as a batch for your own distribution."
                  position="left"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <div className="relative">
            {/* {Horizantal Line} */}
            <div className="absolute left-[28px] top-0 h-10/12 w-1 bg-primary/50 z-0" />

            <div className="space-y-12">
              <MobileStep
                number={1}
                title="Create a Course"
                icon={<BookOpen className="h-5 w-5" />}
                description="Set up your event/course by adding all the details, and select from our beautiful certificate templates."
              />

              <MobileStep
                number={2}
                title="Add Recipients"
                icon={<UserPlus className="h-5 w-5" />}
                description="Add recipients individually or upload a CSV or Excecl file to import hundreds of recipients in seconds."
              />

              <MobileStep
                number={3}
                title="Generate Certificates"
                icon={<Award className="h-5 w-5" />}
                description="With one click, generate personalized certificates for all recipients with unique QR verification codes."
              />

              <MobileStep
                number={4}
                title="Distribute Instantly"
                icon={<Send className="h-5 w-5" />}
                description="Send certificates via email, provide download links, or download as a batch for your own distribution."
              />
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Ready in minutes
          </div>
          <p className="mt-4 text-muted-foreground">
            {
              "We reduced our certificate generation time from days to just minutes!"
            }
          </p>
        </div>
      </div>
    </section>
  );
}

interface StepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  position?: "left" | "right";
}

function DesktopStep({
  number,
  title,
  description,
  icon,
  position = "left",
}: StepProps) {
  return (
    <div
      className={`relative ${position === "left" ? "text-right" : "text-left"}`}
    >
      <div
        className={`absolute z-20 flex h-12 w-12 items-center justify-center rounded-full border-4 border-background bg-primary text-lg font-bold text-primary-foreground shadow-md ${
          position === "left"
            ? "right-0 translate-x-1/2"
            : "left-0 -translate-x-1/2"
        }`}
      >
        {number}
      </div>

      <div className="rounded-xl bg-card p-6 shadow-lg">
        <div
          className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary ${
            position === "left" ? "ml-auto" : ""
          }`}
        >
          {icon}
        </div>
        <h3 className="mb-2 text-xl font-medium">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function MobileStep({ number, title, description, icon }: StepProps) {
  return (
    <div className="relative flex items-start">
      <div className="absolute left-0 top-0 z-10 flex h-14 w-14 items-center justify-center rounded-full border-4 border-background bg-primary text-lg font-bold text-primary-foreground shadow-md">
        {number}
      </div>

      <div className="ml-20 rounded-xl bg-card p-5 shadow-md">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="mb-2 text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export default HowItWorks;
