import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../../redux/userSlice";
import { FaRegEdit } from "react-icons/fa";
import { IoBan } from "react-icons/io5";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';


const MySwal = withReactContent(Swal)


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
        })
    }

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])


    if (userStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (userStatus === 'failed') {
        return <div>Error: {userError}</div>;
    }

    return (
        <div className="mt-6 mr-6 space-y-10">
            <h1 className="h-40 w-full text-5xl font-semibold pl-10 pt-6 text-white bg-black flex gap-4 items-center">User Management</h1>
            <div>
                <h1 className=" text-white text-2xl font-bold bg-black py-2 text-center">Admin</h1>
                <div className="grid grid-cols-6 gap-4 font-bold border-b border-gray-600 py-2">
                    <div className=" col-span-2 pl-2">Name</div>
                    <div className=" col-span-2">Email</div>
                    <div>Phone</div>
                    <div></div>
                </div>
                {
                    admins?.map(user => (
                        <div key={user._id} className="grid grid-cols-6 gap-4 border-b border-gray-600 py-2">
                            <div className=" col-span-2 pl-2">{user.firstName}</div>
                            <div className=" col-span-2">{user.userEmail}</div>
                            <div>{user.phoneNumber}</div>
                            <div className=" flex justify-between items-center gap-2">
                                <button onClick={() => handleRoleChange(user)} className=" text-blue-500 text-xs font-semibold text-center w-1/2">Remove Admin</button>
                                {/* <FaRegEdit className="text-blue-500 w-1/2" size={23} /> */}
                                <IoBan className=" text-red-500 w-1/2" size={20} />
                            </div>
                        </div>
                    ))
                }
            </div>
            <div>
                <h1 className=" text-white text-2xl font-bold bg-black py-2 text-center">User</h1>
                <div className="grid grid-cols-6 gap-4 font-bold border-b border-gray-600 py-2">
                    <div className=" col-span-2 pl-2">Name</div>
                    <div className=" col-span-2">Email</div>
                    <div>Phone</div>
                    <div></div>
                </div>
                {
                    users?.map(user => (
                        <div key={user._id} className="grid grid-cols-6 gap-4 border-b border-gray-600 py-2">
                            <div className=" col-span-2 pl-2">{user.firstName}</div>
                            <div className=" col-span-2">{user.userEmail}</div>
                            <div>{user.phoneNumber}</div>
                            <div className=" flex justify-between items-center gap-2">
                                <button onClick={() => handleRoleChange(user)} className=" text-blue-500 text-xs font-semibold text-center w-1/2">Make Admin</button>
                                {/* <FaRegEdit className="text-blue-500 w-1/2" size={23} /> */}
                                <IoBan className=" text-red-500 w-1/2" size={20} />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ManageUsers;