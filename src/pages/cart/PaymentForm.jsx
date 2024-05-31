import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useDispatch } from 'react-redux';
import { addPayment } from '../../redux/paymentSlice';

const PaymentForm = ({ totalPrice, shippingInfo, cartItems }) => {
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const axiosPrivate = useAxiosPrivate();
    const [clientSecret, setClientSecret] = useState('');


    useEffect(() => {
        axiosPrivate.post('/create-payment-intent', { price: totalPrice })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
    }, [axiosPrivate, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            console.log("Stripe or elements not loaded");
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            console.log("CardElement not found");
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log(error);
            setError(error.message)
        } else {
            console.log('payment method',paymentMethod);
            setError('')
        }

        const { paymentIntent, error: cardConfirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: shippingInfo?.firstName || '',
                    email: shippingInfo?.email || '',
                }
            }
        });

        if (cardConfirmError) {
            console.log(cardConfirmError);
        } else {
            console.log('payment intent',paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);

                const paymentInfo = {
                    email: shippingInfo?.email,
                    price: totalPrice,
                    date: new Date(),
                    cardId: cartItems?.map(item => item._id),
                    status: 'pending',
                }
                console.log(paymentInfo);
                dispatch(addPayment(paymentInfo));
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <CardElement
                    options={{
                        iconStyle: 'solid',
                        style: {
                            base: {
                                iconColor: '#c4f0ff',
                                color: '#32325d',
                                fontSize: '16px',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                iconColor: '#FFC7EE',
                                color: '#FFC7EE',
                            },
                        },
                    }}
                    onReady={() => {
                        console.log('CardElement [ready]');
                    }} />
            </div>
            <p className=' text-red-500'>{error}</p>
            <button disabled={!stripe || !clientSecret} type="submit" className=' disabled:bg-gray-400 bg-black px-2 text-white mt-4'>Pay</button>
        </form>
    );
};

export default PaymentForm;
