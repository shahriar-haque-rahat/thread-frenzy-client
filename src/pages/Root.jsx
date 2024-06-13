import { Outlet } from "react-router-dom";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";


const Root = () => {
    return (
        <div className=" font-clashGrotesk font-medium">
            <div className=" bg-white">
                <div className="max-w-[1440px] mx-auto px-[5%]">
                    <Navbar></Navbar>
                </div>
            </div>
            <div className=" max-w-[1440px] mx-auto mt-24">
                <Outlet></Outlet>
            </div>
            <div className=" bg-black text-white">
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Root;