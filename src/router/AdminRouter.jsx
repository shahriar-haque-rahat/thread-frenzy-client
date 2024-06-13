import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const AdminRouter = ({ children }) => {
    const { userByEmail, loading } = useContext(AuthContext);
    const location = useLocation();

    if (userByEmail && userByEmail.role === 'admin') {
        return children;
    }
    else if (loading) {
        return <div className=" flex justify-center dark:text-white"><span className="loading loading-bars loading-lg"></span></div>
    }
    else {
        return <Navigate state={location.pathname} to={'/sign-in'}></Navigate>
    }
};

export default AdminRouter;