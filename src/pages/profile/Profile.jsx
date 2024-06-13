import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getUserByEmail, updateUser } from "../../redux/userSlice";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPublic from "../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Profile = () => {
    const axiosPublic = useAxiosPublic();
    const dispatch = useDispatch();
    const { user } = useContext(AuthContext);
    const { userByEmail, userByEmailStatus, userByEmailError } = useSelector(state => state.user);
    const { updateUserProfile } = useContext(AuthContext);
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            address: '',
            email: '',
            phoneNumber: '',
            photoUrl: '',
        }
    });

    const [previewUrl, setPreviewUrl] = useState('');
    const [uploading, setUploading] = useState(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');

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
            setPreviewUrl(userByEmail.photoUrl || '');
        }
    }, [userByEmail, reset]);

    const uploadImage = async (imageFile) => {
        const formData = new FormData();
        formData.append("image", imageFile);

        try {
            setUploading(true);
            const res = await axiosPublic.post(image_hosting_api, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (res.data && res.data.data && res.data.data.url) {
                const imageUrl = res.data.data.url;
                setPreviewUrl(imageUrl);
                setUploadedImageUrl(imageUrl);
                setValue('photoUrl', imageUrl);
            }
        } catch (error) {
            console.error('Failed to upload image:', error.response ? error.response.data : error.message);
            toast.error('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (data) => {
        if (uploadedImageUrl) {
            data.photoUrl = uploadedImageUrl;
        }

        console.log(data);

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

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            uploadImage(file);
        }
    };

    useEffect(() => {
        if (user) {
            dispatch(getUserByEmail(user?.email))
        }
    }, [dispatch, user])

    if (userByEmailStatus === 'failed') {
        return <div>Error: {userByEmailError}</div>;
    }

    return (
        <div>
            <h1 className="h-40 w-full text-4xl md:text-5xl font-semibold pl-10 pt-6 text-white bg-black flex gap-4 items-center">Profile</h1>
            <div className="pt-10">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control relative w-full">
                            <input
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
                            id="address"
                            type="text"
                            className="border border-gray-400 h-12 pl-3 outline-none"
                            {...register("address", { required: true })}
                        />
                        <label htmlFor="address" className="absolute left-6 -top-2 text-gray-600 text-sm bg-white">Address*</label>
                        {errors.address && <span className="text-red-500">This field is required</span>}
                    </div>

                    <p className="text-xl">Contact Information</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                    <div className="form-control relative w-full">
                        <input name="photoUrl" type="file" className="file-input h-10 border border-gray-400 focus:outline-none rounded-none w-full max-w-xs" {...register("photoUrl")} onChange={handleImageChange} />
                        <div className=" h-16">
                            {
                                uploading
                                    ? <span className="loading loading-ring loading-base mt-4 ml-10"></span>
                                    : previewUrl && <img src={previewUrl} alt="Preview" className="mt-2 h-14 w-14 object-cover object-top" />

                            }
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

export default Profile;
