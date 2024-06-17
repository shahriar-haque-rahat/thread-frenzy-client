import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { addItem, updateItem } from "../../../redux/dataSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { TiDeleteOutline } from "react-icons/ti";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProductForm = ({ closeModal, allData, initialData = null, isUpdate = false }) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, setError, clearErrors, reset } = useForm({
        defaultValues: initialData ? {
            ...initialData,
            color: initialData.color.join(', '),
            details: initialData.details.join(', ')
        } : {}
    });
    const [productDetails, setProductDetails] = useState(initialData || null);
    const [uploadedImages, setUploadedImages] = useState(initialData?.images || {});
    const [quantities, setQuantities] = useState(initialData?.quantity || {});
    const axiosPublic = useAxiosPublic();

    const colorRegex = /^(\w+\s?\w*)(,\s*\w+\s?\w*)*$/;

    useEffect(() => {
        if (isUpdate && initialData) {
            reset({
                ...initialData,
                color: initialData.color.join(', '),
                details: initialData.details.join(', ')
            });
        }
    }, [isUpdate, initialData, reset]);

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

    const deleteImage = (color, index) => {
        setUploadedImages(prevImages => {
            const updatedImages = { ...prevImages };
            updatedImages[color] = updatedImages[color].filter((_, idx) => idx !== index);
            return updatedImages;
        });
    };

    const onQuantityChange = (color, value) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [color]: value
        }));
    };

    const onSubmit = () => {
        const finalData = { ...productDetails, images: uploadedImages, quantity: quantities, rating: 0 };

        if (isUpdate) {
            dispatch(updateItem({ id: initialData._id, updatedProduct: finalData }))
                .unwrap()
                .then(() => {
                    dispatch(allData());
                    toast.success('Product successfully updated');
                    closeModal();
                })
                .catch(error => {
                    console.log(error);
                    toast.error('Failed to update product');
                });
        } else {
            dispatch(addItem(finalData))
                .unwrap()
                .then(() => {
                    dispatch(allData());
                    toast.success('Product successfully added');
                    closeModal();
                })
                .catch(error => {
                    console.log(error);
                    toast.error('Failed to add product');
                });
        }
    };

    return (
        <div className="relative font-clashGrotesk font-medium">
            <h1 className="text-center text-2xl font-semibold">{isUpdate ? 'Update' : 'Add'} Product</h1>
            <button onClick={closeModal} className="absolute top-1 right-1 text-red-500"><RxCross2 size={30} /></button>
            <div className="pt-12">
                <form onSubmit={handleSubmit(onFirstSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control relative w-full">
                            <input name="name" type="text" className="border border-gray-400 h-12 pl-3 outline-none focus:border-black" {...register("name", { required: true })} />
                            <label className="absolute left-6 -top-2 text-gray-600 text-sm bg-white">Product Name</label>
                            {errors.name && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control relative w-full">
                            <input name="brand" type="text" className="border border-gray-400 h-12 pl-3 outline-none focus:border-black" {...register("brand", { required: true })} />
                            <label className="absolute left-6 -top-2 text-gray-600 text-sm bg-white">Brand</label>
                            {errors.brand && <span className="text-red-500">This field is required</span>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control relative w-full">
                            <select name="gender" className="border border-gray-400 h-12 pl-3 outline-none focus:border-black" {...register("gender", { required: true })}>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            <label className="absolute left-6 -top-2 text-gray-600 text-sm bg-white">Gender</label>
                            {errors.gender && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control relative w-full">
                            <input name="color" type="text" className="border border-gray-400 h-12 pl-3 outline-none focus:border-black" {...register("color", { required: true })} />
                            <label className="absolute left-6 -top-2 text-gray-600 text-sm bg-white">Colors (comma separated)</label>
                            {errors.color && <span className="text-red-500">{errors.color.message || "This field is required"}</span>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control relative w-full">
                            <input name="price" type="number" step="0.01" className="border border-gray-400 h-12 pl-3 outline-none focus:border-black" {...register("price", { required: true })} />
                            <label className="absolute left-6 -top-2 text-gray-600 text-sm bg-white">Price</label>
                            {errors.price && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control relative w-full">
                            <input name="discount" type="number" step="0.01" className="border border-gray-400 h-12 pl-3 outline-none focus:border-black" {...register("discount", { required: true })} />
                            <label className="absolute left-6 -top-2 text-gray-600 text-sm bg-white">Discount</label>
                            {errors.discount && <span className="text-red-500">This field is required</span>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control relative w-full">
                            <textarea name="about_product" className="border border-gray-400 h-24 pl-3 pt-3 outline-none focus:border-black" {...register("about_product", { required: true })}></textarea>
                            <label className="absolute left-6 -top-2 text-gray-600 text-sm bg-white">About Product</label>
                            {errors.about_product && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control relative w-full">
                            <textarea name="details" className="border border-gray-400 h-24 pl-3 pt-3 outline-none focus:border-black" {...register("details", { required: true })}></textarea>
                            <label className="absolute left-6 -top-2 text-gray-600 text-sm bg-white">Details (comma separated)</label>
                            {errors.details && <span className="text-red-500">This field is required</span>}
                        </div>
                    </div>
                    <button type="submit" className="bg-black text-white px-4 py-2 w-full">Next</button>
                </form>
                {productDetails && (
                    <div>
                        <h2 className="text-xl mt-6">Upload Images</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {productDetails.color.map((color, idx) => (
                                <div key={idx} className="mt-6 grid grid-cols-1 md:grid-cols-3 md:gap-6">
                                    <div className=" col-span-2">
                                        <label className="block text-gray-700 font-bold mb-2">{color}</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => onImageUpload(e, color)}
                                            className="border border-gray-400 p-1 w-full"
                                        />
                                        <div className="flex space-x-4 mt-4">
                                            {(uploadedImages[color] || []).map((url, imgIdx) => (
                                                <div key={imgIdx} className="relative">
                                                    <img src={url} alt={`Product ${color}`} className="w-20 h-20 p-2 object-cover" />
                                                    <button type="button" className="absolute top-0 right-0 text-red-500" onClick={() => deleteImage(color, imgIdx)}>
                                                        <TiDeleteOutline size={24} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-bold mb-2">Quantity for {color}</label>
                                        <input
                                            type="number"
                                            value={quantities[color] || ""}
                                            onChange={(e) => onQuantityChange(color, e.target.value)}
                                            className="border border-gray-400 p-2 w-full outline-none focus:border-black"
                                        />
                                    </div>
                                </div>
                            ))}
                            <div>
                                {isUpdate && <p className=" text-center text-sm text-red-500">Make sure to submit details before submitting product</p>}
                                <button type="submit" className="bg-black text-white px-4 py-2 w-full">{isUpdate ? 'Update' : 'Create'} Product</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddProductForm;
