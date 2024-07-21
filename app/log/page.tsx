"use client";

import { Dispatch, SetStateAction, useState } from "react";
import classses from "../utils/classes";
import CardioLog from "./cardioLog";
import Icon from "../components/icon";
import Button from "../components/button";
import { useRouter } from "next/navigation";

type Workout = "Cardio" | "Strength" | "Flexibility";

let workouts: Workout[] = ["Cardio", "Strength", "Flexibility"];




export default function Log() {
    const [workout, changeWorkout] = useState<Workout>("Cardio");
    const router = useRouter();

    let renderWorkouts = [
        <CardioLog />
    ]

    return (
        <main className="relative flex max-w-[400px] mx-auto min-h-screen gap-[10px] flex-col items-stretch pb-[100px] p-[20px]">
            <div className="flex justify-between items-center mb-[40px]">
                <h1 className="font-inter font-extrabold text-4xl ">Log Exercise</h1>
                <Button iconOnly icon="filled-close" variant="text" onClick={() => router.back()}></Button>
            </div>
            <CategorySelector workout={workout} changeWorkout={changeWorkout} />
            {renderWorkouts[workouts.indexOf(workout)]}
        </main>
    )
}

const CategorySelector = ({ workout, changeWorkout }: { workout: Workout, changeWorkout: Dispatch<SetStateAction<Workout>> }) => {
    return (
        <div className="flex relative bg-blue-100 rounded-full overflow-hidden">
            <a
                onClick={() => changeWorkout("Cardio")}
                className={
                    classses(
                        "flex-1 relative z-10 text-center",
                        "px-[10px] py-[5px] font-inter font-bold",
                        workout == "Cardio" ? "text-blue-100" : "text-blue-700"
                    )}>Cardio</a>
            <a
                onClick={() => changeWorkout("Strength")}
                className={
                    classses(
                        "flex-1 relative z-10 text-center",
                        "px-[10px] py-[5px] font-inter font-bold",
                        workout == "Strength" ? "text-blue-100" : "text-blue-700"
                    )}>Strength</a>
            <a
                onClick={() => changeWorkout("Flexibility")}
                className={
                    classses(
                        "flex-1 relative z-10 text-center",
                        "px-[10px] py-[5px] font-inter font-bold",
                        workout == "Flexibility" ? "text-blue-100" : "text-blue-700"
                    )}>Flexibility</a>
            <div
                className={
                    classses(
                        "absolute w-[33%] top-0 bottom-0",
                        "bg-blue-700 rounded-full z-0",
                        "transition-all duration-300",
                        workout == "Cardio" ? "left-0" : "",
                        workout == "Strength" ? "left-[33%]" : "",
                        workout == "Flexibility" ? "left-[67%]" : ""
                    )} />
        </div>
    )
}