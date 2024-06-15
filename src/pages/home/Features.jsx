import Adidas from "../../assets/images/brandLogo/Adidas.png"
import AllenSolly from "../../assets/images/brandLogo/Allen Solly.png"
import BuckMason from "../../assets/images/brandLogo/Buck Mason.png"
import CalvinKlein from "../../assets/images/brandLogo/Calvin Klein.png"
import Everlane from "../../assets/images/brandLogo/Everlane.png"
import Lacoste from "../../assets/images/brandLogo/Lacoste.png"
import Levis from "../../assets/images/brandLogo/Levis.png"
import Nike from "../../assets/images/brandLogo/Nike.png"

const Features = () => {
    return (
        <>
            <div className=" grid grid-cols-4 md:grid-cols-8 gap-4 justify-center items-center p-[5%] h-full bg-white">
                <img src={Lacoste} alt="Lacoste" />
                <img src={Adidas} alt="Adidas" />
                <img src={AllenSolly} alt="AllenSolly" />
                <img src={BuckMason} alt="BuckMason" />
                <img src={CalvinKlein} alt="CalvinKlein" />
                <img src={Everlane} alt="Everlane" />
                <img src={Nike} alt="Nike" />
                <img src={Levis} alt="Levis" />
            </div>
        </>
    );
};

export default Features;
