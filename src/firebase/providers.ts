import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    const {displayName, email, photoURL, uid} = result.user;

    return {
        ok:true,
        displayName,
        email,
        photoURL,
        uid
    }

  } catch (error:any) {
    console.log(error);
    const errorMessage = error.message;
    return {
        ok:false,
        errorMessage
    }
  }
};


export const registerWithEmailPassword = async(email:string,password:string,displayName:string) =>{
    try {
        
        const {uid,photoURL} = (await createUserWithEmailAndPassword(FirebaseAuth,email,password)).user;
        //const {uid,photoURL} = resp.user;
        if(FirebaseAuth.currentUser){
            await updateProfile(FirebaseAuth.currentUser,{
                displayName
            });
        }
        return {
            ok:true,
            uid,
            photoURL,
            email,
            displayName
        }
    } catch (error: any) {
        return{
            ok:false,
            errorMessage:error.message
        }
    }
}

export const loginWithEmailPassword = async(email:string, password:string) =>{
    try {
        const {uid,photoURL,displayName} = (await signInWithEmailAndPassword(FirebaseAuth,email,password)).user;
        return {
            ok:true,
            uid,
            photoURL,
            email,
            password,
            displayName
        }
    } catch (error :any) {
        return{
            ok:false,
            errorMessage:error.message
        }
    }
}

export const logoutFirebase = async() =>{
    
    return await FirebaseAuth.signOut();

}