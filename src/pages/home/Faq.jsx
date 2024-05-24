import { useLottie } from "lottie-react";
import faq from "../../json/faq.json"

const Faq = () => {
    const options = {
        animationData: faq,
        loop: true,
        style: { height: 400 }
    };

    const { View } = useLottie(options);

    return (
        <div className=" my-10 ">
            <h1 className=" text-3xl text-center font-bold mb-6">Thread Talks</h1>
            <div className=" grid grid-cols-1 md:grid-cols-2 justify-center items-center md:pr-[2%]">
                {View}
                <div className="join join-vertical w-full">
                    <div className="collapse collapse-arrow join-item border border-base-300">
                        <input type="radio" name="my-accordion-4" defaultChecked />
                        <div className="collapse-title text-xl font-medium">
                            What are your t-shirts made of?
                        </div>
                        <div className="collapse-content">
                            <p>Customers often want to know about the material of the t-shirts they are purchasing. Providing information about the fabric composition, such as cotton, polyester, or blends, can help them make informed decisions based on their preferences for comfort, durability, and sustainability.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow join-item border border-base-300">
                        <input type="radio" name="my-accordion-4" />
                        <div className="collapse-title text-xl font-medium">
                            How do I choose the right size?
                        </div>
                        <div className="collapse-content">
                            <p>Size is a crucial factor when buying clothing online. Create an FAQ that guides customers on how to select the correct size by providing a size chart with measurements for chest, waist, and length. You can also include tips such as considering the fit style (regular, slim, or oversized) and referring to customer reviews for insights on sizing accuracy.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow join-item border border-base-300">
                        <input type="radio" name="my-accordion-4" />
                        <div className="collapse-title text-xl font-medium">
                            Do you offer custom or personalized t-shirts?
                        </div>
                        <div className="collapse-content">
                            <p>Some customers may be interested in customizing their t-shirts with unique designs, text, or graphics. Clarify whether your website provides customization options and explain the process, including how customers can submit their designs, any limitations on customization, and additional costs or lead times associated with personalized orders.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;