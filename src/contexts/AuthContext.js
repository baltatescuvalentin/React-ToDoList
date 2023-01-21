import { useState, useEffect, createContext, useContext } from "react";
import { auth } from "../firebase/firebase";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    async function signup(username, email, password, fullname) {
        await auth.createUserWithEmailAndPassword(email, password);
        return auth.currentUser.updateProfile({
            fullname: fullname,
            username: username,
        })
    }

    function signin(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        })

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signup,
        signin,

    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}