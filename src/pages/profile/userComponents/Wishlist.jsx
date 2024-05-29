import { useDispatch, useSelector } from "react-redux";
import { getWishlist } from "../../../redux/wishlistSlice";
import { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoBagOutline } from "react-icons/io5";
import { deleteWishlistItem } from "../../../redux/wishlistSlice";

const Wishlist = ({ userId }) => {
    const dispatch = useDispatch();
    const { wishlistItems, wishlistStatus, wishlistError } = useSelector(state => state.wishlist);


    const handleDeleteWishlistItem = (id) => {
        dispatch(deleteWishlistItem(id));
    }

    useEffect(() => {
        if (wishlistStatus === "idle") {
            dispatch(getWishlist(userId));
        }
    }, [dispatch, wishlistStatus, userId]);

    if (wishlistStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (wishlistStatus === 'failed') {
        return <div>Error: {wishlistError}</div>;
    }

    return (
        <div className="mt-6 mr-6">
            <h1 className="h-40 w-full text-5xl font-semibold pl-10 pt-6 text-white bg-black flex gap-4 items-center">Wishlist</h1>
            <div className=" pt-10 grid grid-cols-3 gap-3">
                {
                    wishlistItems?.map(item => (
                        <div key={item.itemId._id}>
                            <div className=" relative">
                                <img className="h-72 xl:h-96 w-full object-cover object-top" src={item.itemId.images[Object.keys(item.itemId.images)[0]][0]} alt="loading..." />
                                <button onClick={()=>handleDeleteWishlistItem(item._id)} className=" absolute top-2 right-2"><RxCross2 size={28} /></button>
                            </div>
                            <h1 className=" font-semibold px-2 h-14">{item.itemId.name}</h1>
                            <div className=" flex justify-between px-2">
                                <p>${item.itemId.price}</p>
                                <button><IoBagOutline size={23} /></button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Wishlist;
