import { TTitleData } from "./TTable"
import { twMerge } from "tailwind-merge"

export const Title = ({ children, className }: TTitleData) => {
    return (
        <div className={twMerge(`px-4 border-b flex items-center ${className}`)}>
            {children}
        </div>
    )
}
