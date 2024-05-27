import { useForm } from "react-hook-form";



const CheckOut = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }
    return (
        <div>
            <h1 className=" text-3xl mb-10">Checkout</h1>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className=" space-y-6">
                    <div className=" flex gap-6">
                        <div className="form-control relative w-full">
                            <input name="firstName" type="text" className=" border border-gray-400 h-12 pl-3 outline-none" {...register("firstName", { required: true })} />
                            <label className="absolute left-6 -top-2 text-gray-600 text-sm bg-white">First Name*</label>
                            {errors.firstName && <span className=" text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control relative w-full">
                            <input name="lastName" type="text" className=" border border-gray-400 h-12 pl-3 outline-none" {...register("lastName", { required: true })} />
                            <label className="absolute left-6 -top-2 text-gray-600 text-sm bg-white">Last Name*</label>
                            {errors.lastName && <span className=" text-red-500">This field is required</span>}
                        </div>
                    </div>
                    <div className="form-control relative">
                        <input name="address" type="text" className=" border border-gray-400 h-12 pl-3 outline-none" {...register("address", { required: true })} />
                        <label className="absolute left-6 -top-2 text-gray-600 text-sm bg-white">Address*</label>
                        {errors.address && <span className=" text-red-500">This field is required</span>}
                    </div>
                    <p className=" text-xl">Contact Information</p>
                    <div className=" flex gap-6">
                        <div className="form-control relative w-full">
                            <input name="email" type="email" className=" border border-gray-400 h-12 pl-3 outline-none" {...register("email", { required: true })} />
                            <label className="absolute left-6 -top-2 text-gray-600 text-sm bg-white">Email*</label>
                            {errors.email && <span className=" text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control relative w-full">
                            <input name="phoneNumber" type="number" className=" border border-gray-400 h-12 pl-3 outline-none" {...register("phoneNumber", { required: true })} />
                            <label className="absolute left-6 -top-2 text-gray-600 text-sm bg-white">Phone Number*</label>
                            {errors.phoneNumber && <span className=" text-red-500">This field is required</span>}
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <button className=" bg-black text-white text-lg font-semibold w-full h-12">Save & Continue</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckOut;