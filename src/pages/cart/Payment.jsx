


const Payment = ({ shippingInfo, setIsPaying }) => {
    return (
        <div>
            <h1 className=" text-3xl mb-10">Payment</h1>
            <div>
                <div className=" flex justify-between items-start">
                    <p className=" text-xl">Billing Address</p>
                    <button onClick={()=>setIsPaying(false)} className=" text-lg underline">Edit</button>
                </div>
                <div className=" flex gap-2">
                    <p>{shippingInfo?.firstName}</p>
                    <p>{shippingInfo?.lastName}</p>
                </div>
                <p>{shippingInfo?.address}</p>
                <p>{shippingInfo?.phoneNumber}</p>
                <p>{shippingInfo?.email}</p>
            </div>
        </div>
    );
};

export default Payment;