import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import SingleImageUploadWithProgress from './SingleImageUploadWithProgress'

export default function ImageUpload({images, setImages}){
    const onDrop = useCallback((accFiles, rejFiles) => {
        const mappedAcc = accFiles.map((file)=>({file,errors:[]}))
        setImages((curr)=>[...curr, ...mappedAcc, ...rejFiles])
    }, [setImages])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': []
        }
    })
    
    function onDelete(file){
        console.log(file)
        setImages((curr) => curr.filter((fw) => fw.file !== file))
    }

    return(
        <div className="sm:col-span-6">
            <ul role="list" className="grid grid-cols-2 items-end gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {
                images.map((fileWrapper,idx)=>(
                    <SingleImageUploadWithProgress key={idx} onDelete={onDelete} file={fileWrapper.file} errors={fileWrapper.errors} />
                ))
            }
            </ul>
            <div {...getRootProps()} className="mt-4 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                >
                    <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    />
                </svg>
                <div className="flex text-sm text-gray-600">
                    <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                        <span>
                            {
                                isDragActive ?
                                "Drop here" :
                                "Upload a file"
                            }

                        </span>
                        <input {...getInputProps()} id="file" name="file" type="file" className="sr-only" />
                    </label>
                    
                    <p className="pl-1">
                        {
                            isDragActive ?
                            " to upload your file":
                            " or drag and drop"
                        }
                    </p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG up to 1MB</p>
                </div>
            </div>
        </div>

    )

}