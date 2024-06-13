import Banner from "./Banner";
import Features from "./Features";
import Parallax from "./Parallax";
import Products from "./Products";
import Faq from "./Faq";
import Join from "./Join";
import { Helmet } from "react-helmet-async";


const Home = () => {
    return (
        <>
            <Helmet>
                <title>Home | Thread Frenzy</title>
            </Helmet>
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