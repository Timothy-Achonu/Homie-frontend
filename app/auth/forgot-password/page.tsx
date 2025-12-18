import { Typography } from "@/ui/typography";
import { ForgotPasswordForm } from "./components/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <div className="flex w-full flex-col ">
      <div className="flex w-full flex-col items-center gap-8">
        {/* Heading */}
        <div className="flex w-full flex-col gap-2">
          <Typography
            variant="display-lg"
            color="primary"
            fontWeight="bold"
            align="center"
            font="agile"
          >
            Forgot Password?
          </Typography>
          <Typography
            variant="text-xs"
            color="gray-600"
            align="center"
          >
            Input the Email Address Linked to Your Account{" "}
          </Typography>
        </div>

        <ForgotPasswordForm />
      </div>
    </div>
  );
}
 