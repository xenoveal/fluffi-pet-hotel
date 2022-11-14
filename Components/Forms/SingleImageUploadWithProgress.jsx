// import React, { useEffect, useState } from 'react'

function SingleImageUploadWithProgress({file, errors, onDelete}) {
    // console.log(file.file)
    // const [progress, setProgress] = useState(0)
    // useEffect(()=>{
    //     async function upload(){
    //         const url = await uploadFile(file, setProgress)
    //         onUpload(file, url)
    //     }
    //     upload()
    // },[file, onUpload])
    return (
        <div>
            {/* progress: {progress} */}
            file: {file.path}
            <br/>
            <div className='text-red-600'>
                {
                    errors[0]?.message!==undefined?
                    "Error: ".concat(errors[0]?.message):""
                }
            </div>
            {/* {
                JSON.stringify(errors)
            } */}
            <div>
                <button className='text-red-600' onClick={()=>onDelete(file)}>delete</button>

            </div>
        </div>
    )
}

export default SingleImageUploadWithProgress

// function uploadFile(file, onProgress){
//     return new Promise((res, rej) => {
        
//         const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`
//         const preset = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET
//         const xhr = new XMLHttpRequest()
//         xhr.open('POST', url)
//         xhr.onload = ()=>{
//             const response = JSON.parse(xhr.responseText)
//             res(response.secure_url)
//         }
//         xhr.onerror = (evt) => rej(evt)
//         xhr.upload.onprogress = (event) => {
//             if(event.lengthComputable){
//                 const percentage = event.loaded/event.total*100
//                 onProgress(Math.round(percentage))
//             }
//         }
//         const formData = new FormData()
//         formData.append('file', file.file)
//         formData.append('upload_preset', preset)
//         xhr.send(formData)
//     })
// }