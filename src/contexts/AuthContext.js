import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updatePassword, updateProfile } from "firebase/auth";
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
        return await updateProfile(auth.currentUser, {
            displayName: fullname
        })
    }

    async function signin(username, password) {
        const email = await findEmailWithUsername(username);
        if(email === false) 
            throw new Error('Wrong username!');

        return await signInWithEmailAndPassword(auth, email, password);
    }

    async function resetpassword(username, newPassword) {
        const email = await findEmailWithUsername(username);
        const user = currentUser;
        console.log(user);
        return await updatePassword(user, newPassword);
        // return await signInWithEmailAndPassword(auth, email, newPassword);
    }

    async function signout() {
        return await signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user) {
                setLoading(false);
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
        signout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}