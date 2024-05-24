import Banner from "./Banner";
import Features from "./Features";
import Parallax from "./Parallax";
import Products from "./Products";
import Faq from "./Faq";
import Join from "./Join";



const Home = () => {
    return (
        <>
            <div>
                <Banner></Banner>
                <Features></Features>
                <Products></Products>
                <Parallax></Parallax>
                <Faq></Faq>
                <Join></Join>
            </div>
        </>
    );
};

export default Home;