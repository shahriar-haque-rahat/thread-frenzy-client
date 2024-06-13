

const ManageProductsSkeleton = () => {
    return (
        <div className="space-y-6 mr-2 md:mr-0">
            <div className="h-40 w-full animate-pulse bg-gray-300 flex gap-4 items-center"></div>
            <div className=" h-10 p-2 w-full animate-pulse bg-gray-300"></div>

            <div className='grid grid-cols-2 gap-6'>
                <div>
                    <div className="mr-2 w-24 h-6 bg-gray-300 animate-pulse"></div>
                    <div className="w-full h-10 bg-gray-300 animate-pulse mt-2"></div>
                </div>
                <div>
                    <div className="mr-2 w-32 h-6 bg-gray-300 animate-pulse"></div>
                    <div className="w-full h-10 bg-gray-300 animate-pulse mt-2"></div>
                </div>
            </div>

            <div>
                <div className="mr-2 w-32 h-6 bg-gray-300 animate-pulse"></div>
                <div className="w-full h-10 bg-gray-300 animate-pulse mt-2"></div>
            </div>

            <div className=" h-16 bg-gray-300  py-3 animate-pulse"></div>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead className="pb-2">
                        <tr>
                            <th className="w-24 h-8 bg-gray-300 animate-pulse"></th>
                            <th className="h-8 bg-gray-300 animate-pulse"></th>
                            <th className="h-8 bg-gray-300 animate-pulse"></th>
                            <th className="h-8 bg-gray-300 animate-pulse"></th>
                            <th className="h-8 bg-gray-300 animate-pulse"></th>
                            <th className="h-8 bg-gray-300 animate-pulse"></th>
                            <th className="h-8 bg-gray-300 animate-pulse"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(5)].map((_, idx) => (
                            <tr key={idx}>
                                <td className="w-24 h-28 bg-gray-300 animate-pulse"></td>
                                <td className="h-10 bg-gray-300 animate-pulse"></td>
                                <td className="h-10 bg-gray-300 animate-pulse"></td>
                                <td className="h-10 bg-gray-300 animate-pulse"></td>
                                <td className="h-10 bg-gray-300 animate-pulse"></td>
                                <td className="h-10 bg-gray-300 animate-pulse"></td>
                                <td className="h-10 bg-gray-300 animate-pulse"></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProductsSkeleton;
