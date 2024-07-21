type IconName = "filled-calendar" | "filled-checkmark" | "filled-flame" | "filled-flash" | "filled-barbell";


interface IconProps extends React.PropsWithChildren{
    size?: number | null,
    className?: string | null,
    name?: IconName | null,
}

const Icon: React.FC<IconProps> = ({ name, size=24, className, ...props}) => {
    return (
        <svg width={size ?? 24} height={size ?? 24} className={className ?? ""} {...props}>
            <use href={`/sprite.svg#${name}`} />
        </svg>
    )
}

export type {
    IconName
}
export {
    Icon as default
}