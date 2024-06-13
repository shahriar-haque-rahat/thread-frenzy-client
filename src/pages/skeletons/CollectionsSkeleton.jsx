

const CollectionsSkeleton = () => {
    return (
        <div className="px-[3%] pb-32">
            <div className="flex justify-center items-center h-40 mb-10 border-b shadow-lg">
                <div className="bg-gray-300 h-14 w-72 animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="space-y-4">
                    <div className="h-10 bg-gray-300 animate-pulse"></div>
                    <div className="h-10 bg-gray-300 animate-pulse block md:hidden lg:block"></div>
                    <div className="h-10 bg-gray-300 animate-pulse block md:hidden lg:block"></div>
                    <div className="h-10 bg-gray-300 animate-pulse block md:hidden lg:block"></div>
                </div>
                <div className="flex gap-4">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="space-y-2 flex flex-col items-center">
                            <div className="bg-gray-300 w-60 h-72 rounded-none animate-pulse"></div>
                            <div className="bg-gray-300 h-5 w-52 animate-pulse"></div>
                            <div className="bg-gray-300 h-5 w-52 animate-pulse"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CollectionsSkeleton;
