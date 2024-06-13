

const ProductDetailsSkeleton = () => {
    return (
        <div className="px-[3%] mt-16 pb-32 animate-pulse">
            <div className="grid grid-cols-5 gap-5">
                {/* Image skeleton */}
                <div className="col-span-3 grid grid-cols-2 grid-rows-2 gap-2 h-fit">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="h-96 w-full bg-gray-300 animate-pulse"></div>
                    ))}
                </div>

                {/* Product Info skeleton */}
                <div className="col-span-2 space-y-6">
                    {/* Product name and wishlist */}
                    <div className="flex gap-12">
                        <div className="h-8 w-48 bg-gray-300 animate-pulse"></div>
                        <div className="h-8 w-8 bg-gray-300 animate-pulse rounded-full"></div>
                    </div>

                    {/* Rating skeleton */}
                    <div className="h-6 w-32 bg-gray-300 animate-pulse"></div>

                    {/* Price skeleton */}
                    <div className="h-8 w-24 bg-gray-300 animate-pulse"></div>

                    {/* Colors skeleton */}
                    <div className="flex gap-3">
                        <span>Colors:</span>
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="h-8 w-8 bg-gray-300 animate-pulse rounded-full"></div>
                        ))}
                    </div>

                    {/* Sizes skeleton */}
                    <div className="flex gap-3 items-center">
                        <span>Sizes:</span>
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="h-10 w-12 bg-gray-300 animate-pulse"></div>
                        ))}
                    </div>

                    {/* Quantity and Add to Cart skeleton */}
                    <div className="flex items-center">
                        <div className="flex items-center gap-4 w-1/2">
                            <div className="h-8 w-8 bg-gray-300 animate-pulse rounded-full"></div>
                            <div className="h-10 w-16 bg-gray-300 animate-pulse"></div>
                            <div className="h-8 w-8 bg-gray-300 animate-pulse rounded-full"></div>
                        </div>
                        <div className="h-10 w-1/2 bg-gray-300 animate-pulse"></div>
                    </div>

                    {/* Collapsible sections skeleton */}
                    <div className="space-y-4">
                        <div className="h-10 bg-gray-300 animate-pulse"></div>
                        <div className="h-20 bg-gray-300 animate-pulse"></div>
                        <div className="h-10 bg-gray-300 animate-pulse"></div>
                        <div className="h-20 bg-gray-300 animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Similar Products skeleton */}
            <div className="mt-20">
                <div className="h-10 w-64 bg-gray-300 animate-pulse mb-10"></div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="space-y-4">
                            <div className="h-64 bg-gray-300 animate-pulse"></div>
                            <div className="h-8 w-48 bg-gray-300 animate-pulse"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Reviews skeleton */}
            <div className="border shadow-lg p-6 mt-10 space-y-6">
                <div className="h-10 w-48 bg-gray-300 animate-pulse mb-10"></div>
                <div className="space-y-4">
                    <div className="h-20 bg-gray-300 animate-pulse"></div>
                    <div className="h-20 bg-gray-300 animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsSkeleton;
