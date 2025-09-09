"use client"
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerFooter,
    DrawerClose,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { MenuIcon, User, UserRound } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export default function MobileMenu() {
    const session = useSession()
    const isLoggedIn = session.status === "authenticated"
    const router = useRouter()
    return (
        <Drawer direction="left">
            <DrawerTrigger>
                <MenuIcon className="text-white text-3xl block sm:hidden md:hidden xl:hidden" />
            </DrawerTrigger>
            <DrawerContent className="flex flex-col h-full">
                <DrawerHeader className="bg-orange-500">
                    <DrawerTitle className="text-white font-bold text-lg">
                        NewCase
                    </DrawerTitle>
                </DrawerHeader>
                <div className="h-[1px] bg-white w-full" />
                <div className="px-4 py-3 bg-orange-500">
                    {isLoggedIn ? (
                        <DrawerClose asChild>
                            <div
                                onClick={() => router.push("/profile")}
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <Avatar>
                                    <AvatarImage
                                        className='rounded-full w-10 h-10 cursor-pointer'
                                        src={session?.data?.user?.image || ''}
                                    />
                                    <AvatarFallback>
                                        <UserRound size={40} />
                                    </AvatarFallback>
                                </Avatar>
                                <span className="text-white font-medium">Мій аккаунт</span>
                            </div>
                        </DrawerClose>
                    ) : (
                        <DrawerClose asChild>
                            <div
                                onClick={() => router.push("/auth/login")}
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <User className="w-5 h-5 text-white" />
                                <span className="text-white font-medium">Увійти</span>
                            </div>
                        </DrawerClose>
                    )}
                </div>
                <div className="flex-1 overflow-y-auto py-6 space-y-4 px-2">
                    <DrawerClose asChild>
                        <Link href={'/brands'} className="text-gray-700">Чохли</Link>
                    </DrawerClose>
                    <div className="h-[0.5px] bg-gray-300 w-full" />
                    <div className="flex flex-col gap-2">
                        <DrawerClose asChild>
                            <Link href={'/orders'} className="text-gray-700">Замовлення</Link>
                        </DrawerClose>
                        <DrawerClose asChild>
                            <Link href={'/contacts'} className="text-gray-700">Контакти</Link>
                        </DrawerClose>
                        <DrawerClose asChild>
                            <Link href={'/about'} className="text-gray-700">Про магазин</Link>
                        </DrawerClose>

                    </div>
                </div>
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button variant="outline">Закрити</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
