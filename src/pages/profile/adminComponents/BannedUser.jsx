

const BannedUser = ({ bannedUsers, handleUnbanUser }) => {
    return (
        <>
            <div>
                <h1 className=" text-white text-2xl font-bold bg-black py-2 text-center">Banned User</h1>

                <div className=" overflow-x-auto">
                    <table className="table">
                        <thead className="text-black font-bold pb-2">
                            <tr className="border-b border-black">
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {bannedUsers?.slice().reverse().map(user => (
                                <tr key={user._id} className="border-b border-gray-600 py-2">
                                    <td>{user.firstName}</td>
                                    <td>{user.userEmail}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>
                                        <button onClick={() => handleUnbanUser(user)} className=" text-blue-500 text-xs font-semibold">Unban User</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default BannedUser;