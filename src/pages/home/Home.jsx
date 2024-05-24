import Banner from "./Banner";
import Features from "./Features";
import Parallax from "./Parallax";
import Products from "./Products";



const Home = () => {
    return (
        <>
            <div>
                <Banner></Banner>
                <Features></Features>
                <Products></Products>
                <Parallax></Parallax>
            </div>
        </>
    );
};

export default Home;