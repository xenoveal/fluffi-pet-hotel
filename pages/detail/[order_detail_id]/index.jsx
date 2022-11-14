import { useRouter } from 'next/router';
import ShowMonitoring from '../../../Components/ShowMonitoring';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { useEffect } from 'react';

function Monitoring(){
    const { data: session } = useSession();
    const router = useRouter()
    useEffect(()=>{
        if(!session){
            router.replace("/")
        }

    },[router, session])
    const {order_detail_id} = router.query
    return(
        <>
        <div className="md:items-center md:justify-between px-5 py-10">
            <div>
                <nav className="sm:hidden" aria-label="Back">
                <Link href="/" className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
                    <ChevronLeftIcon className="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                    Back
                </Link>
                </nav>
                <nav className="hidden sm:flex" aria-label="Breadcrumb">
                <ol role="list" className="flex items-center space-x-4">
                    <li>
                    <div className="flex">
                        <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-700">
                        Order List
                        </Link>
                    </div>
                    </li>
                    <li>
                    <div className="flex items-center">
                        <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <Link href="#" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                        Lihat Monitoring
                        </Link>
                    </div>
                    </li>
                </ol>
                </nav>
            </div>
            <div className="mt-2 md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Lihat Monitoring</h2>
                </div>
            </div>
            <div className="mt-5">
                <ShowMonitoring order_detail_id={order_detail_id} />
            </div>
        </div>
        </>
    )
}

export default Monitoring;