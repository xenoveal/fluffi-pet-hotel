import OrderList from "../Components/OrderList";

function Home() {

    return (
        <>
        
        <div className="md:items-center md:justify-between px-5 py-10">
            <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Order List</h2>
            </div>
            <div className="mt-5">
                <OrderList />

            </div>
        </div>


        </>
    )
}


export default Home;
