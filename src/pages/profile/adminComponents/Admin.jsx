import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import SalesOverview from "./SalesOverview";
import ManageProducts from "./ManageProducts";
import ManageOrders from "./ManageOrders";
import ManageUsers from "./ManageUsers";
import AdminAccount from "./AdminAccount";


const Admin = ({ userByEmail }) => {
    const [isActive, setIsActive] = useState('salesOverview');

    return (
        <div className=" max-w-[1440px] mx-auto flex gap-6">
            <AdminSidebar userByEmail={userByEmail} isActive={isActive} setIsActive={setIsActive}></AdminSidebar>
            <div className=" w-[75%]">
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
                    (isActive === 'account') && <AdminAccount userByEmail={userByEmail}></AdminAccount>
                }
            </div>
        </div>
    );
};

export default Admin;