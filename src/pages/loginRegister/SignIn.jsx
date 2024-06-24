import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import signIn from '../../assets/images/signIn.jpg';
import GoogleGithub from "./GoogleGithub";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet-async";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';


const MySwal = withReactContent(Swal);

const SignIn = () => {
    const { userSignIn, allUser } = useContext(AuthContext);console.log(allUser);
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const [showPass, setShowPass] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        if (allUser?.find(bannedUser => bannedUser.userEmail === data.email && bannedUser.Status === 'banned')) {
            MySwal.fire({
                title: <p className="text-3xl font-bold text-primary mb-4">User is banned</p>,
                icon: "error",
                confirmButtonText: "Okay",
                confirmButtonColor: 'black',
                customClass: {
                    popup: 'square',
                    confirmButton: 'square'
                }
            })
        }

        else if (allUser?.find(admin => admin.userEmail === data.email && admin.role === 'admin')) {
            const { email, password } = data;

            userSignIn(email, password)
                .then(result => {
                    console.log(result);
                    toast.success('Successfully logged in as Admin');
                    navigate(location?.state ? location.state : "/");
                })
                .catch(error => {
                    console.log(error);
                    toast.error('Invalid user input');
                })
        }

        else if (allUser?.find(user => user.userEmail === data.email && user.role === 'user')) {
            const { email, password } = data;

            userSignIn(email, password)
                .then(result => {
                    console.log(result);
                    toast.success('Successfully logged in');
                    navigate(location?.state ? location.state : "/");
                })
                .catch(error => {
                    console.log(error);
                    toast.error('Invalid user input');
                })
        }

        else {
            MySwal.fire({
                title: 'User not found',
                text: "Sign up instead",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sign Up',
                customClass: {
                    popup: 'square',
                    confirmButton: 'square',
                    cancelButton: 'square',
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/sign-up");
                }
            })
        }
    }

    const handleDemoAdmin = () => {
        const data = {
            email: 'demoadmin@gmail.com',
            password: 'Pa$$w0rd!'
        }
        onSubmit(data);
    }

    const handleUserAdmin = () => {
        const data = {
            email: 'demouser@gmail.com',
            password: 'Pa$$w0rd!'
        }
        onSubmit(data);
    }

    return (
        <>
            <Helmet>
                <title>Sign In | Thread Frenzy</title>
            </Helmet>
            <div className="relative flex items-center h-screen bg-cover bg-center text-black" style={{ backgroundImage: `url(${signIn})` }} >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative bg-white bg-opacity-90 w-[450px] p-8 md:ml-10">
                    <form onSubmit={handleSubmit(onSubmit)} className=" space-y-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Email address</span>
                            </label>
                            <input name="email" type="email" placeholder="Enter your email address" className="bg-transparent input rounded-none border-b border-b-black focus:outline-none focus:border-0 focus:border-b focus:border-black" {...register("email", { required: true })} />
                            {errors.email && <span className=" text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Password</span>
                            </label>
                            <span className=" flex relative">
                                <input name="password" type={showPass ? 'text' : 'password'} placeholder="Enter your password" className=" w-full bg-transparent input rounded-none border-b border-b-black focus:outline-none focus:border-0 focus:border-b focus:border-black" {...register("password", { required: true })} />
                                <span className=" absolute top-1/3 right-3" onClick={() => setShowPass(!showPass)}>
                                    {
                                        showPass ? <IoEyeOffOutline /> : <IoEyeOutline />
                                    }
                                </span>
                            </span>
                            {errors.password && <span className=" text-red-500">This field is required</span>}
                        </div>
                        <div>
                            <p className=" text-end text-gray-500">Forgot password?</p>
                        </div>
                        <div className="form-control mt-6">
                            <button className=" border border-black py-2 hover:bg-black hover:text-white transition duration-300 ease-in-out">Sign In</button>
                        </div>
                    </form>
                    <div className=" mt-2 w-full flex justify-between gap-3">
                        <button onClick={handleDemoAdmin} className=" w-full border border-blue-500 text-blue-500 py-1 hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out">Demo Admin</button>
                        <button onClick={handleUserAdmin} className=" w-full border border-green-500 text-green-500 py-1 hover:bg-green-500 hover:text-white transition duration-300 ease-in-out">Demo User</button>
                    </div>
                    <GoogleGithub></GoogleGithub>
                    <p className=" mt-3 text-center">Do Not Have An Account ? <Link className=" text-red-500" to={'/sign-up'}>Sign Up</Link></p>
                </div>
            </div>
        </>
    );
};

export default SignIn;