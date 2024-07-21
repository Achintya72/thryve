"use client";

import { useRouter } from "next/navigation";
import Input from "../components/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../lib/repository/firebase";
import firebase from "firebase/compat/app";
import { doc, setDoc } from "firebase/firestore";

interface SignUpForm extends FieldValues {
    email: string,
    password: string,
    "confirm password": string
}

export default function SignUp() {
    const { register, formState: { errors }, handleSubmit } = useForm<SignUpForm>({
        mode: "all",
        reValidateMode: "onBlur"
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const onSubmit = async (data: SignUpForm) => {
        setLoading(true);
        try {
            let user = await createUserWithEmailAndPassword(auth, data.email, data.password);
            
        } catch(err) {
            setError((err as firebase.auth.Error).message);
        }
        setLoading(false);
    }

    return (
        <main className="flex max-w-[400px] mx-auto min-h-screen flex-col items-stretch p-[20px]">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[20px] items-stretch justify-center flex-1">
                <div className="flex flex-col gap-[20px] items-stretch justify-center flex-1">
                    <h1 className="font-inter font-extrabold text-4xl">Sign Up</h1>
                    <Input<SignUpForm>
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
                    <Input<SignUpForm>
                        label="password"
                        type="password"
                        name="password"
                        register={register}
                        error={errors.password}
                        options={{
                            required: { value: true, message: "Required" },
                            validate: (value: string) => {
                                if (value.length < 6) {
                                    return "Password must be atleast 6 characters long"
                                }
                                let chars = Array.from(value);
                                if (!chars.some(char => /[A-Z]/.test(char))) return "Password must have at least one uppercase letter";
                                if (!chars.some(char => /[a-z]/.test(char))) return "Password must have at least one lowercase letter";
                                if (!chars.some(char => /[0-9]/.test(char))) return "Password must have atleast one numerical digit";
                                if (!chars.some(char => /[!@#$%^&*(),.?":{}|<>]/.test(char))) return "Password must have atleast one of [!@#$%^&*(),.?\":{}|<>]";
                            }
                        }}
                    />
                    <Input<SignUpForm>
                        label="confirm password"
                        name="confirm password"
                        type="password"
                        register={register}
                        error={errors["confirm password"]}
                        options={{
                            required: { value: true, message: "Required" },
                            validate: (val:string, formValues) => {
                                if(val !== formValues.password) return "Passwords must match"
                            }
                        }}
                    />
                    {error && <p className="text-red-600">{error}</p>}
                </div>
                <div className="flex flex-col items-stretch gap-[10px]">
                    <Button variant="text" onClick={() => router.replace("/signIn")}>Have an Account? Sign In</Button>
                    <Button type="submit">{loading ? "Loading..." : "Create Account"}</Button>
                </div>
            </form>
        </main>
    )
}