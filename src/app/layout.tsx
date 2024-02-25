import type { Metadata } from "next";
import "./globals.css";
import Wrapper from "../app/ToastContainer"
// const inter = Inter({ subsets: ["latin"] }); className={inter.className}
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <Wrapper>
          {children}
        </Wrapper>
        <div style={{display : "none"}}>
          <Analytics mode={'production'}/>;
          <SpeedInsights />
        </div>
      </body>
      
    </html>
  );
}
