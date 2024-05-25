import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getItemById } from "../../redux/dataSlice";


const ProductDetails = () => {
    const { itemId } = useParams();
    const dispatch = useDispatch();
    const { selectedItem, singleProductStatus, error } = useSelector(state => state.data);


    useEffect(() => {
        if (singleProductStatus === 'idle') {
            dispatch(getItemById(itemId));
        }
    }, [singleProductStatus, itemId, dispatch])

    // TODO: loading and failed status set korte hobe
    if (singleProductStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (singleProductStatus === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className=" px-[3%]">
            {
                selectedItem && (
                    <div className=" grid grid-cols-5 gap-5">
                        <div className=" col-span-3 grid grid-cols-2 grid-rows-2 gap-2 h-fit">
                            {
                                selectedItem.images[selectedItem.color[0]]?.map((item, index) => (
                                    <img key={index} src={item} alt="loading..." className=" h-96 w-full object-cover object-top" />
                                ))
                            }
                        </div>
                        <div className=" col-span-2 space-y-6">
                            <h1 className=" text-2xl font-semibold">{selectedItem.name}</h1>
                            {/* TODO: Rating with stars */}
                            <p className=" text-xl text-green-500 font-semibold">${selectedItem.price}</p>
                            <ul className=" flex gap-3">Colors:
                                {
                                    selectedItem.color?.map((item, index) => (
                                        <li key={index}>
                                            {item}
                                        </li>
                                    ))
                                }
                            </ul>
                            <ul className=" flex gap-3 items-center">Sizes:
                                {
                                    selectedItem.size?.map((item, index) => (
                                        <button key={index} className=" border-2 h-10 w-12">
                                            {item}
                                        </button>
                                    ))
                                }
                            </ul>
                            <div className=" flex gap-4">
                                <div className=" border-2 w-fit p-2">
                                    <p htmlFor="">Quantity</p>
                                    <select name="options" id="options" className=" w-full text-center outline-none">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                    </select>
                                </div>
                                <button className=" bg-black text-white w-full">Add to Cart</button>
                            </div>
                            <div>
                                <div className="collapse border-t border-gray-400 rounded-none">
                                    <input type="checkbox" className="peer" />
                                    <div className="collapse-title font-semibold">
                                        Product Details
                                    </div>
                                    <div className="collapse-content ">
                                        <ul className=" flex flex-col list-disc pl-5">
                                            {
                                                selectedItem.details?.map((item, index) => (
                                                    <li key={index}>
                                                        {item}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <div className="collapse border-y border-gray-400 rounded-none">
                                    <input type="checkbox" className="peer" />
                                    <div className="collapse-title font-semibold">
                                        Shipping and Returns
                                    </div>
                                    <div className="collapse-content ">
                                        <ul className=" list-disc pl-5">
                                            <li>Returns accepted by mail and in store within 30 days of the shipment date. Items must be unworn and tags must be attached.</li>
                                            <li>$4.99 USD will be deducted from your refund for returns.</li>
                                            <li>Once a return is received, please allow 7-14 business days to process and 3-5 business days for the refund to be credited.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default ProductDetails;