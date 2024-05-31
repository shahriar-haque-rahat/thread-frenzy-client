import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

const Payment = ({ shippingInfo, setIsPaying, totalPrice, cartItems }) => {
    return (
        <div>
            <h1 className="text-3xl mb-10">Payment</h1>
            <div>
                <div className="flex justify-between items-start">
                    <p className="text-xl">Billing Address</p>
                    <button onClick={() => setIsPaying(false)} className="text-lg underline">Edit</button>
                </div>
                <div className="flex gap-2">
                    <p>{shippingInfo?.firstName}</p>
                    <p>{shippingInfo?.lastName}</p>
                </div>
                <p>{shippingInfo?.address}</p>
                <p>{shippingInfo?.phoneNumber}</p>
                <p>{shippingInfo?.email}</p>
            </div>
            <Elements stripe={stripePromise}>
                <PaymentForm totalPrice={totalPrice} shippingInfo={shippingInfo} cartItems={cartItems}/>
            </Elements>
        </div>
    );
};

export default Payment;
