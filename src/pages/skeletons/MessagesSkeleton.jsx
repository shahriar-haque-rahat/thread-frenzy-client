

const MessagesSkeleton = () => {
    return (
        <div className="space-y-10 mr-2 md:mr-0">
            <div className="h-40 w-full flex gap-4 items-center bg-gray-300 animate-pulse">
                <div className="w-full h-full"></div>
            </div>
            <div>
                {[...Array(2)].map(index => (
                    <div key={index} className="border p-4 mb-4">
                        <div className="flex gap-2 items-center">
                            <div className="h-5 w-1/4 bg-gray-300 animate-pulse"></div>
                            <div className="h-3 w-1/6 bg-gray-300 animate-pulse"></div>
                        </div>
                        <div className="h-4 w-3/4 bg-gray-300 animate-pulse mt-2"></div>
                        <div className="h-4 w-2/3 bg-gray-300 animate-pulse mt-1"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MessagesSkeleton;
