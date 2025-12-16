import Link from "next/link";
import { Typography } from "@/ui/typography";
import { GoogleSignin } from "../components/google-signin";
import { SignUpForm } from "./components/sign-up-form";


export default function SignUpPage() {

  return (
    <div className="flex w-full flex-col items-center">
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
            Sign Up
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

        <SignUpForm />
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

        {/* Login Link */}
        <Typography variant="text-sm" color="gray-600">
          <Link href="/auth/sign-in" className="hover:underline">
            Login instead?
          </Link>
        </Typography>
      </div>
    </div>
  );
}

