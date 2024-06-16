import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allData } from "../../redux/dataSlice";
import { Scrollbar, Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Link } from "react-router-dom";
// import SliderCards from "./SliderCards";

const SimilarProducts = ({ itemBrand, itemId }) => {
    const dispatch = useDispatch();
    const { data, allDataStatus, error } = useSelector((state) => state.data);
    const filteredData = data?.filter(item => item.brand === itemBrand && item._id !== itemId);


    useEffect(() => {
        if (allDataStatus === 'idle') {
            dispatch(allData());
        }
    }, [allDataStatus, dispatch]);


    if (allDataStatus === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <h1 className="text-3xl font-semibold mt-20 mb-10">You may also like</h1>
            <Swiper
                modules={[Scrollbar, Navigation, Autoplay]}
                spaceBetween={20}
                breakpoints={{
                    320: {
                        slidesPerView: 2.3,
                        spaceBetween: 5
                    },
                    768: {
                        slidesPerView: 3.3,
                        spaceBetween: 15
                    },

                }}
                navigation
                scrollbar={{ draggable: true }}>
                {
                    filteredData?.map(item => (
                        <SwiperSlide key={item._id}>
                            <div>
                                <Swiper
                                    modules={[Scrollbar, Autoplay]}
                                    spaceBetween={20}
                                    slidesPerView={1}
                                    scrollbar={{ draggable: true }}
                                    autoplay={{ delay: 10000 }}>

                                    <div>
                                        {
                                            item.images[item.color[0]]?.map((image, index) => (
                                                <SwiperSlide key={index} className="relative group">
                                                    <img className="h-96 w-full object-cover object-top" src={image} alt={`${item.name} ${item.color[0]} ${index}`} />
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <p className=" mb-4">Price: ${item.price}</p>
                                                        <Link to={`/product-details/${item._id}`}><button className="relative text-white  text-sm px-3 py-1 after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:top-0 before:h-0.5 before:w-0 before:bg-white before:transition-all before:duration-300 hover:before:w-full">
                                                            View Details
                                                        </button></Link>
                                                    </div>
                                                </SwiperSlide>
                                            ))
                                        }
                                    </div>
                                </Swiper>
                                <div className=" p-3">
                                    <h1 className=" text-lg font-semibold">{item.name}</h1>
                                </div>
                            </div>
                        </SwiperSlide>

                    ))
                }
            </Swiper>
            {/* <SliderCards data={filteredData} /> */}
        </>
    );
};

export default SimilarProducts;