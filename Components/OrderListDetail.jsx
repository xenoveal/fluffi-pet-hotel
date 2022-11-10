import Link from "next/link";

function OrderListDetail({details}){
    return(
        <div>
            <ul role="list" className="divide-y divide-gray-200">
                {
                    details.map(detail=>{
                        return(
                            <li className="py-4 hover:bg-gray-50" key={detail.order_detail_id}>
                                <div className="flex space-x-3">
                                    <div className="flex-1 space-y-1">
                                        <h3 className="text-sm font-medium">{detail.pet_name}</h3>
                                        <div className="text-sm text-gray-500 flex">
                                            <p>Package Name: <strong>{detail.package_name}</strong></p>
                                            <p className="mt-2 sm:mt-0 sm:ml-6">Pet Detail: <strong>{detail.pet_type} - {detail.pet_size}</strong></p>
                                        </div>
                                    </div>
                                    <div className="ml-4 mt-2 flex-shrink-0">
                                        <Link href={"/monitoring/".concat(detail.order_detail_id)}>
                                            <button type="button" className="relative inline-flex items-center px-2 py-1 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Upload Monitoring</button>
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }

            </ul>
        </div>

    )
}

export default OrderListDetail;