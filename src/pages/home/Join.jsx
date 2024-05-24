import joinNow from "../../assets/images/joinNow.jpg"

const Join = () => {
    return (
        <div className="h-[550px] bg-cover bg-center relative" style={{ backgroundImage: `url(${joinNow})` }}>
            <div className=" absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white">
                <h1 className="text-3xl font-bold">Thread Frenzy</h1>
                <p className="text-sm mb-6">Where style meets substance</p>
                <p className="text-lg">Dive into the world of fashion with our exclusive updates.</p>
                <p className="text-lg mb-6">Sign up now and stay ahead of the curve.</p>
                <button className=" border w-96 py-1 hover:bg-black">Sign Up Now</button>
            </div>
        </div>

    );
};

export default Join;