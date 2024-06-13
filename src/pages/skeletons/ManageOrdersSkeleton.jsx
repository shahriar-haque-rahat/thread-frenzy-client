

const ManageOrdersSkeleton = () => {
    return (
        <div className="space-y-6 mr-2 md:mr-0">
            <div className="h-40 w-full bg-gray-300 animate-pulse"></div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className="h-8 bg-gray-300 animate-pulse"></th>
                            <th className="h-8 bg-gray-300 animate-pulse"></th>
                            <th className="h-8 bg-gray-300 animate-pulse"></th>
                            <th className="h-8 bg-gray-300 animate-pulse"></th>
                            <th className="h-8 bg-gray-300 animate-pulse"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array(5).fill().map((_, index) => (
                            <tr key={index}>
                                <td className="h-8 bg-gray-300 animate-pulse"></td>
                                <td className="h-8 bg-gray-300 animate-pulse"></td>
                                <td className="h-8 bg-gray-300 animate-pulse"></td>
                                <td className="h-8 bg-gray-300 animate-pulse"></td>
                                <td className="h-8 bg-gray-300 animate-pulse">
                                    <button className="h-6 w-20 bg-gray-300 animate-pulse"></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageOrdersSkeleton;
