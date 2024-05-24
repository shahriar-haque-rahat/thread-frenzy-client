import features from "../../json/features.json";

const Features = () => {
    return (
        <>
            <div className=" grid md:grid-cols-3 lg:grid-cols-4 gap-4 p-[5%]">
                {
                    features?.map((item, idx) => (
                        <div key={idx} className="relative border shadow-sm rounded-xl overflow-hidden group">
                            <div className="flex justify-center items-center">
                                <img src={item.image} alt={item.brand} className="h-32 object-cover rounded-t-xl transition transform duration-300 group-hover:scale-110" />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-black bg-opacity-50 transition-opacity duration-300 group-hover:opacity-100">
                                <button className="text-white border-y-2 py-2 w-[70%]">Details</button>
                            </div>
                        </div>

                    ))
                }
            </div>
        </>
    );
};

export default Features;
