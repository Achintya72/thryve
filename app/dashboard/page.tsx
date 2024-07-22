"use client";

import { useContext } from "react";
import DataContext from "../lib/repository/store";
import Icon from "../components/icon";
import { calculateCalorieGoals, getTreeType } from "../lib/services/fitness";
import classses from "../utils/classes";
import Navbar from "../components/navbar";
import Image from "next/image";
import Button from "../components/button";
import { useRouter } from "next/navigation";
import EventCard from "../components/eventCard";

type Day = "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday";
const days: Day[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

const Dashboard = () => {
    const { user, allEvents } = useContext(DataContext);
    const router = useRouter();
    const dailyCal = user ? calculateCalorieGoals(user) : 1000;
    const today = new Date();
    return (
        <main className="relative flex max-w-[400px] mx-auto min-h-screen flex-col items-stretch pb-[100px] p-[20px]">
            <div className="flex justify-between mb-[15px]">
                <div className="flex justify-between text-orange-700 bg-orange-100 px-[10px] py-[5px] rounded-full gap-[5px] items-center">
                    <Icon name="filled-flame" size={16} />
                    <p className="font-inter font-bold text-orange-700">{user?.streak ?? 0} days</p>
                </div>
                <div className="flex justify-between text-blue-700 bg-blue-100 px-[10px] py-[5px] rounded-full gap-[5px] items-center">
                    <Icon name="filled-leaf" size={16} />
                    <p className="font-inter font-bold">{((user?.points) ?? 0).toLocaleString()}</p>
                </div>
            </div>
            <div className="flex justify-between items-center mb-[20px]">
                <div>
                    <p className="text-gray-600 font-inter">Hello,</p>
                    <h1 className="font-inter font-extrabold text-4xl">{(user?.name ?? "User").split(" ")[0]}</h1>
                </div>
                {user && <Image src={`/${getTreeType(user)}.png`} alt={getTreeType(user)} width={50} height={50} />}
            </div>
            <div className="flex flex-col items-stretch gap-[10px]">
                <div className="flex gap-[10px]">
                    <div className="flex-1 bg-blue-700 text-white rounded-[8px] p-[20px] flex">
                        <div className="flex-1">
                            <p className="font-bold"><span className="text-2xl font-bold">{(user?.dailyCalories ?? 0).toLocaleString()}</span> kcal</p>
                            <p className="font-inter">burnt today</p>
                        </div>
                        <Icon name="filled-flame" size={24} />
                    </div>
                    <div className="flex-1 bg-blue-700 text-white rounded-[8px] p-[20px] flex">
                        <div className="flex-1">
                            <p className="font-bold"><span className="text-2xl font-bold">{(7300 - (user?.points ?? 0) % 7300).toLocaleString()}</span> points</p>
                            <p className="font-inter">to new level</p>
                        </div>
                        <Icon name="filled-leaf" size={24} />
                    </div>
                </div>
                <div className="p-[20px] flex flex-col border border-blue-100 rounded-[8px]">
                    <p className="font-inter font-bold mb-[10px]">This Week</p>
                    <div className="flex justify-evenly items-stretch h-[150px]">
                        {days.map(day => (
                            <div key={day} className="flex-1 flex items-end justify-center">
                                {user?.weeklyActivity &&
                                    <div
                                        className="w-[30px] bg-blue-700 rounded-t-[8px]"
                                        style={{ height: ((user.weeklyActivity[day] ?? 0) * 100 / dailyCal) + "px" }}
                                    />
                                }
                            </div>
                        ))
                        }
                    </div>
                    <div className="flex py-[5px] border-t border-t-black">
                        {days.map((key, i) => (
                            <p
                                className={
                                    classses(
                                        "flex-1 text-xs text-center uppercase",
                                        today.getDay() == i ? "text-gray-800" : "text-gray-400"
                                    )
                                } key={key}>{key.substring(0, 1)}</p>
                        ))}
                    </div>
                </div>
            <Button size="large" variant="secondary" onClick={() => router.push("/log")}>Log Exercise</Button>
            <p className="font-inter font-bold">Activities</p>
            <div className="flex gap-[10px] items-stretch overflow-x-scroll">
                {allEvents.filter(event => user?.events?.includes(event.uid)).map(event => (
                    <EventCard desc={false} event={event} key={event.uid} />
                ))}
            </div>
            </div>
            <Navbar />
        </main>
    )
};

export default Dashboard;