import User from "./userComponents/User"
import Admin from "./adminComponents/Admin"
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import { getUserByEmail } from "../../redux/userSlice";
import { AuthContext } from "../../provider/AuthProvider";

const Profile = () => {
    const dispatch = useDispatch();
    const { user } = useContext(AuthContext);
    const { userByEmail, userByEmailStatus, userByEmailError } = useSelector(state => state.user)

    useEffect(() => {
        if (user) {
            dispatch(getUserByEmail(user?.email))
        }
    }, [dispatch, user])

    if (userByEmailStatus === 'failed') {
        return <div>Error: {userByEmailError}</div>;
    }

    return (
        <div>
            {
                (userByEmail.role === 'admin')
                ? <Admin userByEmail={userByEmail} getUserByEmail={getUserByEmail} userEmail={user?.email} dispatchFunc={getUserByEmail(user?.email)}></Admin>
                : <User userByEmail={userByEmail} getUserByEmail={getUserByEmail} userEmail={user?.email}></User>
            }
        </div>
    );
};

export default Profile;