import { useState } from "react";
import Sidebar from "./Sidebar";


const User = () => {
    const [isActive, setIsActive] = useState('account');

    return (
        <div className=" flex">
            <Sidebar isActive={isActive} setIsActive={setIsActive}></Sidebar>
            <div></div>
        </div>
    );
};

export default User;