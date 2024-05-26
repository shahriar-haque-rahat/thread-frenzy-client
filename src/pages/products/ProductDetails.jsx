import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getItemById } from "../../redux/dataSlice";
import { getCart, addToCart } from "../../redux/cartSlice";
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import ReactStars from "react-rating-stars-component";
import SimilarProducts from "./SimilarProducts";
import { AuthContext } from "../../provider/AuthProvider";

const ProductDetails = () => {
    const { user } = useContext(AuthContext);
    const { itemId } = useParams();
    const dispatch = useDispatch();
    const { selectedItem, singleProductStatus, error } = useSelector(state => state.data);
    const { cartItems, cartStatus, cartError } = useSelector(state => state.cart);

    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isShippingOpen, setIsShippingOpen] = useState(false);
    const [colorIndex, setColorIndex] = useState(0);
    const [productQuantity, setProductQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleQuantity = (e) => {
        let newQuantity = e === "+" ? productQuantity + 1 : productQuantity - 1;
        newQuantity = newQuantity < 1 ? 1 : newQuantity;
        setProductQuantity(newQuantity);
    };

    const handleAddCart = () => {
        if (!selectedItem) return;

        if (!selectedSize) {
            setErrorMessage('Please select a size.');
            return;
        }

        if (productQuantity < 1) {
            setErrorMessage('Quantity must be at least 1.');
            return;
        }

        const cartItem = {
            id: selectedItem._id,
            name: selectedItem.name,
            image: selectedItem.images[selectedItem.color[colorIndex]][0],
            price: selectedItem.price,
            color: selectedItem.color[colorIndex],
            size: selectedSize,
            quantity: productQuantity,
            userEmail: user.email
        };

        dispatch(addToCart(cartItem));
    };

    useEffect(() => {
        setColorIndex(0);
        setProductQuantity(1);
        setSelectedSize('');
        dispatch(getItemById(itemId));
        dispatch(getCart(user?.email));
    }, [dispatch, itemId, user]);

    // TODO: loading failed thik moto dekhate hobe
    if (singleProductStatus === 'loading' || cartStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (singleProductStatus === 'failed' || cartStatus === 'failed') {
        return <div>Error: {error || cartError}</div>;
    }

    return (
        <div>
            <div className="px-[3%] mt-16">
                {selectedItem && (
                    <div className="grid grid-cols-5 gap-5">
                        <div className="col-span-3 grid grid-cols-2 grid-rows-2 gap-2 h-fit">
                            {selectedItem.images[selectedItem.color[colorIndex]]?.map((item, index) => (
                                <img key={index} src={item} alt="loading..." className="h-96 w-full object-cover object-top" />
                            ))}
                        </div>
                        <div className="col-span-2 space-y-6">
                            <h1 className="text-2xl font-semibold">{selectedItem.name}</h1>
                            <div>
                                <ReactStars value={selectedItem.rating} isHalf={true} count={5} size={24} activeColor="#ffd700" edit={false} />
                            </div>
                            <p className="text-xl text-green-500 font-semibold">${selectedItem.price}</p>
                            <ul className="flex gap-3">Colors:
                                {selectedItem.color?.map((item, index) => (
                                    <li key={index} onClick={() => setColorIndex(index)} className={`cursor-pointer ${index === colorIndex ? 'border-b-2 border-black' : ''}`}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <ul className="flex gap-3 items-center">Sizes:
                                {selectedItem.size?.map((item, index) => (
                                    <button
                                        key={index}
                                        className={`border h-10 w-12 ${selectedSize === item ? 'bg-gray-300' : ''}`}
                                        onClick={() => setSelectedSize(item)}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </ul>
                            <div className="flex items-center">
                                <div className="flex items-center gap-4 w-1/2">
                                    <p onClick={() => handleQuantity("-")} className="w-[20px] h-[20px] lg:w-[35px] lg:h-[35px] rounded-full flex justify-center items-center text-xl cursor-pointer active:scale-95 duration-300 border"> - </p>
                                    <p className="px-5 py-1 font-semibold border ">{productQuantity}</p>
                                    <p onClick={() => handleQuantity("+")} className="w-[20px] h-[20px] lg:w-[35px] lg:h-[35px] rounded-full flex justify-center items-center text-xl cursor-pointer active:scale-95 duration-300 border"> + </p>
                                </div>
                                <button onClick={handleAddCart} className="bg-black text-white w-1/2 h-10">Add to Cart</button>
                            </div>
                            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                            <div>
                                <div className="collapse border-t border-gray-400 rounded-none">
                                    <input type="checkbox" className="peer" checked={isDetailsOpen} onChange={() => setIsDetailsOpen(!isDetailsOpen)} />
                                    <div className="collapse-title font-semibold flex items-center justify-between">
                                        Product Details {isDetailsOpen ? <FaAngleUp /> : <FaAngleDown />}
                                    </div>
                                    <div className="collapse-content">
                                        <ul className="flex flex-col list-disc pl-5">
                                            {selectedItem.details?.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="collapse border-y border-gray-400 rounded-none">
                                    <input type="checkbox" className="peer" checked={isShippingOpen} onChange={() => setIsShippingOpen(!isShippingOpen)} />
                                    <div className="collapse-title font-semibold flex items-center justify-between">
                                        Shipping and Returns {isShippingOpen ? <FaAngleUp /> : <FaAngleDown />}
                                    </div>
                                    <div className="collapse-content">
                                        <ul className="list-disc pl-5">
                                            <li>Returns accepted by mail and in store within 30 days of the shipment date. Items must be unworn and tags must be attached.</li>
                                            <li>$4.99 USD will be deducted from your refund for returns.</li>
                                            <li>Once a return is received, please allow 7-14 business days to process and 3-5 business days for the refund to be credited.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <h1 className="text-3xl font-semibold mt-20 mb-10">You may also like</h1>
                <SimilarProducts itemBrand={selectedItem?.brand} itemId={itemId}></SimilarProducts>
            </div>
        </div>
    );
};

export default ProductDetails;
