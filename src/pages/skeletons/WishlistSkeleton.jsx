

const WishlistSkeleton = () => {
    return (
        <div>
            <div className="h-40 w-full animate-pulse bg-gray-300 flex gap-4 items-center"></div>
            <div className="pt-10 grid grid-cols-2 md:grid-cols-3 gap-3">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="relative">
                        <div className="h-72 xl:h-96 w-full animate-pulse bg-gray-300"></div>
                        <div className="absolute top-2 left-2 h-6 w-20 animate-pulse bg-gray-300"></div>
                        <div className="absolute bottom-0 w-full h-16 animate-pulse bg-gray-300"></div>
                        <div className="absolute top-2 right-2 h-7 w-7 animate-pulse bg-gray-300 rounded-full"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WishlistSkeleton;
