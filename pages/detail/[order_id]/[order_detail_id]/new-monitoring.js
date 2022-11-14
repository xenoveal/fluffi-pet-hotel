import { useRouter } from 'next/router';
import UploadMonitoring from '../../../../Components/UploadMonitoring';

function NewMonitoring(){
    const router = useRouter()
    const {order_id, order_detail_id} = router.query
    return(
        
        <div className="md:items-center md:justify-between px-5 py-10">
            <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">New Monitoring</h2>
            </div>
            <div className="mt-5">
                <UploadMonitoring order_detail_id={order_detail_id} order_id={order_id} />

            </div>
        </div>
    )
}

export default NewMonitoring;