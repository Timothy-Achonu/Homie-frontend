// next-auth.d.ts
import { SignInRes } from "@/lib/common/models";
import { DefaultSession } from "next-auth";

interface Account {
  message: string;
  status: boolean;
}

export type UserInfoProps = SignInRes & {
  [key: string]: unknown; // keep JWT’s index signature happy
  name?: string | null;
  email?: string | null;
  image?: string | null;
  sub?: string ;
}; 
// export type SessionProps = SignInRes 


declare module "next-auth" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface User extends SessionProps {} //this is for the session that credentials provider in auth.ts returns. It's also for the user destructured in the JWT callback in auth.ts
  interface Session extends DefaultSession {
    user: UserInfoProps;   //This is for session.user, which is actually the same as User['user']. The full session is the same type as User.                   // ensure user shape
  }
}

declare module "next-auth/jwt" {
  interface JWT extends UserInfoProps {
    email: string,
  }
}
