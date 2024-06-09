"use server";

import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";

export const credentialLogin = async(email: string, password: string) => {
    try {
      await signIn("credentials", {
        email,
        password,
      });
    } catch (error) {
      const err = error as CredentialsSignin;
      console.log("error from login.ts",err.message)
      return err.message;
    }
  }