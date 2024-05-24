import features from "../../json/features.json";

const Features = () => {
    return (
        <>
            <div className=" grid grid-cols-4 md:grid-cols-8 gap-4 justify-center items-center p-[5%] h-full bg-white">
                {
                    features?.map((item, idx) => (
                        <div key={idx}>
                                <img src={item.image} alt={item.brand}/>
                        </div>

                    ))
                }
            </div>
        </>
    );
};

export default Features;
