import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUser, updateUser } from "../../../redux/userSlice";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { Helmet } from "react-helmet-async";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaBan } from "react-icons/fa";
import { addBanUser } from "../../../redux/banUserSlice";

const MySwal = withReactContent(Swal);

const ManageUsers = () => {
    const dispatch = useDispatch();
    const { user, userStatus, userError } = useSelector(state => state.user);
    const admins = user?.filter(admin => admin.role === 'admin');
    const users = user?.filter(user => user.role === 'user');

    const handleRoleChange = (user) => {
        MySwal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sure',
            customClass: {
                popup: 'square',
                confirmButton: 'square',
                cancelButton: 'square',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedRole = user.role === 'admin' ? 'user' : 'admin';
                dispatch(updateUser({ id: user._id, userInfo: { role: updatedRole } }))
                    .unwrap()
                    .then(() => {
                        return MySwal.fire({
                            title: 'Successfully updated',
                            text: `This person's role is now ${updatedRole}`,
                            icon: 'success',
                            confirmButtonColor: 'black',
                            customClass: {
                                popup: 'square',
                                confirmButton: 'square'
                            }
                        });
                    })
                    .catch(error => {
                        console.error('Updating failed:', error);
                        MySwal.fire({
                            title: 'Error!',
                            text: 'Failed to update user role. Please try again.',
                            icon: 'error',
                            confirmButtonColor: 'black',
                            customClass: {
                                popup: 'square',
                                confirmButton: 'square'
                            }
                        });
                    });
            }
        });
    };

    const handleDeleteUser = (id) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sure',
            customClass: {
                popup: 'square',
                confirmButton: 'square',
                cancelButton: 'square',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteUser(id))
                    .unwrap()
                    .then(() => {
                        dispatch(getUser());
                        return MySwal.fire({
                            title: 'User Deleted',
                            icon: 'success',
                            confirmButtonColor: 'black',
                            customClass: {
                                popup: 'square',
                                confirmButton: 'square'
                            }
                        });
                    })
                    .catch(error => {
                        console.error('Delete operation failed:', error);
                        MySwal.fire({
                            title: 'Error!',
                            text: 'Failed to delete the user. Please try again.',
                            icon: 'error',
                            confirmButtonColor: 'black',
                            customClass: {
                                popup: 'square',
                                confirmButton: 'square'
                            }
                        });
                    });
            }
        });
    };

    const handleBanUser = (data) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "User will be banned!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sure',
            customClass: {
                popup: 'square',
                confirmButton: 'square',
                cancelButton: 'square',
            }
        }).then((result) => {
            if (result.isConfirmed) {

                const updateUserInfo = {
                    status: "banned",
                }

                const banUserInfo = {
                    userEmail: data.userEmail,
                };

                dispatch(updateUser({ id: data._id, userInfo: updateUserInfo }))
                    .then(() => {
                        dispatch(addBanUser(banUserInfo))
                            .unwrap()
                            .then(() => {
                                dispatch(getUser());
                                return MySwal.fire({
                                    title: 'User Banned',
                                    icon: 'success',
                                    confirmButtonColor: 'black',
                                    customClass: {
                                        popup: 'square',
                                        confirmButton: 'square'
                                    }
                                });
                            })
                            .catch(error => {
                                console.error('Ban operation failed:', error);
                                MySwal.fire({
                                    title: 'Error!',
                                    text: 'Failed to ban the user. Please try again.',
                                    icon: 'error',
                                    confirmButtonColor: 'black',
                                    customClass: {
                                        popup: 'square',
                                        confirmButton: 'square'
                                    }
                                });
                            });
                    })

            }
        });
    };

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    if (userStatus === 'failed') {
        return <div>Error: {userError}</div>;
    }

    return (
        <>
            <Helmet>
                <title>Manage Users | Thread Frenzy</title>
            </Helmet>
            <div className="space-y-10 mr-2 md:mr-0">
                <h1 className="h-40 w-full text-5xl font-semibold pl-10 pt-6 text-white bg-black flex gap-4 items-center">User Management</h1>
                <div>
                    <h1 className=" text-white text-2xl font-bold bg-black py-2 text-center">Admin</h1>

                    <div className=" overflow-x-auto">
                        <table className="table">
                            <thead className="text-black font-bold pb-2">
                                <tr className="border-b border-black">
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {admins?.map(user => (
                                    <tr key={user._id} className="border-b border-gray-600 py-2">
                                        <td>{user.firstName}</td>
                                        <td>{user.userEmail}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>
                                            <button onClick={() => handleRoleChange(user)} className=" text-blue-500 text-xs font-semibold">Remove Admin</button>
                                        </td>
                                        <td><MdOutlineDeleteForever onClick={() => handleDeleteUser(user._id)} className="text-red-500 hover:cursor-pointer" size={25} /></td>
                                        <td><FaBan onClick={() => handleBanUser(user)} className="hover:cursor-pointer" size={18} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div>
                    <h1 className=" text-white text-2xl font-bold bg-black py-2 text-center">User</h1>

                    <div className=" overflow-x-auto">
                        <table className="table">
                            <thead className="text-black font-bold pb-2">
                                <tr className="border-b border-black">
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
                                    <tr key={user._id} className="border-b border-gray-600 py-2">
                                        <td>{user.firstName}</td>
                                        <td>{user.userEmail}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>
                                            <button onClick={() => handleRoleChange(user)} className=" text-blue-500 text-xs font-semibold">Make Admin</button>
                                        </td>
                                        <td><MdOutlineDeleteForever onClick={() => handleDeleteUser(user._id)} className="text-red-500 hover:cursor-pointer" size={25} /></td>
                                        <td><FaBan onClick={() => handleBanUser(user)} className="hover:cursor-pointer" size={18} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ManageUsers;
