import { useDispatch, useSelector } from "react-redux";
import { getWishlist, setCurrentPage, deleteWishlistItem } from "../../../redux/wishlistSlice";
import { useContext, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { AuthContext } from "../../../provider/AuthProvider";
import { Helmet } from "react-helmet-async";
import DashboardPagination from "../DashboardPagination";

const MySwal = withReactContent(Swal);

const Wishlist = () => {
    const dispatch = useDispatch();
    const { userByEmail, userByEmailStatus, userByEmailError } = useContext(AuthContext);
    const { wishlistItems, wishlistStatus, wishlistError, totalPages, currentPage } = useSelector(state => state.wishlist);

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
        });
    };

    const handlePageChange = (newPage) => {
        dispatch(setCurrentPage(newPage));
    };

    useEffect(() => {
        if (userByEmail) {
            const filters = {
                page: currentPage,
                limit: 6,
            };
            dispatch(getWishlist({ userId: userByEmail._id, filters }));
        }
    }, [dispatch, userByEmail, currentPage]);

    if (userByEmailStatus === 'failed' || wishlistStatus === 'failed') {
        return <div>Error: {userByEmailError || wishlistError}</div>;
    }

    return (
        <>
            <Helmet>
                <title>Wishlist | Thread Frenzy</title>
            </Helmet>
            <h1 className="h-40 w-full text-5xl font-semibold pl-10 pt-6 text-white bg-black flex gap-4 items-center">Wishlist</h1>
            <div className="pt-10 grid grid-cols-2 md:grid-cols-3 gap-3 text-black">
                {
                    wishlistItems?.map(item => (
                        <div key={item.itemId._id} className="relative">
                            <Link to={`/product-details/${item.itemId._id}`}>
                                <img className="h-72 xl:h-96 w-full object-cover object-top" src={item.itemId.images[Object.keys(item.itemId.images)[0]][0]} alt="loading..." />
                                <div className=" absolute top-2 left-2 font-semibold flex gap-3">
                                    <p>${(item.itemId.price - (item.itemId.price * (item.itemId.discount / 100))).toFixed(2)}</p>
                                    {item.itemId.discount !== 0 && (
                                        <>
                                            <p className="line-through text-red-500">${(item.itemId.price).toFixed(2)}</p>
                                        </>
                                    )}
                                </div>
                                <h1 className="absolute bottom-0 w-full h-16 font-semibold text-lg text-white bg-black bg-opacity-55 px-2">{item.itemId.name}</h1>
                            </Link>
                            <button onClick={() => handleDeleteWishlistItem(item._id)} className="z-10 absolute top-2 right-2"><RxCross2 size={28} /></button>
                        </div>
                    ))
                }
            </div>
            <DashboardPagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
        </>
    );
};

export default Wishlist;
