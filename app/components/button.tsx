"use client";

import React, { ReactNode } from "react";
import classes from "../utils/classes";
import Icon, { IconName } from "./icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: IconName | null,
    children?: ReactNode,
    iconOnly?: boolean,
    className?: string,
    variant?: "primary" | "secondary" | "text",
    size?: "small" | "medium" | "large",
    onClick?: () => void | null
}

const sizes = {
    small: "px-[12px] py-[6px]",
    medium: "px-[20px] py-[10px]",
    large: "px-[40px] py-[20px]"
}

const iconSizes = {
    small: "p-[6px]",
    medium: "p-[10px]",
    large: "p-[20px]"
}

const colorCombos = {
    primary: "bg-blue-700 text-blue-100",
    secondary: "bg-blue-100 text-blue-700",
    text: "bg-none text-blue-700"
}

const Button = ({ icon = null, iconOnly = false, variant = "primary", size = "medium", children = null, onClick = () => { }, className = "", ...props }: ButtonProps) => {
    return (
        <button
            {...props}
            onClick={onClick}
            className={
                classes(
                    "font-inter font-bold flex items-center justify-center gap-[10px] transition-all ease-in-out duration-300",
                    className,
                    size != "large" ? "rounded-full": "rounded-[8px]",
                    colorCombos[variant],
                    iconOnly ? iconSizes[size] : sizes[size]
                )}>
            {children}
            {icon && <Icon name={icon} size={20} />}
        </button>
    )
}

export default Button;