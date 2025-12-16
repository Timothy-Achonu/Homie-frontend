import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import "./styles/globals.css";
import { agile } from "./styles/fonts";


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

 
export const metadata: Metadata = {
  title: "Homie",
  description: "Rent Smarter. Sell Better. Live Easier.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; 
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${geistMono.variable} ${agile.variable} antialiased font-poppins`}
      >
        {children}
      </body>
    </html>
  );
}
