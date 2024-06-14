import { createContext, useEffect, useState } from "react";
import auth from "../../firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, updateProfile } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { addUser, getUserByEmail, resetUserState } from "../redux/userSlice";
import { resetDataState } from "../redux/dataSlice";
import { resetMessageState } from "../redux/messageSlice";
import { resetPaymentState } from "../redux/paymentSlice";
import { resetReviewState } from "../redux/reviewSlice";
import { resetWishlistState } from "../redux/wishlistSlice";
import { resetCartState } from "../redux/cartSlice";
import { resetBanUserState } from "../redux/banUserSlice";


export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
    const axiosPublic = useAxiosPublic();
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { userByEmail, userByEmailStatus, userByEmailError } = useSelector(state => state.user);


    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider)
    }
    const githubSignIn = () => {
        return signInWithPopup(auth, githubProvider)
    }

    const userSignUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const userSignIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const userSignOut = () => {
        return signOut(auth).then(() => {
            setLoading(false);
            dispatch(resetUserState());
            dispatch(resetDataState());
            dispatch(resetMessageState());
            dispatch(resetPaymentState());
            dispatch(resetReviewState());
            dispatch(resetWishlistState());
            dispatch(resetCartState());
            dispatch(resetBanUserState());
            setUser(null);
            document.cookie = 'jwt=; Max-Age=0; path=/;';
        });
    }

    const updateUserProfile = (name, photoUrl) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoUrl
        }).then(() => {
            userDatabaseEntry(name, auth.currentUser.email, photoUrl)

            setUser(currentUser => ({
                ...currentUser,
                displayName: name,
                photoURL: photoUrl,
                email: auth.currentUser.email,
            }))
            // .then(() => {
            //     setLoading(false);
            // })
        }).catch(error => {
            console.log("Error updating profile: ", error);
        });
    }

    const userDatabaseEntry = (firstName, userEmail, photoUrl) => {
        const userInfo = {
            firstName,
            lastName: null,
            address: null,
            userEmail,
            photoUrl,
            role: 'user',
            status: 'active',
        };
        console.log(userInfo);
        dispatch(addUser(userInfo))
            .catch((error) => {
                console.error("Error saving user to database: ", error);
            });
    };


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            // setLoading(false);

            try {
                const response = await axiosPublic.post('/jwt', { email: currentUser.email }, { withCredentials: true });
                if (response.data.success) {
                    dispatch(getUserByEmail(currentUser.email))
                        .then(() => {
                            setLoading(false);
                        })
                }
            } catch (error) {
                console.log('Error fetching user data: ', error);
            }
        });
        return () => {
            unSubscribe();
        };
    }, [dispatch, axiosPublic]);

    // useEffect(() => {
    //     if (user) {
    //         dispatch(getUserByEmail(user?.email))
    //             .then(() => {
    //                 setLoading(false);
    //             })
    //     }
    // }, [dispatch, user]);



    const authInfo = {
        user,
        loading,
        updateUserProfile,
        setLoading,
        googleSignIn,
        githubSignIn,
        userSignUp,
        userSignIn,
        userSignOut,
        userDatabaseEntry,
        userByEmail,
        userByEmailStatus,
        userByEmailError,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;