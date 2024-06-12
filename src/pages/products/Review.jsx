import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addReview, getReview } from "../../redux/reviewSlice";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { useEffect } from "react";

const MySwal = withReactContent(Swal);

const Review = ({ productId, user }) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { reviewItems, reviewStatus, reviewError } = useSelector(state => state.review);

    const onSubmit = (data) => {
        const review = {
            productId,
            userEmail: user.userEmail,
            userName: user.firstName,
            review: data.review,
            rating: 0,
        };

        dispatch(addReview(review))
            .unwrap()
            .then(() => {
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

    useEffect(() => {
        dispatch(getReview(productId));
    }, [productId, dispatch]);

    if (reviewStatus === 'failed') {
        return <div>Error: {reviewError}</div>;
    }

    return (
        <div className=" border shadow-lg p-6 mt-10">
            <h1 className="text-3xl font-semibold mb-10">Reviews</h1>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="form-control md:w-1/2">
                        <textarea name="review" placeholder="Say something about the product" className="pt-2 bg-transparent input rounded-none border border-black focus:outline-none focus:border focus:border-black" {...register("review", { required: true })} />
                        {errors.review && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="form-control mt-6">
                        <button className="w-32 bg-black py-2 text-white hover:bg-white hover:text-black border border-black transition duration-300 ease-in-out">Submit</button>
                    </div>
                </form>
            </div>
            <div className=" mt-10 divide-y divide-black">
                {
                    reviewItems.length > 0
                        ? reviewItems.map((item) => (
                            <div key={item.id} className="py-4">
                                <p className="font-bold">{item.userName}</p>
                                <p>{item.review}</p>
                            </div>
                        ))
                        :
                        <p>No reviews yet.</p>
                }
            </div>
        </div>
    );
};

export default Review;
