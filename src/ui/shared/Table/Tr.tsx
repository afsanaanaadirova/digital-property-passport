import { TRTDType } from '../Title/TTable'
import { twMerge } from 'tailwind-merge'

export const TR = ({ children, className }: TRTDType) => {
    return (
        <tr
            className={twMerge(`[&>th]:py-3 [&>th]:px-4 [&>td]:py-3 [&>td]:px-4
            ${className || ''}`)}
        >
            {children}
        </tr>
    )
}
