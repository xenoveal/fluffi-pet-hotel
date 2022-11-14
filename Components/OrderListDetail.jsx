import Link from "next/link";


function OrderListDetail({order}){
    return(
        <div>
            <ul role="list" className="divide-y divide-gray-200 mt-5">
                {
                    order.order_detail.map(detail=>{
                        return(
                            <Link href={{
                                pathname: "/detail/[order_detail]/[order_detail_id]",
                                query: {
                                    order_detail: order.order_id,
                                    order_detail_id: detail.order_detail_id
                                }
                            }}
                            key={detail.order_detail_id}>
                                <li className={"py-4 px-4".concat(order.order_status==="in-monitoring"?" hover:bg-gray-50":"")}>
                                    <div className="flex space-x-3">
                                        <div className="flex-1 space-y-1">
                                            <h3 className="text-sm font-medium">{detail.pet_name}</h3>
                                            <div className="text-sm text-gray-500 flex flex-wrap">
                                                <p>Package Name: <strong>{detail.package_name}</strong></p>
                                                <p className="mt-2 sm:mt-0 sm:ml-6">Pet Detail: <strong>{detail.pet_type} - {detail.pet_size}</strong></p>
                                            </div>
                                        </div>
                                        {
                                            order.order_status === "in-monitoring"?
                                                <div className="ml-4 mt-2 flex-shrink-0" onClick={(e)=>e.preventDefault()}>
                                                    <Link href={{
                                                        pathname: "/detail/[order_detail]/[order_detail_id]/new-monitoring",
                                                        query: {
                                                            order_detail: order.order_id,
                                                            order_detail_id: detail.order_detail_id
                                                        }
                                                    }
                                                    }>
                                                        <button type="button" className="relative px-2 py-2 inline-flex items-center border border-transparent shadow-sm text-xs font-medium rounded-md text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Tambah Monitoring</button>
                                                    </Link>
                                                </div> 
                                            
                                            : <></>
                                        }
                                    </div>
                                </li>
                            </Link>
                        )
                    })
                }

            </ul>
        </div>

    )
}

export default OrderListDetail;