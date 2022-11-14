import { useRouter } from 'next/router';
import ShowMonitoring from '../../../../Components/ShowMonitoring';

function Monitoring(){
    const router = useRouter()
    const {order_detail, order_detail_id} = router.query
    return(
        <>
        <ShowMonitoring order_detail_id={order_detail_id} />
        <ShowMonitoring order_detail_id={order_detail} />
        </>
    )
}

export default Monitoring;