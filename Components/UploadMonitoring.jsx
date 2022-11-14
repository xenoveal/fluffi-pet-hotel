import Checkbox from './Forms/Checkbox'
import ImageUpload from './Forms/ImageUpload'
import InputText from './Forms/InputText'
import { useState, useEffect } from 'react'
import SuccessUploadModal from './SuccessUploadModal'

function UploadMonitoring({order_detail_id}) {
    const [currentSOP, setCurrentSOP] = useState([])

    const [activityError, setActivityError] = useState(true)
    const [monitoringError, setMonitoringError] = useState(true)

    const [monitoringActivity, setMonitoringActivity] = useState("")
    const [customSOP, setCustomSOP] = useState([])
    const [monitoringImages, setMonitoringImages] = useState([])

    const [progress, setProgress] = useState(0)
    const [load, setLoad] = useState(false)
    const [imageUploaded, setImageUploaded] = useState(1)
    const [done, setDone] = useState(false)
    
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
        
        fetch("https://www.fluffy.umkmbedigital.com/public/api/pet_hotel/monitoring/get-custom-sop-list", requestOptions)
            .then(response => response.json())
            .then(result => setCurrentSOP(result.data))
            .catch(error => console.log('error', error))
    },[])

    useEffect(()=>{
        if(monitoringActivity.replace(/\s/g, '')!=="") setActivityError(false)
    }, [monitoringActivity])

    useEffect(()=>{

        for (let index = 0; index < monitoringImages.length; index++) {
            const element = monitoringImages[index];
            if(element.errors[0]?.message===undefined){
                setMonitoringError(false)
            }
            
        }
    }, [monitoringImages])

    async function submitData(){
        let data = {
            monitoring_activity: monitoringActivity,
            order_detail_id: order_detail_id,
            custom_sops: [],
            monitoring_images: []
        }
        
        if(activityError || monitoringError) return

        setLoad(true)

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

                    await url
                    setImageUploaded(imageUploaded+1)

                }
            }
        }
        await upload()

        // console.log(data)

        var requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
            redirect: 'follow',
            url: "www.fluffy.umkmbedigital.com"
        }
        
        fetch("https://www.fluffy.umkmbedigital.com/public/api/pet_hotel/monitoring/add", requestOptions)
            .then(response => response.json())
            .then(setLoad(true))
            .then(setDone(true))
            .catch(error => console.log('error', error))
    }

    return (
        <div>
            {
                done?
                <SuccessUploadModal order_detail_id={order_detail_id} open={done} />:<></>
            }
            <form>
                <div className="space-y-8">
                    <ImageUpload images={monitoringImages} setImages={setMonitoringImages} />
                    <InputText input={monitoringActivity} setInput={setMonitoringActivity} />
                    <Checkbox currentInput={currentSOP} input={customSOP} setInput={setCustomSOP} />
                </div>
                {
                    !load ? 
                    <button
                        onClick={(e)=>{
                            e.preventDefault()
                            submitData()
                        }}
                        type="submit"
                        className={
                            `mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all
                            ${!(monitoringError || activityError)?" focus:ring-indigo-500 bg-indigo-600 hover:bg-indigo-700 text-white":" focus:ring-gray-500 bg-gray-300 text-gray-900"}
                            `
                        }
                    >
                        Tambah Monitoring
                    </button>
                    :
                    <div className='mt-2 mb-10'>
                        <div className='text-sm font-medium w-full flex justify-between'>
                            <p>{imageUploaded}/{monitoringImages.length} gambar sedang diupload</p>
                            <p>{progress}%</p>
                        </div>
                        <div className="w-full bg-gray-300 h-1">
                            <div className="bg-indigo-600 h-1" style={{width: progress+"%"}}></div>
                        </div>
                    </div>
                }
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