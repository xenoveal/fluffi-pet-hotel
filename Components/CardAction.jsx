import Notification from "./Notification"

function CardAction({order, show, setShow, setLoad}){
    let description = ""
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
        
        setLoad(true)
        fetch("https://www.fluffy.umkmbedigital.com/public/api/reservation/order/update-status", requestOptions)
            .then(response => response.json())
            .then(()=>{
                setShow(true)
                setTimeout(()=>setShow(false), 2000)
                setLoad(false)
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

    return(
        <>
        <Notification title="Sukses Mengubah Status" description={description} show={show} setShow={setShow} />
        
        {
            order.order_status === "waiting-for-confirmation" ? 
            <div className="px-4 py-4 sm:px-6">
                <button onClick={()=>changeOrderStatus(order.order_id, "canceled")} type="button" className="ml-2 sm:ml-0 relative inline-flex items-center px-2 py-3 border border-transparent shadow-sm text-xs font-medium rounded-md text-black bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Tolak Order</button>
                <button onClick={()=>changeOrderStatus(order.order_id, "booking-confirm")} type="button" className="mt-2 sm:mt-0 ml-2 relative inline-flex items-center px-2 py-3 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Terima Order</button>
            </div>
            : <></>
        }
        {
            order.order_status === "booking-confirm" ? 
            <div className="px-4 py-4 sm:px-6">
                <button onClick={()=>changeOrderStatus(order.order_id, "waiting-for-confirmation")} type="button" className="ml-2 sm:ml-0 relative inline-flex items-center px-2 py-3 border border-transparent shadow-sm text-xs font-medium rounded-md text-black bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Batal Terima Order</button>
                <button onClick={()=>changeOrderStatus(order.order_id, "in-monitoring")} type="button" className="mt-2 sm:mt-0 ml-2 relative inline-flex items-center px-2 py-3 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Start Monitoring</button>
            </div>
            : <></>
        }
        {
            order.order_status === "in-monitoring" ? 
            <div className="px-4 py-4 sm:px-6">
                <button onClick={()=>changeOrderStatus(order.order_id, "booking-confirm")} type="button" className="ml-2 sm:ml-0 relative inline-flex items-center px-2 py-3 border border-transparent shadow-sm text-xs font-medium rounded-md text-black bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Batal Mulai Monitoring</button>
                <button onClick={()=>changeOrderStatus(order.order_id, "finish-order")} type="button" className="mt-2 sm:mt-0 ml-2 relative inline-flex items-center px-2 py-3 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Selesaikan Monitoring</button>
            </div>
            : <></>
        }
        </>
    )
}

export default CardAction