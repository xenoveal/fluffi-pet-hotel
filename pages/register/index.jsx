import React from 'react'
import { getSession } from "next-auth/react";

export default function index() {
  return 
}


export async function getServerSideProps(ctx) {
    const session = await getSession(ctx);
    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
        };
    }

    var raw = {
        email: session.user.email
    }

    var requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(raw),
        redirect: 'follow',
        url: "www.fluffy.umkmbedigital.com"
    }
    
    const response = await fetch("https://www.fluffy.umkmbedigital.com/public/api/pet_hotel/auth", requestOptions)
    const result = await response.json()

    if(result)
    return {redirect: {
            permanent: false,
            destination: "/orders",
        }
    }
}
