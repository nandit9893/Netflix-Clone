import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth";
import { 
    addDoc,
    collection,
    getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyC9snbXKZL7DAdpvO8TbB7rqO0U5CztdY0",
  authDomain: "netflix-60e74.firebaseapp.com",
  projectId: "netflix-60e74",
  storageBucket: "netflix-60e74.appspot.com",
  messagingSenderId: "130208153140",
  appId: "1:130208153140:web:06c37cc889f2df88b15461"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password) =>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split("/")[1].split("-").join(" "));
    }
}


const logIn = async (email, password) =>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split("/")[1].split("-").join(" "));  //(error.code)
    }
}

const logOut = async () =>{
    signOut(auth);
}

export {auth, db, logIn, signUp, logOut};