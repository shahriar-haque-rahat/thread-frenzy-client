import { Helmet } from "react-helmet-async";


const SalesOverview = () => {
    return (
        <>
            <Helmet>
                <title>Sales Overview | Thread Frenzy</title>
            </Helmet>
            <div className="space-y-6">
                <h1 className="h-40 w-full text-5xl font-semibold pl-10 pt-6 text-white bg-black flex gap-4 items-center">Sales Overview</h1>

            </div>
        </>
    );
};

export default SalesOverview;