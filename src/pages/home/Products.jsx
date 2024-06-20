import { useDispatch, useSelector } from "react-redux";
import { allData } from "../../redux/dataSlice";
import { useEffect } from "react";
import { Scrollbar, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import { Link } from "react-router-dom";

const Products = () => {
    const dispatch = useDispatch();
    const { data, allDataStatus, error } = useSelector((state) => state.data);

    useEffect(() => {
        if (allDataStatus === 'idle') {
            dispatch(allData());
        }
    }, [allDataStatus, dispatch]);

    // TODO: loading and failed status set korte hobe

    if (allDataStatus === 'failed') {
        return <div>Error: {error}</div>;
    }


    // Filter data
    const maleData = data.filter(item => item.gender === 'Male');
    const femaleData = data.filter(item => item.gender === 'Female');

    const femaleBrands = Array.from(new Set(femaleData.map(item => item.brand))).slice(0, 4);
    const maleBrands = Array.from(new Set(maleData.map(item => item.brand))).slice(0, 4);

    const selectedProducts = [];

    femaleBrands.forEach(brand => {
        const product = femaleData.find(item => item.brand === brand);
        if (product) {
            selectedProducts.push(product);
        }
    });

    maleBrands.forEach(brand => {
        const product = maleData.find(item => item.brand === brand);
        if (product) {
            selectedProducts.push(product);
        }
    });

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };
    const shuffledProducts = shuffleArray(selectedProducts);

    return (
        <div className=" bg-[#000000] py-10 space-y-6">
            <h1 className=" text-white text-3xl font-bold text-center">Trending Styles</h1>
            <div className="w-full flex justify-center gap-10">
                <Link to={'/men'}><button className="relative text-white w-20 text-sm px-3 py-1 after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:top-0 before:h-0.5 before:w-0 before:bg-white before:transition-all before:duration-300 hover:before:w-full">
                    Men
                </button></Link>
                <Link to={'/women'}><button className="relative text-white w-20 text-sm px-3 py-1 after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:top-0 before:h-0.5 before:w-0 before:bg-white before:transition-all before:duration-300 hover:before:w-full">
                    Women
                </button></Link>
            </div>


            <Swiper
                modules={[Scrollbar, Autoplay]}
                spaceBetween={20}
                breakpoints={{
                    320: {
                        slidesPerView: 2.3,
                        spaceBetween: 5
                    },
                    768: {
                        slidesPerView: 3.8,
                        spaceBetween: 15
                    },

                }}
                scrollbar={{ draggable: true }}
                autoplay={{ delay: 5000 }}>

                {
                    shuffledProducts.map((item, index) => (
                        <SwiperSlide key={index}>
                            <Link to={`/product-details/${item._id}`}>
                                <div className=" h-fit py-6 space-y-2">
                                    <img className=" h-[300px] lg:h-[400px] xl:h-[500px] w-full object-cover object-top" src={item.images[Object.keys(item.images)[0]][0]} alt="loading..." />
                                    <h1 className="text-white text-sm md:text-base px-2">{item.name}</h1>
                                    <p className="text-white text-xs md:text-sm px-2">Price: ${(item.price).toFixed(2)}</p>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))
                }

            </Swiper>

        </div>
    );
};

export default Products;
