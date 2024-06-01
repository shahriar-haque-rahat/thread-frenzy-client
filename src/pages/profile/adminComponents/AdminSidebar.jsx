import { Link, useNavigate } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BsGraphUpArrow } from "react-icons/bs";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoHomeOutline } from "react-icons/io5";
import { RiAccountCircleLine } from "react-icons/ri";


const AdminSidebar = ({ userByEmail, isActive, setIsActive, }) => {
    const { userSignOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleUserSignOut = () => {
        userSignOut()
            .then(() => {
                toast.success("Signed Out")
                navigate("/");
            })

    };

    return (
        <div className="bg-black w-[25%] text-white pl-6 pt-6 flex flex-col justify-between">
            <div>
                <Link to={'/'}><h1 className=" text-2xl font-bold">Thread Frenzy</h1></Link>
                <div className=" space-y-2 py-6">
                    <img className=" h-36 w-36 object-cover object-top " src={userByEmail?.photoUrl} alt="" />
                    <p className=" text-xl">{userByEmail?.firstName}</p>
                </div>
                <ul className=" flex flex-col gap-2 border-t pt-3">
                    <Link to={'/'}><button onClick={() => setIsActive('home')} className={isActive === 'home' ? " flex gap-2 items-center text-lg py-2 pl-2 text-black bg-white" : " flex gap-2 items-center text-lg py-2 pl-2"}><IoHomeOutline size={21} /> Home</button></Link>
                    <button onClick={() => setIsActive('salesOverview')} className={isActive === 'salesOverview' ? " flex gap-2 items-center text-lg py-2 pl-2 text-black bg-white" : " flex gap-2 items-center text-lg py-2 pl-2"}><BsGraphUpArrow />Sales Overview</button>
                    <button onClick={() => setIsActive('manageProducts')} className={isActive === 'manageProducts' ? " flex gap-2 items-center text-lg py-2 pl-2 text-black bg-white" : " flex gap-2 items-center text-lg py-2 pl-2"}><MdOutlineProductionQuantityLimits size={21} />Manage Products</button>
                    <button onClick={() => setIsActive('manageOrders')} className={isActive === 'manageOrders' ? " flex gap-2 items-center text-lg py-2 pl-2 text-black bg-white" : " flex gap-2 items-center text-lg py-2 pl-2"}><AiOutlineProduct size={21} />Manage Orders</button>
                    <button onClick={() => setIsActive('manageUsers')} className={isActive === 'manageUsers' ? " flex gap-2 items-center text-lg py-2 pl-2 text-black bg-white" : " flex gap-2 items-center text-lg py-2 pl-2"}><HiOutlineUsers size={21} />Manage Users</button>
                    <button onClick={() => setIsActive('account')} className={isActive === 'account' ? " flex gap-2 items-center text-lg py-2 pl-2 text-black bg-white" : " flex gap-2 items-center text-lg py-2 pl-2"}><RiAccountCircleLine size={23} />Account</button>
                </ul>
            </div>
            <button onClick={handleUserSignOut} className=" mb-10 mt-10 py-2 pl-5 border-y-2 border-l-2 font-semibold flex items-center gap-3">Sign Out <TbLogout size={20} /></button>
        </div>
    );
};

export default AdminSidebar;