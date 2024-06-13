

const ManageUsersSkeleton = () => {
    return (
        <div className="space-y-10 mr-2 md:mr-0">
            <div className="h-40 w-full animate-pulse bg-gray-300 flex gap-4 items-center"></div>

            <div>
                <div className=" py-2 animate-pulse bg-gray-300"></div>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead className="font-bold pb-2">
                            <tr>
                                <th className="h-8 bg-gray-300 animate-pulse"></th>
                                <th className="h-8 bg-gray-300 animate-pulse"></th>
                                <th className="h-8 bg-gray-300 animate-pulse"></th>
                                <th className="h-8 bg-gray-300 animate-pulse"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(2)].map((_, idx) => (
                                <tr key={idx}>
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

            <div>
                <div className="py-2 animate-pulse bg-gray-300"></div>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead className="pb-2">
                            <tr>
                                <th className="h-8 bg-gray-300 animate-pulse"></th>
                                <th className="h-8 bg-gray-300 animate-pulse"></th>
                                <th className="h-8 bg-gray-300 animate-pulse"></th>
                                <th className="h-8 bg-gray-300 animate-pulse"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(5)].map((_, idx) => (
                                <tr key={idx}>
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
        </div>
    );
};

export default ManageUsersSkeleton;
