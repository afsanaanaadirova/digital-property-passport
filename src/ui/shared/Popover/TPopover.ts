import {PropsWithChildren, ReactNode} from "react";

export type TPopover = PropsWithChildren & {
    button: ReactNode;
    panelClassName?: string;
    popoverClassName?:string;
    popoverButtonClassName?:string,
    isOpen?:boolean,
    popOverOpen?:boolean,
    setPopOverOpen?:any,
    onMouseEnter?:() => void,
    onMouseLeave?:() => void,
    onClick?: (event:any) => void
}