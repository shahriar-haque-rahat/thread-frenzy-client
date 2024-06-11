import { useState } from "react";
import Sidebar from "../Sidebar";
import SalesOverview from "./SalesOverview";
import ManageProducts from "./ManageProducts";
import ManageOrders from "./ManageOrders";
import ManageUsers from "./ManageUsers";
import Account from "../Account";


const Admin = ({ userByEmail }) => {
    const [isActive, setIsActive] = useState('salesOverview');

    return (
        <div className=" max-w-[1440px] mx-auto flex">
            <Sidebar userByEmail={userByEmail} isActive={isActive} setIsActive={setIsActive}></Sidebar>
            <div className=" mt-12 lg:mt-6 m-6 w-full lg:w-[75%]">
                {
                    (isActive === 'salesOverview') && <SalesOverview></SalesOverview>
                }
                {
                    (isActive === 'manageProducts') && <ManageProducts></ManageProducts>
                }
                {
                    (isActive === 'manageOrders') && <ManageOrders></ManageOrders>
                }
                {
                    (isActive === 'manageUsers') && <ManageUsers></ManageUsers>
                }
                {
                    (isActive === 'account') && <Account userByEmail={userByEmail}></Account>
                }
            </div>
        </div>
    );
};

export default Admin;