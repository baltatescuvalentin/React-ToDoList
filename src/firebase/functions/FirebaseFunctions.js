import app, { firestore } from "../firebase";
import { collection, query, where, getDocs, getDoc, doc, setDoc, addDoc } from "firebase/firestore";


async function checkIfExistsInUsers(username, email) {
    const q = query(collection(firestore, 'users'), where('username', '==', username), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if(querySnapshot.empty)
        return false;
    return true;
}

async function addToUsers(username, email) {
    await addDoc(collection(firestore, 'users'), {
        username: username,
        email: email,
    });
}

async function addToNotes(note, uid) {
    await addDoc(collection(firestore, 'notes'), {
        note: note,
        userUid: uid,
    })
}

async function getNotes(uid) {
    const q = query(collection(firestore, 'notes'), where('userUid', '==', uid));
    const querySnapshot = await getDocs(q);
    let notes = [];
    querySnapshot.forEach(q => notes.push(q.data()))
    // const notesMap = querySnapshot.map(q => q.data());
    return notes;
}

async function findEmailWithUsername(username) {
    const q = query(collection(firestore, 'users'), where('username', '==', username));
    const querySnapshot = await getDocs(q);
    //console.log(querySnapshot.forEach(e => console.log(e.data().email)));
    //console.log(querySnapshot.docs[0].data().email);
    if(!querySnapshot.empty) {
        const email = querySnapshot.docs[0].data().email;
        return email;
    }
    return false;
}



export {
    checkIfExistsInUsers,
    addToUsers,
    findEmailWithUsername,
    addToNotes,
    getNotes,
}