import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BsMoonStars, BsSun } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { IoBagOutline } from "react-icons/io5";
import { HiMenuAlt4 } from "react-icons/hi";
import { AuthContext } from "../../provider/AuthProvider";

const Navbar = () => {
    const { user, userSignOut } = useContext(AuthContext);
    const navbarRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState("light");
    const html = document.documentElement;

    const handleUserSignOut = () => {
        userSignOut()
            .then(() => {
                // toast.success("User Logged Out")
            })

    };

    const handleTheme = () => {
        if (theme === "light") {
            html.classList.remove("light");
            html.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setTheme("dark");
        } else {
            html.classList.remove("dark");
            html.classList.add("light");
            localStorage.setItem("theme", "light");
            setTheme("light");
        }
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && navbarRef.current && !navbarRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.body.addEventListener('click', handleClickOutside);

        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    const links = (
        <>
            <NavLink to={"/"} className={({ isActive }) =>
                isActive
                    ? "border-b-2 border-black font-bold"
                    : " "
            }>
                Home
            </NavLink>
            <NavLink to={"/men"} className={({ isActive }) =>
                isActive
                    ? "border-b-2 border-black font-bold"
                    : " "
            }>
                Men
            </NavLink>
            <NavLink to={"/women"} className={({ isActive }) =>
                isActive
                    ? "border-b-2 border-black font-bold"
                    : " "
            }>
                Women
            </NavLink>
        </>
    )
    return (
        <>
            <div className="navbar flex justify-between px-0 bg-transparent py-6 text-black" ref={navbarRef}>
                <div>
                    <div className="dropdown hover:cursor-pointer">
                        <div tabIndex={0} className="pr-4 lg:hidden" onClick={toggleMenu}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <HiMenuAlt4 size={22} />
                            </svg>
                        </div>
                        <ul className={`menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow-sm w-40 space-y-3 ${isOpen ? "translate-x-0" : "-translate-x-96"} bg-white border border-black transition-transform duration-300 ease-in-out`}>
                            {links}
                        </ul>
                    </div>
                    <Link to={"/"}>
                        <p className="text-xl font-bold">
                            Thread Frenzy
                        </p>
                    </Link>
                </div>
                <div className="hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 flex gap-8">
                        {links}
                    </ul>
                </div>
                <div className=" flex gap-4">
                    <div className="block hover:cursor-pointer">
                        {theme === "dark" ? (
                            <BsSun onClick={handleTheme} size={22} />
                        ) : (
                            <BsMoonStars onClick={handleTheme} size={22} />
                        )}
                    </div>
                    <Link to={'/cart'}><div className=" hover:cursor-pointer">
                        <IoBagOutline size={25} />
                    </div></Link>
                    {
                        user
                            ? <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                                <div tabIndex={0} role="button">
                                    <AiOutlineUser size={25} />
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu z-[50] p-3 shadow bg-white w-44 space-y-3 border border-black">
                                    <h1 className=" font-semibold text-lg">{user.displayName}</h1>
                                    <Link to={'/profile'} className=" border-y border-gray-300 hover:border-y hover:border-black py-1 text-start"><button>Profile</button></Link>
                                    <button onClick={handleUserSignOut} className=" bg-black text-white py-1 w-full">Sign Out</button>
                                </ul>
                            </div>
                            : <Link to={'/sign-in'}><button className=" bg-black text-white px-2 py-1 ">Sign In</button></Link>
                    }
                </div>
            </div>
        </>
    );
};

export default Navbar;