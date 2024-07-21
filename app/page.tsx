"use client";

import Image from "next/image";
import Button from "./components/button";
import Input from "./components/input";
import { FieldValues, useForm } from "react-hook-form";
import { useEffect } from 'react';
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();

  return (
    <main className="flex max-w-[400px] mx-auto min-h-screen flex-col items-stretch p-[20px]">
      <div className="flex-1 flex flex-col justify-center text-center items-center">
        <Image src="/landing.jpg" width={300} height={300} alt="Landing Image" />
        <h1 className="font-inter font-extrabold text-4xl mt-[40px]">Welcome to Thryve</h1>
        <p className="font-inter text-gray-700 mt-[10px]">An app made to cultivate your long term fitness</p>
      </div>
      <div className="flex flex-col gap-[10px] items-stretch">
        <Button  variant="secondary">Create Account</Button>
        <Button onClick={() => router.replace("/signIn")}>Sign In</Button>
      </div>
    </main>
  );
}
