import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers, updateUser } from "../../../redux/userSlice";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { Helmet } from "react-helmet-async";
import { addBanUser, deleteBanUser } from "../../../redux/banUserSlice";
import ActiveUsers from "./userManagement/ActiveUsers";
import BannedUser from "./userManagement/BannedUser";
import Admins from "./userManagement/Admins";

const MySwal = withReactContent(Swal);

const ManageUsers = () => {
    const dispatch = useDispatch();
    const { user, userStatus, userError, admin, adminStatus, adminError, bannedUsers, bannedUsersStatus, bannedUsersError, totalPages, currentPage, totalAdminPages, currentAdminPage, totalBannedPages, currentBannedPage } = useSelector(state => state.user);

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
                        dispatch(getUsers({ status: 'active', role: 'user', }));
                        dispatch(getUsers({ status: 'active', role: 'admin', }));
                        dispatch(getUsers({ status: 'banned',}));
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
                        dispatch(getUsers({ status: 'active', role: 'user', }));
                        dispatch(getUsers({ status: 'active', role: 'admin', }));
                        dispatch(getUsers({ status: 'banned',}));
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
                                dispatch(getUsers({ status: 'active', role: 'user', }));
                                dispatch(getUsers({ status: 'active', role: 'admin', }));
                                dispatch(getUsers({ status: 'banned',}));
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
                                dispatch(getUsers({ status: 'active', role: 'user', }));
                                dispatch(getUsers({ status: 'active', role: 'admin', }));
                                dispatch(getUsers({ status: 'banned',}));
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
        dispatch(getUsers({
            status: 'active',
            role: 'user',
            page: currentPage,
            limit: 5,
        }));
        dispatch(getUsers({
            status: 'active',
            role: 'admin',
            page: currentAdminPage,
            limit: 5,
        }));
        dispatch(getUsers({
            status: 'banned',
            page: currentBannedPage,
            limit: 5,
        }));
    }, [dispatch, currentPage, currentAdminPage, currentBannedPage]);

    if (userStatus === 'failed' || adminStatus === 'failed' || bannedUsersStatus === 'failed') {
        return <div>Error: {userError || adminError || bannedUsersError}</div>;
    }

    return (
        <>
            <Helmet>
                <title>Manage Users | Thread Frenzy</title>
            </Helmet>
            <div className="space-y-10 mr-2 md:mr-0">
                <h1 className="h-40 w-full text-5xl font-semibold pl-10 pt-6 text-white bg-black flex gap-4 items-center">User Management</h1>

                <Admins admins={admin} totalAdminPages={totalAdminPages} currentAdminPage={currentAdminPage} handleRoleChange={handleRoleChange} handleDeleteUser={handleDeleteUser} handleBanUser={handleBanUser} />

                <ActiveUsers users={user} totalPages={totalPages} currentPage={currentPage} handleRoleChange={handleRoleChange} handleDeleteUser={handleDeleteUser} handleBanUser={handleBanUser} />

                <BannedUser bannedUsers={bannedUsers} totalBannedPages={totalBannedPages} currentBannedPage={currentBannedPage} handleUnbanUser={handleUnbanUser} />
            </div>
        </>
    );
};

export default ManageUsers;
