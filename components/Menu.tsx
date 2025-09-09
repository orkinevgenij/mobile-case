'use client'
import DesktopMenu from "./DesktopMenu"
import MobileMenu from "./MobileMenu"
import { TCategoryMenu } from "@/types/types";

export const Menu = ({ brands, series, models }: TCategoryMenu) => {
    return (
        <>
            <DesktopMenu brands={brands} series={series} models={models} />
            <MobileMenu  />
        </>
    )
}