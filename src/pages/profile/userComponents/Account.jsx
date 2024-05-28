import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/userSlice";
import { useEffect } from "react";

const Account = ({ userByEmail }) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            address: '',
            email: '',
            phoneNumber: '',
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
            });
        }
    }, [userByEmail, reset]);

    const onSubmit = (data) => {
        console.log(data);
        if (userByEmail?._id) {
            dispatch(updateUser({ id: userByEmail._id, userInfo: data }));
        }
    };

    return (
        <div className="mt-6 mr-6">
            <h1 className="h-36 w-full text-5xl font-semibold pl-10 text-white bg-black flex gap-4 items-center">Account</h1>
            <div className=" pt-10">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex gap-6">
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
                    <div className="flex gap-6">
                        <div className="form-control relative w-full">
                            <input
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

export default Account;
