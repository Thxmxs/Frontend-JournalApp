import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { INote } from './interface/Ijournal';


interface IinitialState{
    isSaving:boolean,
    messageSaved:string,
    notes:INote[],
    active:INote | undefined
}

const initialState :IinitialState = {
    isSaving:false,
    messageSaved:'',
    notes:[],
    active:undefined
}

export const journalSlice = createSlice({
    name: 'journal',
    initialState,
    reducers: {
        creatingNewNote:(state)=>{
            state.isSaving = true;
        },
        addNewEmptyNote:(state, {payload}: PayloadAction<INote>) =>{
            console.log(payload);
          state.notes?.push(payload);
          state.isSaving = false;
        },
        setActiveNote:(state, {payload}: PayloadAction<INote>) =>{
          state.active = payload;
        },
        setNotes:(state, action) =>{
          
        },
        setSaving:(state) =>{
          
        },
        updateNote:(state, action) =>{
          
        },
        deleteNoteById:(state, action) =>{
          
        }
     },
});

export const {addNewEmptyNote,setActiveNote,deleteNoteById,setNotes,setSaving,updateNote,creatingNewNote} = journalSlice.actions;