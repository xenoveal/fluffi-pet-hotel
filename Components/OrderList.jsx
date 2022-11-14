import { useState, useEffect } from "react";
import CardAction from "./CardAction";
import OrderListDetail from "./OrderListDetail";

function OrderList({owner_id}){
    const [show, setShow] = useState(false)
    const [orders, setOrders] = useState([])
    const [open, setOpen] = useState(-1)
    const [load, setLoad] = useState(false)

    function formatDate (input) {
        var datePart = input.match(/\d+/g),
        year = datePart[0].substring(2),
        month = datePart[1], day = datePart[2]
        return day+'-'+month+'-'+year;
    }

    function statusPrettier(status){
        const splitStr = status.split("-")
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        return splitStr.join(' '); 
    }
    
    useEffect(()=>{
        var raw = {
            owner_id: owner_id
        }

        var requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(raw),
            redirect: 'follow',
            url: "www.fluffy.umkmbedigital.com"
        }
        
        fetch("https://www.fluffy.umkmbedigital.com/public/api/pet_hotel/order/list", requestOptions)
            .then(response => response.json())
            .then(result => {setOrders(result.data)})
            .catch(error => console.log('error', error))
    },[show])

    return(
        <>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
                {
                    orders.map(order => {
                        return(
                            <li key={order.order_id}>
                                <div onClick={()=>open===order.order_id?setOpen(-1):setOpen(order.order_id)
                                } className={"block cursor-pointer".concat(
                                    open!==order.order_id?" hover:bg-gray-50":""
                                )}>
                                    <div className="px-4 py-4 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-indigo-600 truncate">{order.order_code}</p>
                                            <div className="ml-2 flex-shrink-0 flex">
                                            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{statusPrettier(order.order_status)}</p>
                                            </div>
                                        </div>
                                        <div className="mt-2 sm:flex sm:justify-between">
                                            <div className="sm:flex">
                                                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                                    </svg>
                                                    <p>
                                                        Check In: <strong><time dateTime={order.order_date_checkin}>{formatDate(order.order_date_checkin)}</time></strong>
                                                    </p>


                                                </div>

                                                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                                    </svg>
                                                    <p>
                                                        Check Out: <strong><time dateTime={order.order_date_checkout}>{formatDate(order.order_date_checkout)}</time></strong>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                                <p className="text-indigo-600 hover:text-indigo-900">Lihat Detail</p>
                                                <svg className={"h-5 w-5 text-gray-400".concat(
                                                    order.order_id === open ? " rotate-90":""
                                                )} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                </svg>


                                            </div>

                                        </div>
                                        {
                                            (order.order_id === open) ?
                                            <OrderListDetail order={order}/> : <></>
                                        }

                                    </div>
                                </div>
                                {
                                    load ? 
                                    <div className="px-4 py-4 sm:px-6 text-sm text-gray-500">
                                        Sedang Dalam Proses...
                                    </div>
                                    :
                                    <CardAction order={order} show={show} setShow={setShow} setLoad={setLoad}/>

                                }

                            </li>
                        )
                    })
                }
                
            </ul>
        </div>
        </>

    )

}

export default OrderList;