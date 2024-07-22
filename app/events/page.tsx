"use client"

import { useContext } from "react";
import DataContext from "../lib/repository/store";
import Icon from "../components/icon";
import classses from "../utils/classes";
import Navbar from "../components/navbar";
import EventCard from "../components/eventCard";

const Events = () => {
    const { user, allUsers, allEvents } = useContext(DataContext);

    const today = new Date();

    return (
        <main className="flex max-w-[400px] mx-auto min-h-screen flex-col items-stretch p-[20px] pt-[85px] gap-[20px]">
            <h1 className="font-inter font-extrabold text-4xl">Social</h1>
            <div>
                <h2 className="font-inter font-bold text-[18px]">Leaderboard</h2>
                {allUsers.map((e, ind) =>
                    <div className="flex flex-row gap-[10px] px-[20px] py-[10px] my-1 items-center rounded-[10px] border border-blue-100">
                        <div className="font-bold text-2xl">#{ind + 1}</div>
                        <div className="flex flex-1 items-center justify-betweens">
                            <p className="font-bold flex-1">{e.name}{e.name == user?.name ? " (Me)" : ""}</p>
                            <div className="flex justify-between text-blue-700 bg-blue-100 px-[10px] py-[5px] rounded-full gap-[5px] items-center">
                                <Icon name="filled-leaf" size={16} />
                                <p className="font-inter font-bold">{((e.points) ?? 0).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="mb-[100px]">
                <h2 className="font-inter font-bold text-[18px]">Events</h2>
                <div className="">
                    {allEvents.map((e) => <EventCard desc event={e} />)}
                </div>
            </div>
            <Navbar />
        </main>
    )
}

export default Events;