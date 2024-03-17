// E:\sites\CUISINE-NEXT\app\layout.tsx

import React from "react";
import Head from "next/head";
import { DM_Sans } from "next/font/google";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

const dmSans = DM_Sans({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children, title = "Cuisine House", description = "Your favorite Food, all in one place." }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <div className={dmSans.className}>
        <Hero />
        <main className="max-w-7xl mx-auto bg-[#0F1117]">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default RootLayout;
