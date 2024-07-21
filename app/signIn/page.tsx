"use client";

import { FieldValues, useForm } from "react-hook-form"
import Input from "../components/input"
import Button from "../components/button";
import { useRouter } from "next/navigation";

interface SignInForm extends FieldValues {
    email: string,
    password: string
};

export default function SignIn() {
    const { register, formState: { errors } } = useForm<SignInForm>({
        mode: "all",
        reValidateMode: "onBlur"
    })
    const router = useRouter();

    return (
        <main className="flex max-w-[400px] mx-auto min-h-screen flex-col items-stretch p-[20px]">
            <form className="flex flex-col gap-[20px] items-stretch justify-center flex-1">
                <div className="flex flex-col gap-[20px] items-stretch justify-center flex-1">
                    <h1 className="font-inter font-extrabold text-4xl">Sign In</h1>
                    <Input<SignInForm>
                        label="email"
                        type="email"
                        name="email"
                        register={register}
                        error={errors.email}
                        options={{
                            required: { value: true, message: "Required" },
                            pattern: { value: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/, message: "Invalid Email" }
                        }}
                    />
                    <Input<SignInForm>
                        label="password"
                        type="password"
                        name="password"
                        register={register}
                        error={errors.password}
                        options={{
                            required: { value: true, message: "Required" },
                            minLength: { value: 6, message: "Must be 6+ characters" }
                        }}
                    />
                </div>
                <div className="flex flex-col items-stretch gap-[10px]">
                    <Button variant="text" onClick={() => router.replace("/signUp")}>New Here? Create an Account</Button>
                    <Button>Sign In</Button>
                </div>
            </form>
        </main>
    )
}