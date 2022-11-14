// const customSOPs = [
//     { id: 1, name: 'Kasih whiskas aja' },
//     { id: 2, name: 'dielus elus tiap pagi' },
//     { id: 3, name: 'tempat makan dibersihkan' },
//     { id: 4, name: 'kandang jangan sampai ada kotoran' },
//     { id: 5, name: 'digrooming' },
//     { id: 6, name: 'tempat makan dibersihkan' },
//     { id: 7, name: 'kandang jangan sampai ada kotoran' },
//     { id: 8, name: 'digrooming' },
//   ]
  
export default function Checkbox({currentInput, input, setInput}) {
    // console.log(input)
    return (
        <fieldset>
            <legend className="text-sm font-medium text-gray-900">Custom SOP Terkait</legend>
            <div className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
                {currentInput?currentInput.map((item, idx) => (
                <div key={idx} className="relative flex items-start py-4">
                    <div className="min-w-0 flex-1 text-xs">
                        <label htmlFor={`item-${item.custom_sop_id}`} className="font-medium text-gray-700 select-none">
                            {item.custom_sop_name}
                        </label>
                        </div>
                        <div className="ml-3 flex items-center h-5">
                        <input
                            id={`item-${item.custom_sop_id}`}
                            name={`item-${item.custom_sop_id}`}
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            value={input.indexOf(item.custom_sop_id)!==-1}
                            onChange={()=>{
                                let new_input = input
                                const index = input.indexOf(item.custom_sop_id)
                                if (index===-1) {
                                    input.push(item.custom_sop_id)
                                }
                                else{
                                    new_input.splice(index, 1);
                                }
                                setInput(new_input)
                            }}
                        />
                    </div>
                </div>
                )):<></>}
            </div>
        </fieldset>
    )
}
  