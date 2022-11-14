export default function InputText({input, setInput}){

    return(
        <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
            <label
                htmlFor="name"
                className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
            >
                Nama Aktivitas <span className="text-red-600">*</span>
            </label>
            <input
                type="text"
                name="name"
                id="name"
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 sm:text-sm"
                placeholder="Makan"
                value={input}
                onChange={(e)=>setInput(e.target.value)}
            />
        </div>

    )                         

}