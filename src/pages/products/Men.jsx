import { useDispatch, useSelector } from "react-redux";
import { allData } from "../../redux/dataSlice";
import { useEffect } from "react";
import { Scrollbar, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

const Men = () => {
    const dispatch = useDispatch();
    const { menCollections, status } = useSelector(state => state.data)

    useEffect(() => {
        if (status === 'idle') {
            dispatch(allData());
        }
    }, [status, dispatch]);
    console.log(menCollections);
    return (
        <div className=" grid grid-cols-3 gap-3 px-[5%]">
            {
                menCollections?.map(item => (
                    <div key={item._id}>
                        <Swiper
                            modules={[Scrollbar, Autoplay]}
                            spaceBetween={20}
                            slidesPerView={1}
                            scrollbar={{ draggable: true }}
                            autoplay={{ delay: 10000 }}>

                            <div>
                                {
                                    item.images[item.color[0]].map((image, index) => (
                                        <SwiperSlide key={index}>
                                            <img className=" h-96 w-full object-cover object-top" src={image} alt={`${item.name} ${item.color[0]} ${index}`} />
                                        </SwiperSlide>
                                    ))
                                }
                            </div>
                        </Swiper>
                        <div className=" p-2">
                            <h1 className=" text-lg font-semibold">{item.name}</h1>
                            <div className=" flex justify-between">
                                <p>Color: {item?.color[0]}</p>
                                <p>Price: ${item?.price}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Men;