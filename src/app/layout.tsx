import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Certificate Management System",
  description: "Manage courses, recipients, and generate certificates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${poppins.variable} ${geistMono.variable} antialiased`}
        >
          <Providers>
            <SidebarProvider>
              <div className="w-full">{children}</div>
              <Toaster richColors position="top-right" />
            </SidebarProvider>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
