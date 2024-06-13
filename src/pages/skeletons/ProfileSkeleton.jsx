

const ProfileSkeleton = () => {
    return (
        <div>
            <div className="h-40 w-full bg-gray-300 animate-pulse"></div>
            <div className="pt-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control w-full relative">
                        <div className="h-12 bg-gray-300 animate-pulse"></div>
                        <div className="absolute left-6 -top-2 h-4 w-16 bg-gray-300 animate-pulse"></div>
                    </div>
                    <div className="form-control w-full relative">
                        <div className="h-12 bg-gray-300 animate-pulse"></div>
                        <div className="absolute left-6 -top-2 h-4 w-16 bg-gray-300 animate-pulse"></div>
                    </div>
                </div>
                <div className="form-control relative">
                    <div className="h-12 bg-gray-300 animate-pulse"></div>
                    <div className="absolute left-6 -top-2 h-4 w-16 bg-gray-300 animate-pulse"></div>
                </div>

                <div className="text-xl bg-gray-300 animate-pulse h-6 w-48"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control w-full relative">
                        <div className="h-12 bg-gray-300 animate-pulse"></div>
                        <div className="absolute left-6 -top-2 h-4 w-16 bg-gray-300 animate-pulse"></div>
                    </div>
                    <div className="form-control w-full relative">
                        <div className="h-12 bg-gray-300 animate-pulse"></div>
                        <div className="absolute left-6 -top-2 h-4 w-16 bg-gray-300 animate-pulse"></div>
                    </div>
                </div>
                <div className="form-control relative w-full">
                    <div className="h-10 md:w-80 bg-gray-300 animate-pulse"></div>
                    <div className="h-16 mt-4">
                        <div className="h-14 w-14 bg-gray-300 animate-pulse"></div>
                    </div>
                </div>
                <div className="form-control mt-6">
                    <div className="bg-gray-300 animate-pulse h-12 w-full"></div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSkeleton;
