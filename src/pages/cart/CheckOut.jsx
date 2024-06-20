import { useForm } from "react-hook-form";
import Payment from "./Payment";
import { useContext, useEffect, useState } from "react";
import ShippingInfo from "./ShippingInfo";
import { AuthContext } from "../../provider/AuthProvider";

const CheckOut = ({ totalPrice, cartItems, setIsCheckingOut }) => {
    const { userByEmail, userByEmailStatus, userByEmailError } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            address: '',
            email: '',
            phoneNumber: '',
        }
    });

    useEffect(() => {
        if (userByEmail) {
            reset({
                firstName: userByEmail.firstName || '',
                lastName: userByEmail.lastName || '',
                address: userByEmail.address || '',
                email: userByEmail.userEmail || '',
                phoneNumber: userByEmail.phoneNumber || '',
            });
        }
    }, [userByEmail, reset]);

    const [isPaying, setIsPaying] = useState(() => JSON.parse(localStorage.getItem('isPaying')) || false);
    const [shippingInfo, setShippingInfo] = useState(null);

    const handlePayment = () => {
        const watchedFields = watch();
        const allFieldsFilled = Object.values(watchedFields).every(value => value !== "");
        setIsPaying(allFieldsFilled);
    };

    useEffect(() => {
        if (userByEmailStatus === 'succeeded') {
            setShippingInfo(userByEmail);
        }
    }, [userByEmail, userByEmailStatus]);


    if (userByEmailStatus === 'failed') {
        return <div>Error: {userByEmailError}</div>;
    }

    return (
        <div className="space-y-10">
            {
                !isPaying &&
                <ShippingInfo
                    shippingInfo={shippingInfo}
                    setShippingInfo={setShippingInfo}
                    handlePayment={handlePayment}
                    register={register}
                    handleSubmit={handleSubmit}
                    errors={errors}
                />
            }
            {
                isPaying &&
                <Payment
                    setIsCheckingOut={setIsCheckingOut}
                    cartItems={cartItems}
                    totalPrice={totalPrice}
                    shippingInfo={shippingInfo}
                    setIsPaying={setIsPaying}
                />
            }
        </div>
    );
};

export default CheckOut;
