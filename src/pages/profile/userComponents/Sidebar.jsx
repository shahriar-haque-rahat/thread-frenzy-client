import { Link, useNavigate } from "react-router-dom";
import { RiAccountCircleFill } from "react-icons/ri";
import { MdBookmarks } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import { IoHome } from "react-icons/io5";
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Sidebar = ({ userByEmail, isActive, setIsActive, }) => {
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
                    <Link to={'/'}><button onClick={() => setIsActive('home')} className={isActive === 'home' ? " flex gap-2 items-center text-lg py-2 pl-2 text-black bg-white" : " flex gap-2 items-center text-lg py-2 pl-2"}><IoHome size={23} /> Home</button></Link>
                    <button onClick={() => setIsActive('account')} className={isActive === 'account' ? " flex gap-2 items-center text-lg py-2 pl-2 text-black bg-white" : " flex gap-2 items-center text-lg py-2 pl-2"}><RiAccountCircleFill size={23} />Account</button>
                    <button onClick={() => setIsActive('wishlist')} className={isActive === 'wishlist' ? " flex gap-2 items-center text-lg py-2 pl-2 text-black bg-white" : " flex gap-2 items-center text-lg py-2 pl-2"}><MdBookmarks />Wishlist</button>
                    <button onClick={() => setIsActive('orders')} className={isActive === 'orders' ? " flex gap-2 items-center text-lg py-2 pl-2 text-black bg-white" : " flex gap-2 items-center text-lg py-2 pl-2"}><FaCartShopping />Order History</button>
                </ul>
            </div>
            <button onClick={handleUserSignOut} className=" mb-10 mt-10 py-2 pl-5 border-y-2 border-l-2 font-semibold flex items-center gap-3">Sign Out <TbLogout size={26} /></button>
        </div>
    );
};

export default Sidebar;