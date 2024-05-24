import { Outlet } from "react-router-dom";


const Root = () => {
    return (
        <div className=" font-raleway font-medium">
            <div className=" max-w-[1440px] mx-auto">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Root;