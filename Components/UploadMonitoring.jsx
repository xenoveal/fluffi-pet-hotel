import Checkbox from './Forms/Checkbox'
import ImageUpload from './Forms/ImageUpload'
import InputText from './Forms/InputText'
import { useState, useEffect } from 'react'

function UploadMonitoring({order_id, order_detail_id}) {
    const [currentSOP, setCurrentSOP] = useState([])

    const [isError, setIsError] = useState(true)

    const [monitoringActivity, setMonitoringActivity] = useState("")
    const [customSOP, setCustomSOP] = useState([])
    const [monitoringImages, setMonitoringImages] = useState([])

    const [progress, setProgress] = useState(0)
    
    useEffect(()=>{
        var raw = {
            pet_hotel_id: 1
        }

        var requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(raw),
            redirect: 'follow',
            url: "www.fluffy.umkmbedigital.com"
        }
        
        fetch("https://www.fluffy.umkmbedigital.com/public/api/pet_hotel/order-list", requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result.data)
                for (let index = 0; index < result.data.length; index++) {
                    const order = result.data[index];
                    if (order.order_id != order_id) continue
                    for (let index2 = 0; index2 < order.order_detail.length; index2++) {
                        const order_detail = order.order_detail[index2];
                        if(order_detail.order_detail_id == order_detail_id) continue
                        setCurrentSOP(order_detail.custom_s_o_p)
                        // console.log(currentSOP)
                        break
                    }
                }
            })
            .catch(error => console.log('error', error))
    },[order_detail_id, order_id])

    useEffect(()=>{
        const isNotError = ()=>{
            if(monitoringActivity.replace(/\s/g, '')==="") return false
            for (let index = 0; index < monitoringImages.length; index++) {
                const element = monitoringImages[index];
                if(element.errors[0]?.message===undefined){
                    setIsError(false)
                    break
                }
                
            }

        }
    }, [monitoringActivity, monitoringImages])

    async function submitData(){
        let data = {
            monitoring_activity: monitoringActivity,
            order_detail_id: order_detail_id,
            custom_sops: [],
            monitoring_images: []
        }

        // files.map((fileWrapper,idx)=>(
        //     <SingleImageUploadWithProgress key={idx} file={fileWrapper.file} />
        // ))
        if(isError) return

        for (let index = 0; index < customSOP.length; index++) {
            const element = customSOP[index];
            data.custom_sops.push(
                {custom_sop_id: element}
            )
        }

        async function upload(){
            for (let index = 0; index < monitoringImages.length; index++) {
                const image = monitoringImages[index];
                // console.log(image.file)
                if(image.errors[0]?.message===undefined){
                    const url = await uploadFile(image.file, setProgress)

                    data.monitoring_images.push(
                        {monitoring_image_url: await url}
                    )

                }
            }
        }
        await upload()

        console.log(data)

        var requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
            redirect: 'follow',
            url: "www.fluffy.umkmbedigital.com"
        }
        
        fetch("https://www.fluffy.umkmbedigital.com/public/api/monitoring/add", requestOptions)
            .then(response => response.json())
            .then(result => console.log(result.status))
            .catch(error => console.log('error', error))
    }

    return (
        <div>
            <form>
                <div className="space-y-8">
                    <ImageUpload images={monitoringImages} setImages={setMonitoringImages} />
                    <InputText input={monitoringActivity} setInput={setMonitoringActivity} />
                    <Checkbox currentInput={currentSOP} input={customSOP} setInput={setCustomSOP} />
                </div>
                <button
                    onClick={(e)=>{
                        e.preventDefault()
                        submitData()
                    }}
                    type="submit"
                    className={
                        `mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all
                        ${!isError?" focus:ring-indigo-500 bg-indigo-600 hover:bg-indigo-700 text-white":" focus:ring-gray-500 bg-gray-300 text-gray-900"}
                        `
                    }
                >
                    Tambah Monitoring
                </button>
            </form>
        </div>
    )
}

export default UploadMonitoring

function uploadFile(file, onProgress){
    return new Promise((res, rej) => {
        
        const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`
        const preset = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET
        const xhr = new XMLHttpRequest()
        xhr.open('POST', url)
        xhr.onload = ()=>{
            const response = JSON.parse(xhr.responseText)
            res(response.secure_url)
        }
        xhr.onerror = (evt) => rej(evt)
        xhr.upload.onprogress = (event) => {
            if(event.lengthComputable){
                const percentage = event.loaded/event.total*100
                onProgress(Math.round(percentage))
            }
        }
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', preset)
        xhr.send(formData)
    })
}