
import Link from "next/link";
import { Button } from "@/ui/button";
import { Typography } from "@/ui/typography";
import { GoogleSignin } from "./components/google-signin";
import { ApplicationRoutes } from "@/routes";

export default function AuthPage() {
  return (
    <div className="flex w-full flex-col items-center ">
      <div className="flex w-full flex-col items-center gap-8">
        {/* Heading */}
        <div className="flex w-full flex-col items-center gap-2">
          <Typography
            variant="display-lg"
            color="primary"
            fontWeight="bold"
            align="center"
            font="agile"
          >
            Sign Up/Login
          </Typography>
          <Typography
            variant="text-xs"
            color="gray-600"
            align="center"
            className="max-w-sm"
          >
            Start Your Journey to Your Dream Property & Deals
          </Typography>
        </div>

        {/* Buttons */}
        <div className="flex w-full flex-col gap-4">
          <Button
            variant="default"
            size="lg"
            className="shadow-xs text-display-sm-fluid py-4 h-auto"
            asChild
          >
            <Link href={ApplicationRoutes.AUTH_SIGN_UP}>Sign Up</Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full border-gray-300 text-primary hover:bg-gray-50 shadow-xs border-none text-display-sm-fluid py-4 h-auto"
            asChild
          >
            <Link href={ApplicationRoutes.AUTH_SIGN_IN}>Login</Link>
          </Button>
        </div>

        {/* Separator */}
        <div className="flex w-full items-center gap-4">
          <div className="h-px flex-1 bg-gray-300" />
          <Typography variant="text-sm" color="gray-500">
            Or continue with
          </Typography>
          <div className="h-px flex-1 bg-gray-300" />
        </div>

        {/* Google Sign-in Button */}
        <GoogleSignin />
      </div>
    </div>
  );
}
