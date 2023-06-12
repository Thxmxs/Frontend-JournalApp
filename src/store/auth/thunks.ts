import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { checkingCredentials, login, logout } from "./authSlice";
import { signInWithGoogle, registerWithEmailPassword, loginWithEmailPassword } from "../../firebase/providers";

export const checkingAuthentication = () => {
  return async (dispatch : Dispatch<AnyAction>) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () =>{
    return async (dispatch : Dispatch<AnyAction>) => {
        dispatch(checkingCredentials());
        const result = await signInWithGoogle();

        if(!result.ok) return dispatch(logout(result.errorMessage))
        dispatch(login({...result}))
      };
}

export const startCreatingWithEmailAndPassword = (email:string,password:string,displayName:string) =>{
  return async (dispatch : Dispatch<AnyAction>) => {
      dispatch(checkingCredentials());
      const resp = await registerWithEmailPassword(email,password,displayName);
      if(!resp?.ok){
        return dispatch(logout({errorMessage:resp?.errorMessage}))
      }
      dispatch(login({...resp}))
    };
}

export const startLoginWithEmailAndPassword = (email:string,password:string) =>{
  return async(dispatch:Dispatch<AnyAction>) =>{
    dispatch(checkingCredentials());
    const resp = await loginWithEmailPassword(email,password);
    if(!resp.ok){
      return dispatch(logout({errorMessage:resp.errorMessage}));
    }
    dispatch(login({...resp}))
  }
}