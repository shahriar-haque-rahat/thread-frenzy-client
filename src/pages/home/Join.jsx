import { Link } from "react-router-dom";
import joinNow from "../../assets/images/joinNow.jpg"
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const Join = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="h-[550px] bg-cover bg-center relative" style={{ backgroundImage: `url(${joinNow})` }}>
            <div className=" absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white text-center">
                <h1 className="text-3xl font-bold">Thread Frenzy</h1>
                <p className="text-sm mb-6">Where style meets substance</p>
                {
                    user
                        ? <div>
                            <p className="text-lg">Glad to have you here.</p>
                            <p className="text-base md:text-lg">Explore the latest fashion trends and updates.</p>
                        </div>
                        : <div>
                            <p className="text-base md:text-lg">Dive into the world of fashion with our exclusive updates.</p>
                            <p className="text-base md:text-lg mb-6">Sign up now and stay ahead of the curve.</p>
                            <Link to={'/sign-up'}><button className=" border w-72 md:w-96 py-1 hover:bg-white hover:text-black duration-300">Sign Up Now</button></Link>
                        </div>
                }
            </div>
        </div>

    );
};

export default Join;