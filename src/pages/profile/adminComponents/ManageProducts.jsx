import { useDispatch, useSelector } from "react-redux";
import { allData } from "../../../redux/dataSlice";
import { useEffect } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";

const ManageProducts = () => {
    const dispatch = useDispatch();
    const { data, allDataStatus, error } = useSelector(state => state.data);

    useEffect(() => {
        if (allDataStatus === 'idle') {
            dispatch(allData());
        }
    }, [dispatch, allDataStatus])

    if (allDataStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (allDataStatus === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="mt-6 mr-6 space-y-6">
            <h1 className="h-40 w-full text-5xl font-semibold pl-10 pt-6 text-white bg-black flex gap-4 items-center">Product Management</h1>
            {/* TODO: product add and filtering  */}
            <div className=" flex justify-between items-center">
                <button className=" border border-black font-semibold p-2">Add Product</button>
                <p>Filter</p>
            </div>
            <p className=" text-3xl text-center bg-black text-white font-bold py-3">Products</p>

            <div>
                <div className="grid grid-cols-7 gap-3 font-bold border-b-2 border-gray-800 py-2">
                    <div></div>
                    <div className=" col-span-2">Name</div>
                    <div>Brand</div>
                    <div>Price</div>
                    <div>Color</div>
                    <div>Gender</div>
                </div>
                {
                    data?.map(item => (
                        <div key={item._id} className="grid grid-cols-7 gap-3 border-b border-gray-400">
                            <img className=" w-full h-28 object-cover object-top" src={item.images[Object.keys(item.images)[0]][0]} alt="" />
                            <div className=" py-2 col-span-2">{item.name}</div>
                            <div className=" py-2">{item.brand}</div>
                            <div className=" py-2">${item.price}</div>
                            <div className=" py-2">
                                {
                                    item.color.map((item, idx) => (
                                        <div key={idx}>{item}, </div>
                                    ))
                                }
                            </div>
                            <div className=" py-2 flex justify-between">
                                <p>{item.gender}</p>
                                <MdOutlineDeleteForever className=" text-red-500" size={25} />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ManageProducts;