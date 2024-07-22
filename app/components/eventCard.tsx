"use client";

import { ThryveEvent } from "../lib/models/event"
import Image from "next/image";
import Icon from "./icon";
import Button from "./button";
import { useContext } from "react";
import DataContext from "../lib/repository/store";

const EventCard = ({ event, desc = true }: { event: ThryveEvent, desc: boolean }) => {
    const {user, handleEvent} = useContext(DataContext);

    return (
        <div className="rounded-[10px] min-w-[250px] border m-2 overflow-hidden">
            <div className="relative w-full *:object-cover overflow-hidden" style={{ aspectRatio: "16/9"}}>
                <Image src={event.image} alt={event.name} fill />
            </div>
            <div className="p-[20px] flex flex-col gap-[10px] items-start">
                <div className="flex flex-row bg-blue-100 rounded-full px-[10px] py-[5px] text-blue-700 gap-[5px]">
                    <Icon name="filled-time" />{event.duration < 60 ? event.duration + " minutes" : Math.round(event.duration / 6) / 10 + " hours"}
                </div>
                <div>
                    <div className="font-bold text-[20px]">{event.name}</div>
                    <div className="text-[14px] text-[#636363]">{event.location}</div>
                    <div className="text-[14px] text-[#636363]">{event.time.toDate().toDateString()}</div>
                </div>
                {desc && event.description}
                {user != null && user.events != null && <Button onClick={() => handleEvent(event.uid)}>{user.events.includes(event.uid) ? "Leave Event" : "Join Event"}</Button>}
            </div>
        </div>
    )
}

export default EventCard;