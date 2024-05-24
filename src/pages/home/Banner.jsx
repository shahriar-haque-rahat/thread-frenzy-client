import banner1 from "../../assets/images/banner1.webp";
import banner2 from "../../assets/images/banner2.webp";
import banner3 from "../../assets/images/banner3.jpg";

const Banner = () => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-5 h-fit gap-1">
                <div className="col-span-2 grid grid-rows-2 h-[550px] xl:h-[700px] gap-1">
                    <div className="relative w-full h-full overflow-hidden">
                        <div className="absolute inset-0 hover:scale-110 duration-[.6s] bg-cover bg-center" style={{ backgroundImage: `url(${banner2})` }}></div>
                        {/* <h1 className=" fixed text-white text-xl pl-5 pb-10">Comfortable and easy to maintain</h1> */}
                    </div>
                    <div className="relative w-full h-full overflow-hidden">
                        <div className="absolute inset-0 hover:scale-110 duration-[.6s] bg-cover bg-center" style={{ backgroundImage: `url(${banner3})` }}></div>
                        {/* <h1 className=" fixed text-white text-xl pl-5 pb-10">Everyday essential for effortless style</h1> */}
                    </div>
                </div>

                <div className="relative w-full col-span-3 h-[550px] xl:h-[700px] overflow-hidden">
                    <div className="absolute inset-0 hover:scale-110 duration-[.6s] bg-cover bg-center" style={{ backgroundImage: `url(${banner1})` }}></div>
                    {/* <h1 className=" fixed text-white text-xl pl-5 pb-10">Versatile and casual attire for people of all ages</h1> */}
                </div>
            </div>
        </>
    );
};

export default Banner;
