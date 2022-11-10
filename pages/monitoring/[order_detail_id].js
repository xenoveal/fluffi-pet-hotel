import { useRouter } from 'next/router';

function Monitoring(){
    const router = useRouter()
    const {order_detail_id} = router.query
}

export default Monitoring;