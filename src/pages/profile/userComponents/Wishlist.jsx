import { useDispatch, useSelector } from "react-redux";
import { getWishlist } from "../../../redux/wishlistSlice";
import { useEffect } from "react";

const Wishlist = ({ userId }) => {
    const dispatch = useDispatch();
    const { wishlistItems, wishlistStatus, wishlistError } = useSelector(state => state.wishlist);

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
            <div>
                <p>Total items: {wishlistItems?.length}</p>
                <ul>
                    {wishlistItems.map(item => (
                        <li key={item._id}>{item.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Wishlist;
