import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addReview, deleteReview, getAllReview, getReview, setCurrentPage } from "../../redux/reviewSlice";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import ReactStars from "react-rating-stars-component";
import DashboardPagination from "../profile/DashboardPagination";

const MySwal = withReactContent(Swal);

const Review = ({ productId, user }) => {
    const dispatch = useDispatch();
    const { reviewItems, reviewStatus, reviewError, totalPages, currentPage } = useSelector(state => state.review);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [rating, setRating] = useState(0);

    const onSubmit = (data) => {
        const review = {
            productId,
            userEmail: user.userEmail,
            userName: user.firstName,
            review: data.review,
            rating: rating,
        };

        dispatch(addReview(review))
            .unwrap()
            .then(() => {
                dispatch(getAllReview(productId));
                const filters = {
                    page: currentPage,
                    limit: 3,
                };
                dispatch(getReview({ productId, filters }));
                MySwal.fire({
                    title: '<p className="text-3xl font-bold mb-4">Thank you for the review</p>',
                    icon: 'success',
                    confirmButtonColor: 'black',
                    confirmButtonText: 'Okay',
                    customClass: {
                        popup: 'square',
                        confirmButton: 'square'
                    }
                });
                setRating(0);
                reset();
            })
            .catch((error) => {
                MySwal.fire({
                    title: '<p className="text-3xl font-bold mb-4">Error</p>',
                    text: error,
                    icon: 'error',
                    confirmButtonColor: 'black',
                    confirmButtonText: 'Okay',
                    customClass: {
                        popup: 'square',
                        confirmButton: 'square'
                    }
                });
            });
    };

    const handleDelete = (id) => {
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
                dispatch(getAllReview(productId));
                dispatch(deleteReview(id))
                    .then(() => {
                        const filters = {
                            page: currentPage,
                            limit: 3,
                        };
                        dispatch(getReview({ productId, filters }));
                    });
            }
        });
    };

    const handlePageChange = (newPage) => {
        dispatch(setCurrentPage(newPage));
    };

    useEffect(() => {
        const filters = {
            page: currentPage,
            limit: 3,
        };
        dispatch(getReview({ productId, filters }));
    }, [productId, dispatch, currentPage]);

    if (reviewStatus === 'failed') {
        return <div>Error: {reviewError}</div>;
    }

    return (
        <div className="border shadow-lg p-6 mt-10">
            <h1 className="text-3xl font-semibold mb-10">Reviews</h1>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="form-control md:w-1/2">
                        <textarea
                            name="review"
                            placeholder="Say something about the product"
                            className="pt-2 bg-transparent input rounded-none border border-black focus:outline-none focus:border focus:border-black"
                            {...register("review", { required: true })}
                        />
                        {errors.review && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="form-control md:w-1/2">
                        <ReactStars
                            count={5}
                            size={24}
                            activeColor="#ffd700"
                            value={rating}
                            isHalf={true}
                            onChange={(newRating) => setRating(newRating)}
                            key={`rating-${rating}`}
                        />
                        {errors.rating && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="form-control mt-6">
                        <button className="w-32 bg-black py-2 text-white hover border border-black transition duration-300 ease-in-out">Submit</button>
                    </div>
                </form>
            </div>
            <div className="mt-10">
                {
                    reviewItems.map((item) => (
                        <div key={item._id} className="py-5 space-y-2">
                            <span className=" flex gap-2 items-center">
                                <p className="font-bold">{item.userName}</p>
                                <p className=" text-xs">[{item.date.slice(0, item.date.indexOf('T'))}]</p>
                            </span>
                            <ReactStars
                                count={5}
                                size={24}
                                value={item.rating}
                                isHalf={true}
                                edit={false}
                                activeColor="#ffd700"
                            />
                            <p>{item.review}</p>
                            {item.userEmail === user.userEmail && (
                                <button onClick={() => handleDelete(item._id)} className="text-xs text-red-500">
                                    Delete
                                </button>
                            )}
                        </div>
                    ))
                }
            </div>
            <DashboardPagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
        </div>
    );
};

export default Review;
