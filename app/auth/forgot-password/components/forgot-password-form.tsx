"use client";

import { Button } from "@/ui/button";
import { Input, Typography } from "@/ui";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { forgotPasswordSchema } from "@/lib/app";
import Link from "next/link";
import { ApplicationRoutes } from "@/routes";

export function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormWithSchema(forgotPasswordSchema);

  return (
    <form
      className="flex w-full flex-col gap-6"
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <Input
        name="email"
        type="email"
        placeholder="Email Address"
        register={register}
        required
        errorMsg={errors.email?.message}
      />
      <div className="flex flex-col w-full gap-3 ">
        <Button type="submit" variant="default" size="default">
          Submit
        </Button>

        {/* Login Link */}
        <Typography variant="text-sm" color="gray-600" align="center">
          <Link
            href={ApplicationRoutes.AUTH_SIGN_IN}
            className="hover:underline"
          >
            <span className="text-primary font-bold"> Login </span>{" "}
            <span className="text-quaternary-foreground"> instead?</span>
          </Link>
        </Typography>
      </div>
    </form>
  );
}
 