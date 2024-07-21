"use client";

import Image from "next/image";
import Button from "../components/button";
import Input from "../components/input";
import { FieldValues, useForm } from "react-hook-form";
import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar";
import { auth } from "../lib/repository/firebase";


export default function Home() {
  const router = useRouter();

  return (
    <main className="flex max-w-[400px] mx-auto min-h-screen flex-col items-stretch p-[20px]">
      <div className="flex-1 flex flex-col">
        <h1 className="font-inter font-extrabold text-4xl mt-[40px]">Settings</h1>
        <p className="font-inter text-gray-700 mt-[10px]">Sign Out or Change Basic User Info Here</p>
        <Button onClick={async () => {await auth.signOut(); router.push("/")}}>Sign Out</Button>
      </div>
      <Navbar/>
    </main>
  );
}
