import { LogoIcon } from "@/components/svgs";
import { AuthImageSection } from "./components/auth-image-section";

export default function AuthLayout({
  children,
  page,
}: {
  children: React.ReactNode;
  page?: React.ReactNode;
}) {
  return (
    <div className="flex lg:h-dvh w-full lg:overflow-hidden flex-col lg:flex-row">
      {/* Left side with image */}
      <div className=" lg:w-1/2 lg:block">
        
        <AuthImageSection />
      </div> 

      {/* Right side with form */}
      <div className="flex w-full flex-col lg:w-1/2 px-8 py-12 gap-4 bg-background overflow-y-auto">
        {/* Logo */}
        <div className="lg:flex items-center gap-2 ml-auto hidden">
          <LogoIcon width={70} height={78} />
        </div>
        <div className="flex w-full flex-col gap-4 flex-1 justify-center items-center max-w-[MAX(21rem,30vw)] mx-auto">
          {page ?? children}
        </div>
      </div>
    </div>
  );
}
