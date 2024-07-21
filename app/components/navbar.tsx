"use client";

import { usePathname, useRouter } from "next/navigation";
import Icon, { IconName } from "./icon";
import classses from "../utils/classes";

const options: {name:string, icon: IconName, url: string}[] = [
    {
        name: "Home",
        icon: "filled-home",
        url: "/dashboard"
    },

    {
        name: "Social",
        icon: "filled-people",
        url: "/events"
    },
    {
        name: "Settings",
        icon: "filled-settings",
        url: "/settings"
    }
]

export default function Navbar() {
    const pathName = usePathname();
    const router = useRouter();
    return (
        <nav className="fixed w-full translate-x-[-20px] max-w-[400px] flex items-center bottom-0 h-[100px] bg-white drop-shadow-md">
            {options.map((option, i) => (
                <div
                    onClick={() => router.push(option.url)} 
                    key={option.url} 
                    className={
                        classses(
                            "flex-1 flex flex-col items-center gap-[10px]", 
                            pathName === option.url ? "text-blue-400" : "text-gray-600"
                        )}>
                    <Icon name={option.icon} size={24} />
                    {pathName === option.url && <p className="font-inter text-sm">{option.name}</p>}
                </div>
            ))}
        </nav>
    )
}