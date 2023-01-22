import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updatePassword, updateProfile } from "firebase/auth";
import { useState, useEffect, createContext, useContext } from "react";
import { auth } from "../firebase/firebase";

import { addToUsers, checkIfExistsInUsers, findEmailWithUsername } from "../firebase/functions/FirebaseFunctions";


const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    async function signup(username, email, password, fullname) {

        if(await checkIfExistsInUsers(username, email))
            throw new Error('User already exists!');
        await createUserWithEmailAndPassword(auth, email, password);
        await addToUsers(username, email);
        return updateProfile(auth.currentUser, {
            displayName: fullname
        })
    }

    async function signin(username, password) {
        const email = await findEmailWithUsername(username);
        if(email === false) 
            throw new Error('Wrong username!');

        return signInWithEmailAndPassword(auth, email, password);
    }

    async function resetpassword(username, newPassword) {
        const email = await findEmailWithUsername(username);
        const user = auth.getUserByEmail(email);
        console.log(user);
        //return updatePassword(auth.currentUser, newPassword)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user) {
                setCurrentUser(user);
            }
            else {
                setCurrentUser();
            }
        })

        return () => unsubscribe();
    }, []);

    const value = {
        currentUser,
        signup,
        signin,
        resetpassword,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}