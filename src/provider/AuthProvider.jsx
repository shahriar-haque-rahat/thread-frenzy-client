import { createContext, useEffect, useState } from "react";
import auth from "../../firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";


export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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
        return signOut(auth)
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
                .then(() => {
                    setLoading(false);
                })
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
            photoUrl };
        console.log(userInfo);
        dispatch(addUser(userInfo))
            .catch((error) => {
                console.error("Error saving user to database: ", error);
            });
    };


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unSubscribe();
        };
    }, []);

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
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;