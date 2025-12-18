"use client";

import { Button } from "@/ui/button";
import { Input, Typography } from "@/ui";
import { PasswordInput } from "@/ui/password-input";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { signinSchema } from "@/lib/app";
import Link from "next/link";
import { ApplicationRoutes } from "@/routes";

export function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormWithSchema(signinSchema);

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

      <PasswordInput
        name="password"
        placeholder="Password"
        register={register}
        required
        errorMsg={errors.password?.message}
        hideErrorMsg={true}
      />

        <div className="flex w-full flex-col gap-4">
          <Button
            type="submit"
            variant="default"
            size="lg"
            className="py-4 h-auto"
          >
            Login 
          </Button>
          <div className="flex w-full justify-between items-center gap-2">
            <Link
              href={ApplicationRoutes.AUTH_FORGOT_PASSWORD}
              className="hover:underline font-bold text-primary"
            >
              Forgot Password?
            </Link>
            <Typography variant="text-sm" color="gray-600">
              <Link
                href={ApplicationRoutes.AUTH_SIGN_UP}
                className="hover:underline"
              >
                <span className="text-primary font-bold"> Sign Up </span>{" "}
                <span className="text-quaternary-foreground"> instead?</span>
              </Link>
            </Typography>
          </div>
      </div>
    </form>
  );
}
