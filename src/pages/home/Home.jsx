import Banner from "./Banner";
import Features from "./Features";
import Parallax from "./Parallax";
import Products from "./Products";
import JoinNow from "./JoinNow";



const Home = () => {
    return (
        <>
            <div>
                <Banner></Banner>
                <Features></Features>
                <Products></Products>
                <Parallax></Parallax>
                <JoinNow></JoinNow>
            </div>
        </>
    );
};

export default Home;