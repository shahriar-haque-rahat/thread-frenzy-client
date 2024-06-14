import { useDispatch, useSelector } from "react-redux";
import { getWishlist, resetWishlist, deleteWishlistItem } from "../../../redux/wishlistSlice";
import { useContext, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { AuthContext } from "../../../provider/AuthProvider";
import { Helmet } from "react-helmet-async";

const MySwal = withReactContent(Swal)

const Wishlist = () => {
    const dispatch = useDispatch();
    const { userByEmail, userByEmailStatus, userByEmailError } = useContext(AuthContext);
    const { wishlistItems, wishlistStatus, wishlistError } = useSelector(state => state.wishlist);

    const handleDeleteWishlistItem = (id) => {
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
                dispatch(deleteWishlistItem(id));
            }
        })
    }

    useEffect(() => {
        if (userByEmailStatus === "succeeded" && wishlistStatus === "idle") {
            dispatch(getWishlist(userByEmail._id));
        }
    }, [dispatch, wishlistStatus, userByEmail, userByEmailStatus]);

    useEffect(() => {
        if (userByEmailStatus === "succeeded") {
            dispatch(resetWishlist());
        }
    }, [dispatch, userByEmailStatus]);

    if (userByEmailStatus === 'failed' || wishlistStatus === 'failed') {
        return <div>Error: {userByEmailError || wishlistError}</div>;
    }

    return (
        <>
            <Helmet>
                <title>Wishlist | Thread Frenzy</title>
            </Helmet>
            <h1 className="h-40 w-full text-5xl font-semibold pl-10 pt-6 text-white bg-black flex gap-4 items-center">Wishlist</h1>
            <div className="pt-10 grid grid-cols-2 md:grid-cols-3 gap-3">
                {wishlistItems?.map(item => (
                    <div key={item.itemId._id} className="relative">
                        <Link to={`/product-details/${item.itemId._id}`}>
                            <img className="h-72 xl:h-96 w-full object-cover object-top" src={item.itemId.images[Object.keys(item.itemId.images)[0]][0]} alt="loading..." />
                            <p className="absolute top-2 left-2 font-bold">${item.itemId.price}</p>
                            <h1 className="absolute bottom-0 w-full h-16 font-semibold text-lg text-white bg-black bg-opacity-55 px-2">{item.itemId.name}</h1>
                        </Link>
                        <button onClick={() => handleDeleteWishlistItem(item._id)} className="z-10 absolute top-2 right-2">
                            <RxCross2 size={28} />
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Wishlist;
