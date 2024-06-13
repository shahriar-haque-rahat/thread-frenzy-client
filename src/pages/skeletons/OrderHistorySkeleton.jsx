

const OrderHistorySkeleton = () => {
    return (
        <div className="mr-2 md:mr-0">
            <div className="h-40 w-full animate-pulse bg-gray-300 flex gap-4 items-center"></div>

            <div className="overflow-x-auto pt-10">
                <table className="table">
                    <thead className="pb-2">
                        <tr>
                            <th className="w-24 h-8 animate-pulse bg-gray-300"></th>
                            <th className="w-36 h-8 animate-pulse bg-gray-300"></th>
                            <th className="w-24 h-8 animate-pulse bg-gray-300"></th>
                            <th className="w-24 h-8 animate-pulse bg-gray-300"></th>
                            <th className="w-24 h-8 animate-pulse bg-gray-300"></th>
                            <th className="w-32 h-8 animate-pulse bg-gray-300"></th>
                            <th className="w-24 h-8 animate-pulse bg-gray-300"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(5)].map((_, index) => (
                            <tr key={index}>
                                <td className="w-24 h-10 animate-pulse bg-gray-300"></td>
                                <td className="w-36 h-10 animate-pulse bg-gray-300"></td>
                                <td className="w-24 h-10 animate-pulse bg-gray-300"></td>
                                <td className="w-24 h-10 animate-pulse bg-gray-300"></td>
                                <td className="w-24 h-10 animate-pulse bg-gray-300"></td>
                                <td className="w-32 h-10 animate-pulse bg-gray-300"></td>
                                <td className="w-24 h-10 animate-pulse bg-gray-300"></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderHistorySkeleton;
