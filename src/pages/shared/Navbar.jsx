import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BsMoonStars, BsSun } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { IoBagOutline } from "react-icons/io5";

const Navbar = () => {
    const navbarRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState("light");
    const html = document.documentElement;

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
                    ? "border-b-2 border-black font-bold ${}"
                    : " "
            }>
                Women
            </NavLink>
        </>
    )
    return (
        <>
            <div className="navbar flex justify-between px-0 bg-transparent py-6 " ref={navbarRef}>
                <div>
                    <div className="dropdown">
                        <div tabIndex={0} className="pr-4 lg:hidden" onClick={toggleMenu}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul className={`menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow-sm rounded w-40 ${isOpen ? "translate-x-0" : "-translate-x-96"
                            } bg-white border border-black transition-transform duration-300 ease-in-out`}>
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
                    <div className="block ">
                        {theme === "dark" ? (
                            <BsSun onClick={handleTheme} size={22} />
                        ) : (
                            <BsMoonStars onClick={handleTheme} size={22} />
                        )}
                    </div>
                    <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                        <div tabIndex={0} role="button">
                            <AiOutlineUser size={25} />
                        </div>
                        <ul tabIndex={0} className="dropdown-content dark:bg-[#292929] dark:text-white z-[50] menu p-3 shadow bg-base-100 rounded w-44 space-y-2">

                        </ul>
                    </div>
                    <div>
                        <IoBagOutline size={25} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;