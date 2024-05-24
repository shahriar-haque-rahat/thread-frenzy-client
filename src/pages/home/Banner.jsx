import banner1 from "../../assets/images/banner1.webp";
import banner2 from "../../assets/images/banner2.webp";
import banner3 from "../../assets/images/banner3.jpg";

const Banner = () => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-5 h-fit gap-1">
                <div className="col-span-2 grid grid-rows-2 h-[550px] xl:h-[700px] gap-1">
                    <div className="relative w-full h-full">
                        <img src={banner2} className="w-full h-full object-cover object-center" alt="Banner 2" />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end text-white text-xl pl-5 pb-10">
                            Comfortable and easy to maintain
                        </div>
                    </div>
                    <div className="relative w-full h-full">
                        <img src={banner3} className="w-full h-full object-cover object-top" alt="Banner 3" />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end text-white text-xl pl-5 pb-10">
                            Everyday essential for effortless style
                        </div>
                    </div>
                </div>
                <div className="relative col-span-3 h-[550px] xl:h-[700px] w-full">
                    <img src={banner1} className="w-full h-full object-cover object-center" alt="Banner 1" />
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end text-white text-xl pl-5 pb-10">
                        Versatile and casual attire for people of all ages
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;
