import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type status = 'checking' | 'authenticated' | 'not-authenticated';

interface IAuthSlice{
    ok?:boolean
    status?:status,
    uid?: null |  undefined |string,
    email?: null | undefined | string,
    displayName?: null | undefined | string,
    photoURL?:null | undefined | string,
    errorMessage?:null | undefined | string
}
const initialState : IAuthSlice = {
    displayName:null,
    email:null,
    errorMessage:null,
    photoURL:null,
    status:'not-authenticated',
    uid:null
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: { 
        login: (state,  { payload }: PayloadAction<IAuthSlice>) =>{
            state.displayName=payload.displayName,
            state.email=payload.email,
            state.errorMessage=null,
            state.photoURL=payload.photoURL,
            state.status='authenticated',
            state.uid=payload.uid
        },
        logout: (state, {payload}: PayloadAction<IAuthSlice>) =>{
            state.displayName=null,
            state.email=null,
            state.errorMessage=payload.errorMessage,
            state.photoURL=null,
            state.status='not-authenticated',
            state.uid=null
        },
        checkingCredentials: (state) =>{
            state.status = 'checking';
        }
     },
});

export const {login, logout, checkingCredentials} = authSlice.actions;