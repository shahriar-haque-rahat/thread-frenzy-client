import { Helmet } from "react-helmet-async";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addMessages } from "../redux/messageSlice"


const MySwal = withReactContent(Swal);

const ContactUs = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            dispatch(addMessages(data))
                .then(() => {
                    MySwal.fire({
                        title: 'Message Sent!',
                        text: 'Your message has been sent successfully. Thank you for your feedback!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });

                    reset();
                })

        } catch (error) {
            console.error(error);
            MySwal.fire({
                title: 'Error!',
                text: 'There was an error sending your message. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };


    return (
        <>
            <Helmet>
                <title>Contact Us | Thread Frenzy</title>
            </Helmet>

            <div className="container mx-auto p-8">
                <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
                <p className="mb-6">Feel free to reach out to us with any questions, comments, or feedback. We look forward to hearing from you!</p>
                <div className="mb-8">
                    <h2 className="text-2xl font-bold">Our Address</h2>
                    <p>Dhaka, Bangladesh</p>
                    <p>Email: threadfrenzy@gmail.com</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Email address</span>
                        </label>
                        <input name="email" type="email" placeholder="Enter your email address" className="md:w-1/3 bg-transparent input rounded-none border border-gray-400 focus:outline-none focus:border focus:border-black" {...register("email", { required: true })} />
                        {errors.email && <span className=" text-red-500">This field is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Message</span>
                        </label>
                        <textarea name="message" type="message" placeholder="Enter your message here" className=" h-28 pt-2 bg-transparent input rounded-none border border-gray-400 focus:outline-none focus:border focus:border-black" {...register("message", { required: true })} />
                        {errors.message && <span className=" text-red-500">This field is required</span>}
                    </div>

                    <div className="form-control mt-6">
                        <button className="bg-black border border-black py-2 hover:bg-white hover:text-black text-white font-bold transition duration-300 ease-in-out">Send Message</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ContactUs;