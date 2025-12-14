import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { signUserIn, googleSignIn } from "./lib/common/auth-options-services";
import { UserInfoProps } from "@/next-auth";
import { parseStatusCode } from "@/utils";

const AUTH_SECRET = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
const GOOGLE_CLIENT_ID =
  process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET =
  process.env.AUTH_GOOGLE_SECRET || process.env.GOOGLE_CLIENT_SECRET!;

 

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 0.5 * 24 * 60 * 60, // 12 hours
  },
  providers: [
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password, ipAddress } = credentials as Record<
          string,
          string
        >;

        const res = await signUserIn({ email, password, ipAddress });
        console.log({ res });
        if (!parseStatusCode(res.statusCode).success) {
          console.log("ERROR THREW");
           throw new Error(JSON.stringify(res));



        }
        const user = res.data as unknown as UserInfoProps;
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session, account }) {
      // console.log("JWT: ", { token, user, trigger, session, account });
    
    
      if (trigger === "update") {
        token = { ...token, ...session };
      }
      // Handle Google on first JWT run (account is defined on initial sign-in)
      if (account?.provider === "google") {
        const credential = { idToken: account.id_token as string };
        const res = await googleSignIn(credential);
        if (parseStatusCode(res.statusCode).success && res.data) {
          token = { ...(token as object), ...(res.data as UserInfoProps) };
        } else {
          throw new Error(JSON.stringify(res));
        }
        return token;
      }
      if (user) {
        token = {...token, ...user} as UserInfoProps;
      }
      return token;
    },
    async signIn({ account }) {
      if (account?.provider === "google") return true;

      return true;
    },
    async session({ session, token }) {
      // console.log("SESSION: ", { session, token });
      if (token) {
        session.user = { ...session.user, ...(token as UserInfoProps) };
        // session.access_token = (token as UserInfoProps).accessToken || "";
      }
      // session.expires = dayjs().add(12, "hours").toISOString();
      return session;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
  },
});
 