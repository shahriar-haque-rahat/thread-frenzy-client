import { useDispatch, useSelector } from "react-redux";
import { allData } from "../../redux/dataSlice";
import { useEffect } from "react";
import { Scrollbar, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

const Products = () => {
    const dispatch = useDispatch();
    const { data, status, error } = useSelector((state) => state.data);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(allData());
        }
    }, [status, dispatch]);


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
        <div className=" bg-[#16315a] py-10 space-y-6">
            <h1 className=" text-yellow-400 text-xl font-bold text-center">Trending Styles</h1>
            <Swiper modules={[Scrollbar, Autoplay]} spaceBetween={50} slidesPerView={3} scrollbar={{ draggable: true }} autoplay={{ delay: 5000 }}>

                {
                    shuffledProducts.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className=" h-fit py-6 space-y-2">
                                <img className=" h-96 w-80 object-cover object-top" src={item.images[Object.keys(item.images)[0]][0]} alt="loading..." />
                                <h1 className="text-white text-base">{item.name}</h1>
                                <p className="text-white text-sm">Price: ${item.price}</p>
                            </div>
                        </SwiperSlide>
                    ))
                }

            </Swiper>
        </div>
    );
};

export default Products;
