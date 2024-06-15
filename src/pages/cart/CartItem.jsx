import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { deleteCartItem, deleteManyCartItem, getCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const MySwal = withReactContent(Swal);


const CartItem = ({ cartItems, quantities, handleQuantity, userEmail }) => {
    const dispatch = useDispatch();
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        if (selectAll) {
            setSelectedItems(cartItems.map(item => item._id));
        } else {
            setSelectedItems([]);
        }
    }, [selectAll, cartItems]);


    const handleDeleteCartItem = (id) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            customClass: {
                popup: 'square',
                confirmButton: 'square',
                cancelButton: 'square',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteCartItem(id))
                    .unwrap()
                    .then(() => {
                        dispatch(getCart(userEmail));
                        return MySwal.fire({
                            title: 'Product Deleted',
                            icon: 'success',
                            confirmButtonColor: 'black',
                            customClass: {
                                popup: 'square',
                                confirmButton: 'square'
                            }
                        });
                    })
                    .catch(error => {
                        console.error('Delete operation failed:', error);
                        MySwal.fire({
                            title: 'Error!',
                            text: 'Failed to delete the product. Please try again.',
                            icon: 'error',
                            confirmButtonColor: 'black',
                            customClass: {
                                popup: 'square',
                                confirmButton: 'square'
                            }
                        });
                    });
            }
        });
    };

    const handleSelectItem = (id) => {
        setSelectedItems(prevSelectedItems =>
            prevSelectedItems.includes(id)
                ? prevSelectedItems.filter(itemId => itemId !== id)
                : [...prevSelectedItems, id]
        );
    };

    const handleDeleteSelectedItems = () => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete them!',
            customClass: {
                popup: 'square',
                confirmButton: 'square',
                cancelButton: 'square',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteManyCartItem(selectedItems))
                    .unwrap()
                    .then(() => {
                        dispatch(getCart(userEmail));
                        return MySwal.fire({
                            title: 'Products Deleted',
                            icon: 'success',
                            confirmButtonColor: 'black',
                            customClass: {
                                popup: 'square',
                                confirmButton: 'square'
                            }
                        });
                    })
                    .catch(error => {
                        console.error('Delete operation failed:', error);
                        MySwal.fire({
                            title: 'Error!',
                            text: 'Failed to delete the products. Please try again.',
                            icon: 'error',
                            confirmButtonColor: 'black',
                            customClass: {
                                popup: 'square',
                                confirmButton: 'square'
                            }
                        });
                    });
            }
        });
    };


    return (
        <div className="space-y-10">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl">Cart Items</h1>
                <label className=" flex gap-2">
                    <input type="checkbox" checked={selectAll} onChange={() => setSelectAll(!selectAll)} /> Select All
                </label>
            </div>
            {
                cartItems.map(item => (
                    <div key={item._id}>
                        <input type="checkbox" checked={selectedItems.includes(item._id)} onChange={() => handleSelectItem(item._id)} />
                        <div className="flex gap-4 h-40 border border-black">
                            <img className="h-full w-32 object-cover object-top" src={item.image} alt="loading..." />
                            <div className="w-full flex flex-col justify-between p-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <Link to={`/product-details/${item.itemId}`}><h1 className="text-xl">{item.name}</h1></Link>
                                        <p>{item.color}</p>
                                        <p>Size: {item.size}</p>
                                    </div>
                                    <button onClick={() => handleDeleteCartItem(item._id)}><RxCross2 size={25} /></button>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div className="flex items-center gap-4">
                                        <p onClick={() => handleQuantity(item._id, "-")} className="w-[20px] h-[20px] lg:w-[35px] lg:h-[35px] rounded-full flex justify-center items-center text-xl cursor-pointer active:scale-95 duration-300 border"> - </p>
                                        <p className="px-5 py-1 font-semibold border ">{quantities[item._id]}</p>
                                        <p onClick={() => handleQuantity(item._id, "+")} className="w-[20px] h-[20px] lg:w-[35px] lg:h-[35px] rounded-full flex justify-center items-center text-xl cursor-pointer active:scale-95 duration-300 border"> + </p>
                                    </div>
                                    <p className="text-lg font-semibold">${(item.price * quantities[item._id]).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
            {selectedItems.length > 0 && (
                <button onClick={handleDeleteSelectedItems} className="bg-black text-white font-semibold px-4 py-2">
                    Delete Selected Items
                </button>
            )}
        </div>
    );
};

export default CartItem;
