import { AnyAction } from "@reduxjs/toolkit"
import { Dispatch } from "react"
import { INote } from "./interface/Ijournal"
import { RootState } from '../store';
import { collection, doc, setDoc } from "firebase/firestore"
import { FirebaseDB } from "../../firebase/config"
import { addNewEmptyNote, creatingNewNote, noteUpdated, setActiveNote, setNotes } from "./journalSlice"
import { loadNotes } from "../../helpers/loadNotes"


export const startNewNote =() =>{
    return async( dispatch:Dispatch<AnyAction>, getState: () => RootState ) =>{
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

export const startLoadingNotes = () =>{
    return async(dispatch:Dispatch<AnyAction>,getState: () => RootState) =>{
        const {uid} = getState().auth;
        
        if(!uid) throw new Error('El UID del usuario no existe');

        const notes:INote[] = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const startSaveNote = () =>{
    return async(dispatch:Dispatch<AnyAction>,getState: () =>RootState)=>{
        const {uid} = getState().auth;
        const {active:activeNote} = getState().journal;

        const activeNoteNormalized ={...activeNote};
        delete activeNoteNormalized.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote?.id}`);
        await setDoc(docRef, activeNoteNormalized, {merge:true});

        if(!activeNote){
            return;
        }
        
        dispatch(noteUpdated(activeNote))
    }
}