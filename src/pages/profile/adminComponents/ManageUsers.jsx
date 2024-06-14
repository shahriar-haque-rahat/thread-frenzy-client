import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getBannedUsers, getUser, updateUser } from "../../../redux/userSlice";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { Helmet } from "react-helmet-async";
import { addBanUser, deleteBanUser } from "../../../redux/banUserSlice";
import ActiveUsers from "./ActiveUsers";
import BannedUser from "./BannedUser";

const MySwal = withReactContent(Swal);

const ManageUsers = () => {
    const dispatch = useDispatch();
    const { user, userStatus, userError, bannedUsers, bannedUsersStatus, bannedUsersError } = useSelector(state => state.user);
    const admins = user?.filter(admin => admin.role === 'admin');
    const users = user?.filter(user => user.role === 'user');
    const [showBannedUser, setShowBannedUser] = useState(false);

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
                                dispatch(getBannedUsers());
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

    const handleUnbanUser = (data) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "User will be unbanned!",
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
                    status: "active",
                };

                dispatch(updateUser({ id: data._id, userInfo: updateUserInfo }))
                    .then(() => {
                        dispatch(deleteBanUser(data.userEmail))
                            .unwrap()
                            .then(() => {
                                dispatch(getUser());
                                dispatch(getBannedUsers());
                                return MySwal.fire({
                                    title: 'User Unbanned',
                                    icon: 'success',
                                    confirmButtonColor: 'black',
                                    customClass: {
                                        popup: 'square',
                                        confirmButton: 'square'
                                    }
                                });
                            })
                            .catch(error => {
                                console.error('Unban operation failed:', error);
                                MySwal.fire({
                                    title: 'Error!',
                                    text: 'Failed to unban the user. Please try again.',
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
        dispatch(getBannedUsers());
    }, [dispatch]);

    if (userStatus === 'failed' || bannedUsersStatus === 'failed') {
        return <div>Error: {userError || bannedUsersError}</div>;
    }

    return (
        <>
            <Helmet>
                <title>Manage Users | Thread Frenzy</title>
            </Helmet>
            <div className="space-y-10 mr-2 md:mr-0">
                <h1 className="h-40 w-full text-5xl font-semibold pl-10 pt-6 text-white bg-black flex gap-4 items-center">User Management</h1>

                <button onClick={() => setShowBannedUser(!showBannedUser)} className=" bg-black px-2 py-1 text-white">{showBannedUser ? "Active Users" : "Ban Users"}</button>

                {
                    showBannedUser
                        ? <BannedUser bannedUsers={bannedUsers} handleUnbanUser={handleUnbanUser} />
                        : <ActiveUsers admins={admins} users={users} handleRoleChange={handleRoleChange} handleDeleteUser={handleDeleteUser} handleBanUser={handleBanUser} />
                }
            </div>
        </>
    );
};

export default ManageUsers;
