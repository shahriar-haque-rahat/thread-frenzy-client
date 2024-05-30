


const ManageOrders = () => {
    

    return (
        <div className="mt-6 mr-6 space-y-6">
            <h1 className="h-40 w-full text-5xl font-semibold pl-10 pt-6 text-white bg-black flex gap-4 items-center">Order Management</h1>
            <div className=" pt-10">
                <div className=" grid grid-cols-6 gap-3 text-center font-bold pb-2 border-b border-gray-800">
                    <div>Date</div>
                    <div>Order ID</div>
                    <div>Transaction ID</div>
                    <div>Quantity</div>
                    <div>Total Price</div>
                    <div className=" text-start">Status</div>
                </div>
                {/* TODO: ordered product listing */}
            </div>
        </div>
    );
};

export default ManageOrders;