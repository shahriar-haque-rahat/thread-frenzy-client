import { useDispatch } from "react-redux";
import { setCurrentBannedPage } from "../../../../redux/userSlice";
import DashboardPagination from "../../DashboardPagination";
import { useContext } from "react";
import { AuthContext } from "../../../../provider/AuthProvider";


const BannedUser = ({ bannedUsers, userStatus, totalBannedPages, currentBannedPage, handleUnbanUser, totalBannedItems }) => {
    const { buttonDisabled } = useContext(AuthContext);
    const dispatch = useDispatch();

    const handlePageChange = (newPage) => {
        dispatch(setCurrentBannedPage(newPage));
    }

    return (
        <>
            <div>
                <h1 className=" text-white text-2xl font-bold bg-black py-2 text-center">Banned User</h1>

                {
                    userStatus === 'succeeded' && bannedUsers.length === 0
                        ? <p className=" mt-10 text-center">No data found </p>
                        : <>
                            <div className=" overflow-x-auto">
                                <table className="table">
                                    <thead className="text-black dark:text-white font-bold pb-2">
                                        <tr className="border-b border-black dark:border-white">
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bannedUsers?.map(user => (
                                            <tr key={user._id} className="border-b py-2">
                                                <td>{user.firstName}</td>
                                                <td>{user.userEmail}</td>
                                                <td>{user.phoneNumber}</td>
                                                {
                                                    buttonDisabled
                                                        ? <td><button className=" text-blue-500 text-xs font-semibold">Unban User</button></td>
                                                        : <td><button onClick={() => handleUnbanUser(user)} className=" text-blue-500 text-xs font-semibold">Unban User</button></td>
                                                }
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <DashboardPagination totalItems={totalBannedItems} currentPage={currentBannedPage} totalPages={totalBannedPages} handlePageChange={handlePageChange} />
                        </>
                }
            </div>
        </>
    );
};

export default BannedUser;