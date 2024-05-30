import { useForm } from "react-hook-form";

const AddProductForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        data.details = data.details.split(',').map(detail => detail.trim());
        data.color = data.color.split(',').map(color => color.trim());
        console.log(data);
    };

    return (
        <div className=" ">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className=" flex gap-6">
                    <div className="form-control relative w-full">
                        <input name="name" type="text" className="border border-gray-400 h-12 pl-3 outline-none" {...register("name", { required: true })} />
                        <label className="absolute left-6 -top-2 text-gray-600 text-sm bg-white">Product Name</label>
                        {errors.name && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="form-control relative w-full">
                        <input name="brand" type="text" className="border border-gray-400 h-12 pl-3 outline-none" {...register("brand", { required: true })} />
                        <label className="absolute left-6 -top-2 text-gray-600 text-sm bg-white">Brand</label>
                        {errors.brand && <span className="text-red-500">This field is required</span>}
                    </div>
                </div>
                <div className=" flex gap-6">
                    <div className="form-control relative w-full">
                        <select name="gender" className="border border-gray-400 h-12 pl-3 outline-none" {...register("gender", { required: true })}>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <label className="absolute left-6 -top-2 text-gray-600 text-sm bg-white">Gender</label>
                        {errors.gender && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="form-control relative w-full">
                        <input name="price" type="number" step="0.01" className="border border-gray-400 h-12 pl-3 outline-none" {...register("price", { required: true })} />
                        <label className="absolute left-6 -top-2 text-gray-600 text-sm bg-white">Price</label>
                        {errors.price && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="form-control relative w-full">
                        <input name="color" type="text" className="border border-gray-400 h-12 pl-3 outline-none" {...register("color", { required: true })} />
                        <label className="absolute left-6 -top-2 text-gray-600 text-sm bg-white">Colors (comma separated)</label>
                        {errors.color && <span className="text-red-500">This field is required</span>}
                    </div>
                </div>
                <div className=" flex gap-6">
                    <div className="form-control relative w-full">
                        <textarea name="about_product" className="border border-gray-400 h-24 pl-3 pt-3 outline-none" {...register("about_product", { required: true })}></textarea>
                        <label className="absolute left-6 -top-2 text-gray-600 text-sm bg-white">About Product</label>
                        {errors.about_product && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="form-control relative w-full">
                        <textarea name="details" className="border border-gray-400 h-24 pl-3 pt-3 outline-none" {...register("details", { required: true })}></textarea>
                        <label className="absolute left-6 -top-2 text-gray-600 text-sm bg-white">Details (comma separated)</label>
                        {errors.details && <span className="text-red-500">This field is required</span>}
                    </div>
                </div>
                <div className=" flex gap-6">
                    <div className="form-control relative w-full">
                        <textarea name="images" className="border border-gray-400 h-24 pl-3 pt-3 outline-none" {...register("images", { required: true })}></textarea>
                        <label className="absolute left-6 -top-2 text-gray-600 text-sm bg-white">Images (JSON format)</label>
                        {errors.images && <span className="text-red-500">This field is required and should be valid JSON</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="text-gray-600 text-sm">Sizes</label>
                        <div className="flex space-x-4">
                            {["s", "m", "l", "xl", "xxl"].map(size => (
                                <div key={size} className="flex items-center">
                                    <input type="checkbox" id={size} value={size} {...register("size", { required: true })} />
                                    <label htmlFor={size} className="ml-2">{size.toUpperCase()}</label>
                                </div>
                            ))}
                        </div>
                        {errors.size && <span className="text-red-500">This field is required</span>}
                    </div>
                </div>
                <div className="form-control mt-6">
                    <button type="submit" className="border border-black bg-black text-white font-bold py-2 hover:bg-white hover:text-black transition duration-300 ease-in-out">Add Product</button>
                </div>
            </form>
        </div>
    );
};

export default AddProductForm;
