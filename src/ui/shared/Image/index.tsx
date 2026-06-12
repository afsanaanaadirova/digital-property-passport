import { twMerge } from "tailwind-merge"
import { TImage } from "./TImage"
const Image = ({ url, name, className }: TImage) => {
    return (
        <div className={twMerge("w-full h-full rounded-[10px] overflow-hidden", className)}>
            <img className='w-full h-full object-cover'
                src={url}
                alt={name} />
        </div>
    )
}
export default Image;