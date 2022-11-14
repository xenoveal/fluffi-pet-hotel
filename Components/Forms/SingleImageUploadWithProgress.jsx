import Image from "next/image"

function SingleImageUploadWithProgress({file, errors, onDelete}) {
    return (
        <li className="relative">
            <div className="group block w-full rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                <Image src={
                    URL.createObjectURL(file)
                } 
                width={300} height={300} 
                alt="img" className="object-cover pointer-events-none" />
            </div>
            <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{file.name}</p>
            <p className="block text-sm font-medium text-gray-500 pointer-events-none">
                {
                    file.size>1000000?
                    Math.round(file.size/1000000)+"MB":
                    Math.round(file.size/1000)+"KB"
                }
            </p>
            <p className="block text-sm font-medium text-red-600 pointer-events-none">
                {
                    errors[0]?.message!==undefined?
                    "Error: ".concat(errors[0]?.message):""
                }
            </p>
            <div>
                <button
                    type="button"
                    onClick={()=>onDelete(file)}
                    className="inline-flex items-center px-1 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>

            </div>
        </li>
    )
}

export default SingleImageUploadWithProgress
