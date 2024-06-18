import { FaBan } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import DashboardPagination from "../../DashboardPagination";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../../../redux/userSlice";


const ActiveUsers = ({ users, totalPages, currentPage, handleRoleChange, handleDeleteUser, handleBanUser }) => {
    const dispatch = useDispatch();

    const handlePageChange = (newPage) => {
        dispatch(setCurrentPage(newPage));
    }

    return (
            <div>
                <h1 className=" text-white text-2xl font-bold bg-black py-2 text-center">User</h1>

                <div className=" overflow-x-auto">
                    <table className="table">
                        <thead className="text-black dark:text-white font-bold pb-2">
                            <tr className="border-b border-black dark:border-white">
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map(user => (
                                <tr key={user._id} className="border-b py-2">
                                    <td>{user.firstName}</td>
                                    <td>{user.userEmail}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>
                                        <button onClick={() => handleRoleChange(user)} className=" text-blue-500 text-xs font-semibold">Make Admin</button>
                                    </td>
                                    <td><FaBan onClick={() => handleBanUser(user)} className="hover:cursor-pointer" size={18} /></td>
                                    <td><MdOutlineDeleteForever onClick={() => handleDeleteUser(user._id)} className="text-red-500 hover:cursor-pointer" size={25} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <DashboardPagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
            </div>
    );
};

export default ActiveUsers;