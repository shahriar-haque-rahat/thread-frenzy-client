import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <div className=" p-5 lg:p-10 grid md:grid-cols-4 space-y-6 md:space-y-0 ">
            <div className=" hidden col-span-3 md:grid grid-rows-3">

                {/* lists for medium device */}
                <div className=" row-span-2 grid grid-cols-3 space-y-10 md:space-y-0">
                    <div>
                        <h1 className=" text-lg font-bold mb-3">Brands</h1>
                        <ul className=" space-y-2">
                            <li>Calvin Klein</li>
                            <li>Everlane</li>
                            <li>Adidas</li>
                            <li>Levis</li>
                            <li>Nike</li>
                            <li>Buck Mason</li>
                            <li>Allen Solly</li>
                            <li>Lacoste</li>
                        </ul>
                    </div>
                    <div>
                        <h1 className=" text-lg font-bold mb-3">About Us</h1>
                        <ul className=" space-y-2">
                            <li>About</li>
                            <li>Contact Us</li>
                            <li>Terms of Use</li>
                            <li>Terms and Conditions</li>
                            <li>Privacy Policy</li>
                            <li>Accessibility</li>
                        </ul>
                    </div>
                    <div>
                        <h1 className=" text-lg font-bold mb-3">Help</h1>
                        <ul className=" space-y-2">
                            <li>Support</li>
                            <li>Cancel Order</li>
                            <li>Delivery</li>
                            <li>Refund Policy</li>
                        </ul>
                    </div>
                </div>

                {/* copy right medium device */}
                <div className=" hidden md:flex gap-2 items-end">
                    <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className="fill-current"><path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path></svg>
                    <p>Copyright © 2024 <br /> All right reserved by Thread Frenzy</p>
                </div>
            </div>

            {/* follow us */}
            <div className=" space-y-10 text-center md:text-start">
                <div className=" space-y-2">
                    <h1 className=" text-2xl font-bold">Thread Frenzy</h1>
                    <p className=" text-lg font-medium">For T-shirt Lovers</p>
                </div>
                <div className=" space-y-2">
                    <p className=" text-xl font-bold">Follow Us</p>
                    <div className=" flex justify-center md:justify-start gap-2">
                        <a target="_blank" rel="noopener noreferrer" className="no-underline" href="https://www.facebook.com/lonelyplanet"><FaFacebookF /></a>
                        <a target="_blank" rel="noopener noreferrer" className="no-underline" href="https://www.instagram.com/lonelyplanet/"><FaInstagram/></a>
                        <a target="_blank" rel="noopener noreferrer" className="no-underline" href="https://www.twitter.com/lonelyplanet"><FaXTwitter /></a>
                        <a target="_blank" rel="noopener noreferrer" className="no-underline" href="https://www.youtube.com/lonelyplanet"><FaYoutube size={18}/></a>
                    </div>
                </div>
            </div>

            {/* lists for small device */}
            <div className=" md:hidden">
                <details className="collapse collapse-arrow border-y rounded-none">
                    <summary className="collapse-title  text-lg font-medium">Brands</summary>
                    <div className="collapse-content">
                        <ul className=" space-y-2">
                            <li>Calvin Klein</li>
                            <li>Everlane</li>
                            <li>Adidas</li>
                            <li>Levis</li>
                            <li>Nike</li>
                            <li>Buck Mason</li>
                            <li>Allen Solly</li>
                            <li>Lacoste</li>
                        </ul>
                    </div>
                </details>
                <details className="collapse collapse-arrow border-b rounded-none">
                    <summary className="collapse-title text-lg font-medium">About Us</summary>
                    <div className="collapse-content">
                        <ul className=" space-y-2">
                            <li>About</li>
                            <li>Contact Us</li>
                            <li>Terms of Use</li>
                            <li>Terms and Conditions</li>
                            <li>Privacy Policy</li>
                            <li>Accessibility</li>
                        </ul>
                    </div>
                </details>
                <details className="collapse collapse-arrow border-b rounded-none">
                    <summary className="collapse-title  text-lg font-medium">Help</summary>
                    <div className="collapse-content">
                        <ul className=" space-y-2">
                            <li>Support</li>
                            <li>Cancel Order</li>
                            <li>Delivery</li>
                            <li>Refund Policy</li>
                        </ul>
                    </div>
                </details>
            </div>

            {/* copy right small device */}
            <div className="md:hidden flex gap-2 items-center justify-center text-center">
                <p>Copyright © 2024 <br /> All right reserved by Thread Frenzy</p>
            </div>
        </div>
    );
};

export default Footer;