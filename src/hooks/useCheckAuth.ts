import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth/authSlice";
import { startLoadingNotes } from "../store/journal/thunks";


export const useCheckAuth = () => {
    const { status } = useSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      onAuthStateChanged(FirebaseAuth, async (user) => {
        if (!user)
          return dispatch(logout({ errorMessage: null }));
        console.log({});
        dispatch(login({displayName:user.displayName,email:user.displayName,ok:true,photoURL:user.photoURL,uid:user.uid}));
        dispatch(startLoadingNotes());
      });
    }, []);

    return {status}
}
