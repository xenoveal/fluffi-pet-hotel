import { useState, useEffect } from "react"
import Image from "next/image"
import { Carousel } from "react-responsive-carousel"

import "react-responsive-carousel/lib/styles/carousel.min.css";

function ShowMonitoring({order_detail_id}) {
    const [monitoring, setMonitoring] = useState([])

    useEffect(()=>{
        var raw = {
            order_detail_id: order_detail_id
        }

        var requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(raw),
            redirect: 'follow',
            url: "www.fluffy.umkmbedigital.com"
        }
        
        fetch("https://www.fluffy.umkmbedigital.com/public/api/pet_hotel/monitoring/get-list-by-order-detail", requestOptions)
            .then(response => response.json())
            .then(result => setMonitoring(result.data))
            .catch(error => console.log('error', error))
    },[order_detail_id])

    return (
        <div>

            <ul role="list" className="divide-y divide-gray-200">
                {monitoring.map((m) => (
                <li key={m.monitoring_id}>
                    <div className="space-y-4 my-4">
                        <div className="aspect-w-3 aspect-h-2 max-w-md">
                            <Carousel showThumbs={false}>
                                {
                                    m.monitoring_image?.map((monitoring_image, idx)=>(
                                        <Image
                                        key={idx}
                                        width={300} height={300} 
                                        className="object-cover shadow-lg rounded-lg" 
                                        src={monitoring_image.monitoring_image_url} 
                                        alt="asdf" />

                                    ))
                                }

                            </Carousel>
                        </div>

                        <div className="space-y-2">
                            <div className="text-lg leading-6 font-medium space-y-1">
                                <h3>{m.monitoring_activity}</h3>
                                <p className="text-indigo-600">{m.time_upload}</p>
                            </div>
                            <ul role="list">
                                {
                                    m.custom_sops?.map((custom_sop, idx)=>(
                                        <li key={idx} className="text-gray-900 text-sm py-1">
                                            {custom_sop.custom_sop_name}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </li>
                ))}
            </ul>
        </div>
    )
}

export default ShowMonitoring