import { useState, useEffect } from "react";
import Notification from "./Notification";
import OrderListDetail from "./OrderListDetail";

function OrderList(){

    const [show, setShow] = useState(false)
    const [orders, setOrders] = useState([])
    const [open, setOpen] = useState(-1)
    let description = ""

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

    function changeOrderStatus(order_id, status_to_change){
        var raw = {
            order_id: order_id,
            order_status: status_to_change
        }

        var requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(raw),
            redirect: 'follow',
            url: "www.fluffy.umkmbedigital.com"
        }
        
        fetch("https://www.fluffy.umkmbedigital.com/public/api/reservation/order/update-status", requestOptions)
            .then(response => response.json())
            .then(()=>{
                setShow(true)
                setTimeout(()=>setShow(false), 500)
                switch (status_to_change) {
                    case "canceled":
                        description = "Order ditolak oleh pet hotel"
                        break;
                    case "booking-confirm":
                        description = "Order diterima oleh pet hotel"
                        break;
                    case "in-monitoring":
                        description = "Hewan telah dititipkan dan akan dimonitoring"
                        break;
                    case "finish-order":
                        description = "Order telah diselesaikan dan hewan telah dikembalikan"
                        break;
                    default:
                        break;
                }
            })
            .catch(error => console.log('error', error))
    }



    useEffect(()=>{
        var raw = {
            user_id: 1,
            order_status: "aktif"
        }

        var requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(raw),
            redirect: 'follow',
            url: "www.fluffy.umkmbedigital.com"
        }
        
        fetch("https://www.fluffy.umkmbedigital.com/public/api/reservation/order/list", requestOptions)
            .then(response => response.json())
            .then(result => {setOrders(result.data); console.log(result.data)})
            .catch(error => console.log('error', error))
    },[show])

    return(
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <Notification title="Sukses Mengubah Status" description={description} show={show} setShow={setShow} />
            <ul role="list" className="divide-y divide-gray-200">
                {
                    orders.map(order => {
                        return(
                            <>
                            <li>
                                <a href="#" onClick={()=>open===order.order_id?setOpen(-1):setOpen(order.order_id)} className={"block".concat(
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
                                                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                                                    </svg>
                                                    <p>
                                                        Check In: <time dateTime={order.order_date_checkin}>{formatDate(order.order_date_checkin)}</time>
                                                    </p>


                                                </div>

                                                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                                                    </svg>
                                                    <p>
                                                        Check Out: <time dateTime={order.order_date_checkout}>{formatDate(order.order_date_checkout)}</time>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                                <p className="text-indigo-600 hover:text-indigo-900">Lihat Detail</p>
                                                <svg className={"h-5 w-5 text-gray-400".concat(
                                                    order.order_id === open ? " rotate-90":""
                                                )} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                                </svg>


                                            </div>

                                        </div>
                                        {
                                            (order.order_id === open) ?
                                            <OrderListDetail details={order.order_detail} /> : <></>
                                        }

                                    </div>
                                </a>
                                <div className="px-4 py-4 sm:px-6">
                                    <div className="flex-shrink-0">
                                        <button onClick={()=>changeOrderStatus(order.order_id, "canceled")} type="button" className="relative inline-flex items-center px-2 py-1 border border-transparent shadow-sm text-xs font-medium rounded-md text-black bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Tolak Order</button>
                                        <button onClick={()=>changeOrderStatus(order.order_id, "booking-confirm")} type="button" className="mt-2 sm:mt-0 sm:ml-2 relative inline-flex items-center px-2 py-1 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Terima Order</button>
                                    </div>
                                </div>

                            </li>
                            </>
                        )
                    })
                }
                
            </ul>
        </div>

    )

}

export default OrderList;