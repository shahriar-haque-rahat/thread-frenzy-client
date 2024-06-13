

const CartSkeleton = () => {
    return (
        <div className="px-[3%] grid lg:grid-cols-5 gap-10 pb-32">
            <div className="lg:col-span-3 space-y-10">
                <h1 className="text-3xl mb-10 bg-gray-300 h-10 w-32 animate-pulse"></h1>
                {[...Array(1)].map((_, index) => (
                    <div key={index} className="flex gap-4 h-40 border border-gray-300 animate-pulse">
                        <div className="bg-gray-300 h-full w-32"></div>
                        <div className="w-full flex flex-col justify-between p-3 space-y-2">
                            <div className="flex justify-between items-start">
                                <div className="space-y-2">
                                    <div className="bg-gray-300 h-6 w-24"></div>
                                    <div className="bg-gray-300 h-4 w-16"></div>
                                    <div className="bg-gray-300 h-4 w-10"></div>
                                </div>
                                <div className="bg-gray-300 h-6 w-6"></div>
                            </div>
                            <div className="flex justify-between items-end">
                                <div className="flex items-center gap-4">
                                    <div className="bg-gray-300 w-[20px] h-[20px] lg:w-[35px] lg:h-[35px] rounded-full"></div>
                                    <div className="bg-gray-300 h-6 w-10"></div>
                                    <div className="bg-gray-300 w-[20px] h-[20px] lg:w-[35px] lg:h-[35px] rounded-full"></div>
                                </div>
                                <div className="bg-gray-300 h-6 w-16"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-gray-300 h-10 w-40 animate-pulse"></div>
                <div className="border-y border-gray-300 w-full space-y-3 py-6 px-2 animate-pulse">
                    <div className="flex justify-between">
                        <div className="bg-gray-300 h-6 w-16"></div>
                        <div className="bg-gray-300 h-6 w-12"></div>
                    </div>
                    <div className="flex justify-between">
                        <div className="bg-gray-300 h-6 w-24"></div>
                        <div className="bg-gray-300 h-6 w-12"></div>
                    </div>
                </div>
                <div className="flex justify-between px-2 text-lg font-semibold animate-pulse">
                    <div className="bg-gray-300 h-6 w-16"></div>
                    <div className="bg-gray-300 h-6 w-12"></div>
                </div>
                <div className="px-2">
                    <div className="bg-gray-300 h-12 w-full animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

export default CartSkeleton;
