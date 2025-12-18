"use client";

import { reqEmailVerification } from "@/lib/app";
import { parseResMsg, parseStatusCode } from "@/utils";
import * as notify from "@/utils/notify";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const useResendEmailVerif = (email: string | null, successCb: () => void) => {
  const [otpError, setOtpError] = useState("");
  const [otpResendSuccessMsg, setOtpResendSuccessMsg] = useState("");

  // Resend OTP
  const { mutate: resendOTP, isPending: isSendingOTP } = useMutation({
    mutationFn: async () =>
      await reqEmailVerification(String(email)),

    onSuccess: async (res) => {
      if (!parseStatusCode(res.statusCode).success) {
        const msg =
          parseResMsg(res.message) ||
          "Something failed. If the issue persists please contact support.";

        setOtpError(msg);
        notify.error({ message: "Request failed!", subtitle: msg });

        return;
      }

      notify.success({ message: "OTP Sent!", subtitle: String(res.message) });
      successCb();
      setOtpError('')

      setTimeout(() => setOtpResendSuccessMsg(""), 5000);
    },
  });

  return {
    otpResendSuccessMsg,
    resendOTP,
    isSendingOTP,
    otpError,
    setOtpError,
  };
};

export { useResendEmailVerif };
