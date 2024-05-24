import parallaxBg from "../../assets/images/parallax.jpg"

const Parallax = () => {
    return (
        <div className="h-[800px] bg-center bg-cover bg-fixed relative" style={{ backgroundImage: `url(${parallaxBg})` }}>
            <div className="absolute inset-0 flex justify-center items-center text-white bg-black bg-opacity-40">
                <div className="text-center w-2/3 ">
                    <h1 className="mb-6 text-xl md:text-3xl lg:text-4xl font-bold leading-tight">T-Shirts Speak Louder Than Words</h1>
                    <p className="text-sm md:text-lg lg:text-xl leading-relaxed">T-shirts are not just pieces of fabric, they are statements waiting to be made. Each design, each graphic, carries a message—a reflection of your personality, your beliefs, your passions. From witty one-liners to powerful slogans, your t-shirt can be the voice of your inner thoughts, boldly expressed for the world to see. So, choose wisely, wear proudly, and let your t-shirt do the talking.</p>
                </div>
            </div>
        </div>

    );
};

export default Parallax;