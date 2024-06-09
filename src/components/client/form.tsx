"use client";

import { credentialLogin } from "@/actions/login";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const router = useRouter()

    return <form action={
        async (formData) => {
            const email = formData.get("email") as string
            const password = formData.get("password") as string

            console.log(email);

            if (!email || !password) return toast.error("Please provide all fields");

            const toastId = toast.loading("Logging in")

            const error = await credentialLogin(email, password)

            console.log(error);

            if (!error) {
                {
                    return toast.success("Login Successfull", {
                        id: toastId
                    }),
                        router.refresh();
                }
            }
            else {
                return toast.error(String(error), {
                    id: toastId
                })
            }
        }
    } className="flex flex-col gap-4">
        <Input type="email" placeholder="Email" name="email" />
        <Input type="password" placeholder="Password" name="password" />
        <Button type="submit">Login</Button>
    </form>
}

export { LoginForm }