const SalesOverviewSkeleton = () => {
    return (
        <>
            <div className="space-y-6">
                <div className="h-40 w-full bg-gray-300 animate-pulse pl-10 pt-6 flex gap-4 items-center">
                    <div className="w-1/4 h-10 bg-gray-400 animate-pulse"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className=" h-[480px] bg-gray-300 animate-pulse"></div>
                    <div className=" h-[480px] bg-gray-300 animate-pulse"></div>
                    <div className=" h-[480px] bg-gray-300 animate-pulse"></div>
                    <div className=" h-[480px] bg-gray-300 animate-pulse"></div>
                </div>
            </div>
        </>
    );
};

export default SalesOverviewSkeleton;
