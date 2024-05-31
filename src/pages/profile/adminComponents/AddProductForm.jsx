import { useForm } from "react-hook-form";
import { useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { addItem } from "../../../redux/dataSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProductForm = ({ closeModal, allData, tshirtData, setTshirtData }) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm();
    const [productDetails, setProductDetails] = useState(null);
    const [uploadedImages, setUploadedImages] = useState({});
    const axiosPublic = useAxiosPublic();

    const colorRegex = /^(\w+\s?\w*)(,\s*\w+\s?\w*)*$/;

    const onFirstSubmit = (data) => {
        if (!colorRegex.test(data.color)) {
            setError("color", { type: "manual", message: "Invalid color format. Each color should be maximum 2 words." });
            return;
        }

        data.details = data.details.split(',').map(detail => detail.trim());
        data.color = data.color.split(',').map(color => color.trim());

        clearErrors("color");
        setProductDetails(data);
    };

    const onImageUpload = async (e, color) => {
        const files = e.target.files;
        const formData = new FormData();
        for (const file of files) {
            formData.append("image", file);
        }

        try {
            const res = await axiosPublic.post(image_hosting_api, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (res.data && res.data.data && res.data.data.url) {
                setUploadedImages(prevImages => ({
                    ...prevImages,
                    [color]: [...(prevImages[color] || []), res.data.data.url]
                }));
            }
        } catch (error) {
            console.error("Image upload failed:", error);
        }
    };

    const onSubmit = () => {
        const finalData = { ...productDetails, images: uploadedImages, rating: 0 };
        console.log(finalData);
        dispatch(addItem(finalData))
            .unwrap()
            .then(() => {
                // setTshirtData(prevData => [...prevData, finalData]);
                dispatch(allData());
                toast.success('Product successfully added');
            })
            .catch(error => {
                console.log(error);
                toast.error('Failed to add product');
            })
    };

    return (
        <div className="relative pt-12">
            <button onClick={closeModal} className="absolute top-1 right-1 text-red-500"><RxCross2 size={30} /></button>
            <form onSubmit={handleSubmit(onFirstSubmit)} className="space-y-6">
                <div className="flex gap-6">
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
                <div className="flex gap-6">
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
                        {errors.color && <span className="text-red-500">{errors.color.message || "This field is required"}</span>}
                    </div>
                </div>
                <div className="flex gap-6">
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
                <div className="flex gap-6">
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
                    <button type="submit" className="border border-black bg-black text-white font-bold py-2 hover:bg-white hover:text-black transition duration-300 ease-in-out">Submit Details</button>
                </div>
            </form>

            {
                productDetails && (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
                        {
                            productDetails.color.map((color, index) => (
                                <div key={index} className="form-control relative w-full">
                                    <label className="text-gray-600 text-sm pl-5">{`Upload images for "${color}" color`}</label>
                                    <input name={`images-${color}`} className="file-input w-full max-w-xs rounded-none h-8 border border-gray-400" type="file" multiple onChange={(e) => onImageUpload(e, color)} />
                                    {uploadedImages[color] && (
                                        <div className="flex flex-wrap mt-2">
                                            {uploadedImages[color].map((url, idx) => (
                                                <img key={idx} src={url} alt={`Product Image for ${color} ${idx + 1}`} className="h-16 w-16 object-cover mr-2" />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))
                        }
                        <div className="form-control mt-6">
                            <button type="submit" className="border border-black bg-black text-white font-bold py-2 hover:bg-white hover:text-black transition duration-300 ease-in-out">Submit Product</button>
                        </div>
                    </form>
                )
            }
        </div>
    );
};

export default AddProductForm;
