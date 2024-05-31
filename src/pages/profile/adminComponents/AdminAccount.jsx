import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getUserByEmail, updateUser } from "../../../redux/userSlice";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPublic from "../../../hooks/useAxiosPublic";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AdminAccount = ({ userByEmail }) => {
    const axiosPublic = useAxiosPublic();

    const dispatch = useDispatch();
    const { updateUserProfile } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            address: '',
            email: '',
            phoneNumber: '',
            photoUrl: '',
        }
    });

    useEffect(() => {
        if (userByEmail) {
            reset({
                firstName: userByEmail.firstName || '',
                lastName: userByEmail.lastName || '',
                address: userByEmail.address || '',
                email: userByEmail.userEmail || '',
                phoneNumber: userByEmail.phoneNumber || '',
                photoUrl: userByEmail.photoUrl || '',
            });
        }
    }, [userByEmail, reset]);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("image", data.photoUrl[0]);

        try {
            const res = await axiosPublic.post(image_hosting_api, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (res.data && res.data.data && res.data.data.url) {
                data.photoUrl = res.data.data.url;
            }
        } catch (error) {
            console.error('Failed to upload image:', error.response ? error.response.data : error.message);
            toast.error('Failed to upload image');
            return;
        }

        if (userByEmail?._id) {
            try {
                await updateUserProfile(data.firstName, null);
                const result = await dispatch(updateUser({ id: userByEmail._id, userInfo: data })).unwrap();
                console.log(result);
                dispatch(getUserByEmail(userByEmail.userEmail));
                toast.success('User information updated');
            } catch (error) {
                console.error('Failed to update user information:', error);
                toast.error('Invalid user input');
            }
        }
    };

    return (
        <div className="mt-6 mr-6">
            <h1 className="h-40 w-full text-5xl font-semibold pl-10 pt-6 text-white bg-black flex gap-4 items-center">AdminAccount</h1>
            <div className=" pt-10">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex gap-6">
                        <div className="form-control relative w-full">
                            <input
                                defaultValue={userByEmail?.firstName}
                                id="firstName"
                                type="text"
                                className="border border-gray-400 h-12 pl-3 outline-none"
                                {...register("firstName", { required: true })}
                            />
                            <label htmlFor="firstName" className="absolute left-6 -top-2 text-gray-600 text-sm bg-white">First Name*</label>
                            {errors.firstName && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control relative w-full">
                            <input
                                defaultValue={userByEmail?.lastName}
                                id="lastName"
                                type="text"
                                className="border border-gray-400 h-12 pl-3 outline-none"
                                {...register("lastName", { required: true })}
                            />
                            <label htmlFor="lastName" className="absolute left-6 -top-2 text-gray-600 text-sm bg-white">Last Name*</label>
                            {errors.lastName && <span className="text-red-500">This field is required</span>}
                        </div>
                    </div>
                    <div className="form-control relative">
                        <input
                            defaultValue={userByEmail?.address}
                            id="address"
                            type="text"
                            className="border border-gray-400 h-12 pl-3 outline-none"
                            {...register("address", { required: true })}
                        />
                        <label htmlFor="address" className="absolute left-6 -top-2 text-gray-600 text-sm bg-white">Address*</label>
                        {errors.address && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="form-control relative w-full">
                        <input name="photoUrl" type="file" className=" file-input h-10 border border-gray-400 focus:outline-none rounded-none w-full max-w-xs" {...register("photoUrl", { required: true })} />
                    </div>

                    <p className="text-xl">Contact Information</p>
                    <div className="flex gap-6">
                        <div className="form-control relative w-full">
                            <input
                                defaultValue={userByEmail?.userEmail}
                                disabled
                                id="email"
                                type="email"
                                className="border border-gray-400 h-12 pl-3 outline-none"
                                {...register("email", { required: true })}
                            />
                            <label htmlFor="email" className="absolute left-6 -top-2 text-gray-600 text-sm bg-white">Email*</label>
                            {errors.email && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control relative w-full">
                            <input
                                defaultValue={userByEmail?.phoneNumber}
                                id="phoneNumber"
                                type="number"
                                className="border border-gray-400 h-12 pl-3 outline-none"
                                {...register("phoneNumber", { required: true })}
                            />
                            <label htmlFor="phoneNumber" className="absolute left-6 -top-2 text-gray-600 text-sm bg-white">Phone Number*</label>
                            {errors.phoneNumber && <span className="text-red-500">This field is required</span>}
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className="bg-black text-white text-lg font-semibold w-full h-12">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminAccount;
