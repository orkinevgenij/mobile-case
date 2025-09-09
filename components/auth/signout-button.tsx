'use client'
import { signOut } from "next-auth/react";

export default function SignoutButton() {
    return (
        <button
            onClick={() => signOut()}
            className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
        >
            Вийти
        </button>)
}