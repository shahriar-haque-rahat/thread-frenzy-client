

const CollectionsSkeleton = () => {
    return (
        <div className="px-[3%] pb-32">
            <div className="flex justify-center items-center h-40 mb-10 border-b shadow-lg">
                <div className="skeleton h-14 w-72"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="space-y-4">
                    <div className="h-10 bg-gray-200 rounded"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                </div>
                <div className="flex gap-4">
                    <div className=" space-y-2 flex flex-col items-center">
                        <div className="skeleton w-60 h-72 rounded-none"></div>
                        <div className="skeleton h-5 w-52"></div>
                        <div className="skeleton h-5 w-52"></div>
                    </div>
                    <div className=" space-y-2 flex flex-col items-center">
                        <div className="skeleton w-60 h-72 rounded-none"></div>
                        <div className="skeleton h-5 w-52"></div>
                        <div className="skeleton h-5 w-52"></div>
                    </div>
                    <div className=" space-y-2 flex flex-col items-center">
                        <div className="skeleton w-60 h-72 rounded-none"></div>
                        <div className="skeleton h-5 w-52"></div>
                        <div className="skeleton h-5 w-52"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollectionsSkeleton;