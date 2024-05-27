import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import signIn from '../../assets/images/signIn.jpg';
import GoogleGithub from "./GoogleGithub";


const SignIn = () => {
    const { userSignIn } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const [showPass, setShowPass] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        const { email, password } = data;

        userSignIn(email, password)
            .then(result => {
                console.log(result);
                navigate(location?.state ? location.state : "/");
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
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
                        <button className=" border border-black py-2 hover:bg-white transition duration-300 ease-in-out">Sign In</button>
                    </div>
                </form>
                <GoogleGithub></GoogleGithub>
                <p className=" mt-3 text-center">Do Not Have An Account ? <Link className=" text-red-500" to={'/sign-up'}>Sign Up</Link></p>
            </div>
        </div>
    );
};

export default SignIn;