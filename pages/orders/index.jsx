import OrderList from "../../Components/OrderList";
import { getSession } from "next-auth/react";

function Orders({owner_id}) {

    return (
        <>
        
        <div className="md:items-center md:justify-between px-5 py-10">
            <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Order List</h2>
            </div>
            <div className="mt-5">
                <OrderList owner_id={owner_id} />

            </div>
        </div>


        </>
    )
}


export default Orders;

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


    // return {
    //     props: {
    //         owner_id: result.data.owner_id,
    //     }
    // }
    return {
        props: {
            owner_id: 2,
        }
    }
}

