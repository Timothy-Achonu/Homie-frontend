"use client";

import { Button } from "@/ui/button";
import { Typography } from "@/ui/typography";
import { Input, Checkbox } from "@/ui";
import { PasswordInput } from "@/ui/password-input";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { signupSchema } from "@/lib/app";


export function SignUpForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useFormWithSchema(signupSchema);

  const password = watch("password") || "";

  // Password requirement validation functions
  const checkPasswordRequirements = (pwd: string) => {
    return {
      minLength: pwd.length >= 8,
      hasLowerCase: /[a-z]/.test(pwd),
      hasUpperCase: /[A-Z]/.test(pwd),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>\[\]\\\/_+\-=~`]/.test(pwd),
    };
  };

  const passwordRequirements = checkPasswordRequirements(password);


  return (
    <form className="flex w-full flex-col gap-6" onSubmit={handleSubmit((data) => {
      console.log(data);
    })}>
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

      {/* Password Requirements */}   
      <div className="flex gap-2">
        <div className="flex flex-col gap-2"> 
        <div className="flex gap-2">
          <Checkbox checked={passwordRequirements.minLength} disabled className="disabled:opacity-100 shadow-none" />
          <Typography variant="text-xs" color={!passwordRequirements.minLength && errors.password?.message ? "error" : "quaternary-foreground"}>
            Minimum of eight characters
          </Typography>
        </div>
        <div className="flex gap-2">
        <Checkbox checked={passwordRequirements.hasLowerCase} disabled className="disabled:opacity-100 shadow-none" />
        <Typography variant="text-xs" color={!passwordRequirements.hasLowerCase && errors.password?.message ? "error" : "quaternary-foreground"}>
            At least one lower case letter
          </Typography>
        </div>
        </div>
        {/* second part */}
        <div className="flex flex-col gap-2 "> 

        <div className="flex  gap-2">
        <Checkbox checked={passwordRequirements.hasUpperCase} disabled className="disabled:opacity-100 shadow-none" />
        <Typography variant="text-xs" color={!passwordRequirements.hasUpperCase && errors.password?.message ? "error" : "quaternary-foreground"}>
            At least one upper case letter
          </Typography>
        </div>
        <div className="flex gap-2">
        <Checkbox checked={passwordRequirements.hasSpecialChar} disabled className="disabled:opacity-100 shadow-none" />
        <Typography variant="text-xs" color={!passwordRequirements.hasSpecialChar && errors.password?.message ? "error" : "quaternary-foreground"}>
            At least one special character
          </Typography>
        </div>
        </div> 
      </div>

      {/* Sign Up Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        className="py-4 h-auto"
      >
        Sign Up
      </Button>
    </form>
  );
}
 