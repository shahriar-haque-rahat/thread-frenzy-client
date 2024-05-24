import { Outlet } from "react-router-dom";
import Navbar from "./shared/Navbar";


const Root = () => {
    return (
        <div className=" font-raleway font-medium">
            <div className=" bg-white">
                <div className="max-w-[1440px] mx-auto px-[5%]">
                    <Navbar></Navbar>
                </div>
            </div>
            <div className=" max-w-[1440px] mx-auto">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Root;