

const SidebarSkeleton = () => {
    return (
        <>
            <div className="fixed bg-black min-h-screen w-[25%] text-white pl-6 pt-6 hidden lg:block">
                <div>
                    <div className="h-8 w-32 bg-gray-300 animate-pulse mb-6"></div>
                    <div className="py-6 flex gap-2 items-end">
                        <div className="h-24 w-24 bg-gray-300 animate-pulse"></div>
                        <div className="h-6 w-24 bg-gray-300 animate-pulse"></div>
                    </div>
                    <ul className="flex flex-col gap-2 border-t pt-3">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <li key={index} className="flex gap-2 items-center text-lg py-2 pl-2">
                                <div className="h-6 w-6 bg-gray-300 animate-pulse"></div>
                                <div className="h-6 w-32 bg-gray-300 animate-pulse"></div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-full my-10 py-2 pl-5 border-y-2 border-l-2 flex items-center gap-3">
                    <div className="h-6 w-32 bg-gray-300 animate-pulse"></div>
                    <div className="h-6 w-6 bg-gray-300 animate-pulse"></div>
                </div>
            </div>

            {/* Side Drawer */}
            <div className="drawer fixed lg:hidden z-50">
                <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content w-full bg-white p-2">
                    <label htmlFor="sidebar-drawer" aria-label="open sidebar">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
                    <div className="bg-black min-h-screen w-64 text-white pl-6 pt-6">
                        <div className="h-8 w-32 bg-gray-300 animate-pulse mb-6"></div>
                        <div className="py-6 flex gap-2 items-end">
                            <div className="h-24 w-24 bg-gray-300 animate-pulse rounded-full"></div>
                            <div className="h-8 w-24 bg-gray-300 animate-pulse"></div>
                        </div>
                        <ul className="flex flex-col gap-2 border-t pt-3">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <li key={index} className="flex gap-2 items-center text-lg py-2 pl-2">
                                    <div className="h-6 w-6 bg-gray-300 animate-pulse"></div>
                                    <div className="h-6 w-32 bg-gray-300 animate-pulse"></div>
                                </li>
                            ))}
                        </ul>
                        <div className="w-full my-10 py-2 pl-5 border-y-2 border-l-2 flex items-center gap-3">
                            <div className="h-6 w-32 bg-gray-300 animate-pulse"></div>
                            <div className="h-6 w-6 bg-gray-300 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SidebarSkeleton;
