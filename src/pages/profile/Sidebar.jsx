import { Link } from "react-router-dom";
import { RiAccountCircleFill } from "react-icons/ri";
import { MdBookmarks } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";


const Sidebar = ({ isActive, setIsActive, }) => {
    const { user } = useContext(AuthContext);
    // console.log(user.photoURL);


    return (
        <div className="bg-black h-screen w-[20%] text-white pl-6 pt-6">
            <Link to={'/'}><h1 className=" text-2xl font-bold">Thread Frenzy</h1></Link>
            <div className=" space-y-2 py-6">
                <img className=" h-24 w-24 rounded-full" src={user?.photoURL} alt="" />
                <p className=" pl-3 text-xl">{user?.displayName}</p>
            </div>
            <ul className=" flex flex-col gap-2 border-t pt-3">
                <li onClick={() => setIsActive('account')} className={isActive === 'account' ? " flex gap-2 items-center text-lg py-2 pl-2 text-black bg-white" : " flex gap-2 items-center text-lg py-2 pl-2"}><RiAccountCircleFill size={23} />Account</li>
                <li onClick={() => setIsActive('wishlist')} className={isActive === 'wishlist' ? " flex gap-2 items-center text-lg py-2 pl-2 text-black bg-white" : " flex gap-2 items-center text-lg py-2 pl-2"}><MdBookmarks />Wishlist</li>
                <li onClick={() => setIsActive('orders')} className={isActive === 'orders' ? " flex gap-2 items-center text-lg py-2 pl-2 text-black bg-white" : " flex gap-2 items-center text-lg py-2 pl-2"}><FaCartShopping />Order History</li>
            </ul>
        </div>
    );
};

export default Sidebar;