import type { Metadata } from "next";
import "./styles/globals.css";
import { agile, poppins } from "./styles/fonts";
import Providers from "@/providers";






 
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
        className={`${poppins.variable}  ${agile.variable} antialiased font-poppins`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
