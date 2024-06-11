import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsGraphUpArrow } from "react-icons/bs";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoHomeOutline } from "react-icons/io5";
import { RiAccountCircleLine } from "react-icons/ri";
import { RiAccountCircleFill } from "react-icons/ri";
import { MdBookmarks } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import { IoHome } from "react-icons/io5";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Sidebar = ({ userByEmail }) => {
    const { userSignOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleUserSignOut = () => {
        userSignOut()
            .then(() => {
                toast.success("Signed Out");
                navigate("/");
            });
    };

    const Menu = () => (
        <>
            <div className="space-y-2 py-6">
                <img className="h-36 w-36 object-cover object-top" src={userByEmail?.photoUrl} alt="" />
                <p className="text-xl">{userByEmail?.firstName}</p>
            </div>
            {
                userByEmail.role === 'admin'
                    ? <ul className="flex flex-col gap-2 border-t pt-3">
                        <NavLink to={"/"} className={({ isActive }) =>
                            isActive
                                ? "flex gap-2 items-center text-lg py-2 pl-2 text-black bg-white"
                                : " flex gap-2 items-center text-lg py-2 pl-2"
                        }>
                            <IoHomeOutline size={21} /> Home
                        </NavLink>
                        <NavLink to={"/dashboard/profile"} className={({ isActive }) =>
                            isActive
                                ? "flex gap-2 items-center text-lg py-2 pl-2 text-black bg-white"
                                : " flex gap-2 items-center text-lg py-2 pl-2"
                        }>
                            <RiAccountCircleLine size={23} />Profile
                        </NavLink>
                        <NavLink to={"/dashboard/sales-overview"} className={({ isActive }) =>
                            isActive
                                ? "flex gap-2 items-center text-lg py-2 pl-2 text-black bg-white"
                                : " flex gap-2 items-center text-lg py-2 pl-2"
                        }>
                            <BsGraphUpArrow />Sales Overview
                        </NavLink>
                        <NavLink to={"/dashboard/manage-products"} className={({ isActive }) =>
                            isActive
                                ? "flex gap-2 items-center text-lg py-2 pl-2 text-black bg-white"
                                : " flex gap-2 items-center text-lg py-2 pl-2"
                        }>
                            <MdOutlineProductionQuantityLimits size={21} />Manage Products
                        </NavLink>
                        <NavLink to={"/dashboard/manage-orders"} className={({ isActive }) =>
                            isActive
                                ? "flex gap-2 items-center text-lg py-2 pl-2 text-black bg-white"
                                : " flex gap-2 items-center text-lg py-2 pl-2"
                        }>
                            <AiOutlineProduct size={21} />Manage Orders
                        </NavLink>
                        <NavLink to={"/dashboard/manage-users"} className={({ isActive }) =>
                            isActive
                                ? "flex gap-2 items-center text-lg py-2 pl-2 text-black bg-white"
                                : " flex gap-2 items-center text-lg py-2 pl-2"
                        }>
                            <HiOutlineUsers size={21} />Manage Users
                        </NavLink>
                    </ul>

                    : <ul className="flex flex-col gap-2 border-t pt-3">
                        <NavLink to={"/"} className={({ isActive }) =>
                            isActive
                                ? "flex gap-2 items-center text-lg py-2 pl-2 text-black bg-white"
                                : " flex gap-2 items-center text-lg py-2 pl-2"
                        }>
                            <IoHome size={23} /> Home
                        </NavLink>
                        <NavLink to={"/dashboard/profile"} className={({ isActive }) =>
                            isActive
                                ? "flex gap-2 items-center text-lg py-2 pl-2 text-black bg-white"
                                : " flex gap-2 items-center text-lg py-2 pl-2"
                        }>
                            <RiAccountCircleFill size={23} />Profile
                        </NavLink>
                        <NavLink to={"/dashboard/wishlist"} className={({ isActive }) =>
                            isActive
                                ? "flex gap-2 items-center text-lg py-2 pl-2 text-black bg-white"
                                : " flex gap-2 items-center text-lg py-2 pl-2"
                        }>
                            <MdBookmarks />Wishlist
                        </NavLink>
                        <NavLink to={"/dashboard/order-history"} className={({ isActive }) =>
                            isActive
                                ? "flex gap-2 items-center text-lg py-2 pl-2 text-black bg-white"
                                : " flex gap-2 items-center text-lg py-2 pl-2"
                        }>
                            <FaCartShopping />Order History
                        </NavLink>
                    </ul>
            }
        </>
    );

    return (
        <>
            <div className="fixed z-50 bg-black min-h-screen w-[25%] text-white pl-6 pt-6  hidden lg:block">
                <div>
                    <Link to={'/'}><h1 className="text-2xl font-bold">Thread Frenzy</h1></Link>
                    <Menu />
                </div>
                <button onClick={handleUserSignOut} className=" w-full my-10 py-2 pl-5 border-y-2 border-l-2 font-semibold flex items-center gap-3">Sign Out <TbLogout size={26} /></button>
            </div>

            {/* Side Drawer */}
            <div className="drawer fixed lg:hidden z-50">
                <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="sidebar-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
                    <div className="bg-black min-h-screen w-64 text-white pl-6 pt-6">
                        <Link to={'/'}><h1 className="text-2xl font-bold">Thread Frenzy</h1></Link>
                        <Menu />
                        <button onClick={handleUserSignOut} className=" w-full my-10 py-2 pl-5 border-y-2 border-l-2 font-semibold flex items-center gap-3">Sign Out <TbLogout size={26} /></button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
