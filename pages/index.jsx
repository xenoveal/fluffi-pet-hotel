import React from 'react'
import { signIn, signOut } from "next-auth/react";
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Index() {
    const { data: session } = useSession();
    const router = useRouter()
    useEffect(()=>{
        if(!session){
            router.push("/")
        }

    },[router, session])
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <button
            className="h-fit px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all  focus:ring-indigo-500 bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={() => {
                signIn("google", { callbackUrl: "/register" });
            }}
        >
            Login / Register
        </button>
    </div>
  )
}