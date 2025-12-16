"use client";

import Link from "next/link";
import { Button } from "@/ui/button";
import { Typography } from "@/ui/typography";
import { GoogleSignin } from "../../components/google-signin";
import { Input } from "@/ui/input";
import { PasswordInput } from "@/ui/password-input";
import { useForm } from "react-hook-form";
import { Check } from "lucide-react";

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export function SignUpForm() {
  const {
    register,
    formState: { errors },
  } = useForm<SignUpFormData>();

  return (
    <form className="flex w-full flex-col gap-6">
      <Input
        name="firstName"
        placeholder="First Name on your NIN"
        register={register}
        required
        errorMsg={errors.firstName?.message}
      />

      <Input
        name="lastName"
        placeholder="Last Name on your NIN"
        register={register}
        required
        errorMsg={errors.lastName?.message}
      />

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
      />

      {/* Password Requirements */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-success" />
          <Typography variant="text-xs" color="gray-600">
            Minimum of eight characters
          </Typography>
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-success" />
          <Typography variant="text-xs" color="gray-600">
            At least one lower case letter
          </Typography>
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-success" />
          <Typography variant="text-xs" color="gray-600">
            At least one upper case letter
          </Typography>
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-success" />
          <Typography variant="text-xs" color="gray-600">
            At least one special character
          </Typography>
        </div>
      </div>

      {/* Sign Up Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        className="shadow-xs text-display-sm-fluid py-4 h-auto"
      >
        Sign Up
      </Button>
    </form>
  );
}
