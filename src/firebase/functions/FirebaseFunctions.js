import app, { firestore } from "../firebase";
import { collection, query, where, getDocs, addDoc, orderBy, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { v4 as uuid4 } from 'uuid';

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
        noteUid: uuid4(),
    })
}

async function addToFolders(folderName, uid) {
    if(await checkIfFolderExists(folderName))
        throw new Error('Folder already exists!');
    return await addDoc(collection(firestore, 'folders'), {
        folderName: folderName,
        userUid: uid,
        folderUid: uuid4(),
    })
}

async function checkIfFolderExists(folderName) {
    const q = query(collection(firestore, 'folders'), where('folderName', '==', folderName));
    const querySnapshot = await getDocs(q);
    if(querySnapshot.empty)
        return false;
    return true;
}

async function addToTasks(folderName, name, description, date, priority, finished = false, userUid, time = '') {
    return await addDoc(collection(firestore, 'tasks'), {
        folderName: folderName,
        taskUid: uuid4(),
        name: name,
        description: description,
        priority: priority,
        finished: finished,
        userUid: userUid,
        date: date,
        time: time,
    })
}

async function deleteTask(taskUid) {
    const q = query(collection(firestore, 'tasks'), where('taskUid', '==', taskUid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach( (doc) =>  {
        const docRef = doc.ref;
        deleteDoc(docRef);
    });
}

async function updateTask(folderName, name, description, date, priority, finished, taskUid, time) {
    const q = query(collection(firestore, 'tasks'), where('taskUid', '==', taskUid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach( (doc) =>  {
        const docRef = doc.ref;
        updateDoc(docRef, {
            folderName: folderName,
            name: name,
            description: description,
            priority: priority,
            finished: finished,
            date: date,
            time: time,
        });
    });
}

async function updateFinishedTask(finished, taskUid) {
    const q = query(collection(firestore, 'tasks'), where('taskUid', '==', taskUid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach( (doc) =>  {
        const docRef = doc.ref;
        updateDoc(docRef, {
            finished: finished,
        });
    });
}

async function deleteFolder(folderUid) {
    const q = query(collection(firestore, 'folders'), where('folderUid', '==', folderUid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach( (doc) =>  {
        const docRef = doc.ref;
        deleteDoc(docRef);
    });
    // const docRef = doc(firestore, 'folders', folderUid);
    // await deleteDoc(docRef);
}

async function deleteNote(noteUid) {
    const q = query(collection(firestore, 'notes'), where('noteUid', '==', noteUid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach( (doc) =>  {
        const docRef = doc.ref;
        deleteDoc(docRef);
    });
}

async function getFolders(uid) {
    const q = query(collection(firestore, 'folders'), where('userUid', '==', uid), orderBy('folderName'));
    const querySnapshot = await getDocs(q);
    let folders = [];
    querySnapshot.forEach(q => folders.push(q.data()))
    // const notesMap = querySnapshot.map(q => q.data());
    return folders;
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
    addToFolders,
    getFolders,
    addToTasks,
    deleteFolder,
    deleteNote,
    deleteTask,
    updateTask,
    updateFinishedTask,
}