import NextAuth, { DefaultSession, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// Extending NextAuth Types to include 'role' and remove implicit 'any' errors
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined) {
        // --- Admin Login Check ---
        if (
          credentials?.email === "Shigrie@gmail.com" &&
          credentials?.password === "Shigrie123@"
        ) {
          return { id: "admin-1", name: "Adv. Shigrie", email: "Shigrie@gmail.com", role: "Admin" };
        }

        // --- Normal User Login Check (MongoDB Logic goes here) ---
        // For now, simulating a successful login for any valid formatted email after OTP
        if (credentials?.email) {
          return { id: "user-1", name: "Lawyer User", email: credentials.email, role: "User" };
        }
        
        return null;
      }
    })
  ],
  pages: {
    signIn: '/auth',
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    }
  }
});

export { handler as GET, handler as POST };