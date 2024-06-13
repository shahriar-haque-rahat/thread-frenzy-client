import { useLottie } from "lottie-react";
import error from "../json/error.json";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Error = () => {
    const options = {
        animationData: error,
        loop: true,
        style: { height: 100 }
    };

    const { View } = useLottie(options);

    return (
        <>
            <Helmet>
                <title>Error | Thread Frenzy</title>
            </Helmet>
            <div className=" space-y-4 flex flex-col items-center pt-32 font-clashGrotesk font-medium">
                <div className=" w-[30%]">{View}</div>
                <h1 className=" text-2xl ">Unexpected Application Error</h1>
                <Link to={'/'}><button className=" flex items-center bg-black text-white px-2 py-1 w-fit ">Back to Home</button></Link>
            </div>
        </>
    );
};

export default Error;