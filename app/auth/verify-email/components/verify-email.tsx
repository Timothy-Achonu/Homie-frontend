"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button, Typography, OTPInputField } from "@/ui";
import { useTimer, useMutationWrapper } from "@/hooks";

import { ApplicationRoutes } from "@/routes";
import { useMutation } from "@tanstack/react-query";
import { OTPVerifySchema, verifyOTP } from "@/lib/app";
import { parseResMsg } from "@/utils";
import * as notify from "@/utils/notify";
import { CheckCircle } from "lucide-react";
import { useResendEmailVerif } from "../../hooks";
import { useSession } from "next-auth/react";

const VerifyEmail = () => {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email");

  const [otp, setOtp] = useState("");
  const [resendCode, setResendCode] = useState(false);
  const { data: session, update: updateSession } = useSession();
  const user = session?.user;

  // Resend countdown timer
  const triggerResendCode = useCallback(() => setResendCode(true), []);
  const { minutes, seconds, startCountdown, resetCountdown } = useTimer(
    59,
    triggerResendCode
  );

  // Hook to resend OTP
  const {
    resendOTP,
    isSendingOTP,
    otpError,
    setOtpError,
    otpResendSuccessMsg,
  } = useResendEmailVerif(email, () => {
    resetCountdown();
    startCountdown();

    setResendCode(false);
  });

  useEffect(() => {
    startCountdown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // OTP Verify Mutation
  const { mutate, isPending } = useMutationWrapper({
    mutationFn: verifyOTP,

    // If verification is successful
    onSuccess: async (res) => {
      const msg =
        parseResMsg(res.message) ||
        "Something failed. If the issue persists please contact support.";

      setOtpError(msg);

      updateSession({ ...session, user: { ...user, isEmailVerified: true } });
      router.replace(ApplicationRoutes.AUTH_SIGN_IN);
    },
  });
  return (
    <div className="flex w-full flex-col items-center">
      <form className="flex w-full flex-col">
        <div className=" flex max-w-[315px] flex-col mb-6">
          <Typography variant="display-lg" align="center" fontWeight="medium" font="agile">
            Sign Up
          </Typography>

          <Typography
            align="center"
            className="mt-3"
            color="gray-500"
          >
            Enter the verification code sent to your email {email?.slice(0, 4)}
            ***@{email?.split("@")?.[1]}
          </Typography>
        </div>

        <OTPInputField
          otp={otp}
          setOtp={setOtp}
          disableInput={isPending}
          otpError={otpError}
          setOtpError={setOtpError}
        />
        {otpResendSuccessMsg && (
          <Typography
            variant="text-xs"
            color="success"
            fontWeight="medium"
            align="center"
            className="flex items-center gap-1 mt-3"
          >
            <CheckCircle className="h-5 w-5" /> Token sent successfully. Check
            your email.
          </Typography>
        )}

        <div className="mt-3">
          {resendCode ? (
            <Button
              disabled={isSendingOTP}
              onClick={() => resendOTP()}
              type="button" 
              variant="ghost"
              className="py-0"
            > Resend Code </Button>
          ) : (
            <Typography
              color="gray-500"
              fontWeight="regular"
              align="center"
              variant="text-xs"
            >
              Didn’t receive a code? Resend ({minutes}:{seconds})
            </Typography>
          )}
        </div>

        <div className="flex w-full flex-col gap-6 mt-6 text-m">
          <Button
            // disabled={otp.length < 5 || isPending}
            onClick={() => mutate({ email: String(email), otp })}
            className="font-medium"
          > Verify </Button>
        </div>
      </form>
    </div>
  );
};

export { VerifyEmail };
