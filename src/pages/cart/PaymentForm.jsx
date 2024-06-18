import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useDispatch } from 'react-redux';
import { addPayment } from '../../redux/paymentSlice';
import { deleteManyCartItem, getCart } from '../../redux/cartSlice';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const MySwal = withReactContent(Swal)

const PaymentForm = ({ totalPrice, shippingInfo, cartItems, setIsCheckingOut }) => {
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const axiosPrivate = useAxiosPrivate();
    const [clientSecret, setClientSecret] = useState('');
    const paidItemsId = cartItems?.map(item => item._id);


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
            console.log('payment method', paymentMethod);
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
            console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);

                const paymentInfo = {
                    email: shippingInfo?.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    orderedItems: cartItems,
                    status: 'pending',
                }
                console.log(paymentInfo);

                dispatch(addPayment(paymentInfo))
                    .then(() => {
                        MySwal.fire({
                            title: '<p className="text-3xl font-bold mb-4">Payment Successful</p>',
                            html: (
                                '<div className="text-lg">' +
                                `Transaction ID: ${paymentIntent.id}` +
                                '<p>Thank you for purchasing from Thread Frenzy</p>' +
                                '</div>'
                            ),
                            icon: 'success',
                            confirmButtonColor: 'black',
                            confirmButtonText: 'Keep Shopping',
                            customClass: {
                                popup: 'square',
                                confirmButton: 'square'
                            }
                        })

                        // delete from cart
                        dispatch(deleteManyCartItem(paidItemsId))
                            .then(() => {
                                dispatch(getCart(shippingInfo.email))
                                    .then(() => {
                                        setIsCheckingOut(false);
                                    })
                            })
                    })
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='pt-10'>
                <div className=' py-4 px-2 border border-gray-400'>
                    <CardElement
                        options={{
                            iconStyle: 'solid',
                            style: {
                                base: {
                                    iconColor: '#c4f0ff',
                                    color: '#aab7c4',
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
                <button disabled={!stripe || !clientSecret} type="submit" className=' disabled:bg-gray-400 bg-black w-full py-1 text-lg font-semibold text-white mt-1'>Confirm Payment</button>
            </div>
        </form>
    );
};

export default PaymentForm;
