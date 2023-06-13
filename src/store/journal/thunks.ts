import { AnyAction } from "@reduxjs/toolkit"
import { Dispatch } from "react"
import { INote } from "./interface/Ijournal"
import { RootState } from "../store"
import { collection, doc, setDoc } from "firebase/firestore"
import { FirebaseDB } from "../../firebase/config"
import { addNewEmptyNote, creatingNewNote, setActiveNote } from "./journalSlice"


export const startNewNote =() =>{
    return async( dispatch:Dispatch<AnyAction>, getState:() => RootState ) =>{
        dispatch(creatingNewNote())
        console.log("Start new note");
        const {uid} = getState().auth;
        const newNote : INote = {
            body:"",
            date:new Date().getTime(),
            imageUrls:[],
            title:''
        }

        const newDoc = doc(collection(FirebaseDB,`${uid}/journal/notes`))
        await setDoc(newDoc,newNote);

        newNote.id = newDoc.id;
        console.log("NewNote: "+newNote)
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    }
}