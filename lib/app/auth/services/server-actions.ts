"use server"
import { SignInOptions } from "next-auth/react";
import { signIn as serverSignIn } from "@/auth";
import { ResProps, SignInRes } from "@/lib/common";
import { HttpStatus } from "@/utils";

export async function authenticate(
  provider: string,
  signinOptions: SignInOptions<false> = {}
): Promise<ResProps<SignInRes>> {
  try {
    const response = await serverSignIn(provider, signinOptions);
    
    // NextAuth's signIn returns undefined or a redirect URL string on success
    // We need to construct a proper success response
    if (response === undefined || typeof response === "string") {
      // Success case - construct proper response structure
      return {
        statusCode: HttpStatus.OK,
        message: "Sign in successful",
        data: undefined, // User data is in session, not in response
      };
    }
    
    // If response is already a ResProps structure, return it
    return response as ResProps<SignInRes>;
  } catch (error) {
    // Error case - parse the error message
    // console.log('ERROR:', { error, name: error?.name, code: error?.code });
    
    // Check if it's our custom InvalidLoginError
    if (error instanceof Error && 'errorMessage' in error) {
      try {
        const resString = (error as { errorMessage?: string }).errorMessage;
        if (resString) {
          const mainRes = JSON.parse(resString) as ResProps<SignInRes>;
          return mainRes;
        }
      } catch (parseError) {
        console.error('Failed to parse error message:', parseError);
      }
    }
    
    // Fallback error response
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: error instanceof Error ? error.message : "An unknown error occurred",
      error: error,
    };
  }
}