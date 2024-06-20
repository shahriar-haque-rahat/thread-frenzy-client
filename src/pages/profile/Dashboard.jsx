import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
    const { userByEmail, userByEmailStatus, userByEmailError } = useContext(AuthContext);



    if (userByEmailStatus === 'failed') {
        return <div>Error: {userByEmailError}</div>;
    }

    return (
        <div className=" max-w-[1440px] min-h-screen font-clashGrotesk font-medium mx-auto flex">
            <Sidebar userByEmail={userByEmail}></Sidebar>
            <div className=" mt-12 lg:mt-6 m-2 lg:m-6 w-full lg:ml-[27%] lg:w-[75%]">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;