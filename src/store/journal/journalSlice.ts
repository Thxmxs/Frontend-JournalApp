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
          state.notes?.push(payload);
          state.isSaving = false;
        },
        setActiveNote:(state, {payload}: PayloadAction<INote>) =>{
          state.active = payload;
          state.messageSaved = '';
        },
        setNotes:(state, {payload}: PayloadAction<INote[]>) =>{
          state.notes = payload;
        },
        setSaving:(state) =>{
          state.isSaving = true;
          state.messageSaved = '';
        },
        noteUpdated:(state, {payload}: PayloadAction<INote>) =>{
          state.isSaving = false;
          state.notes = state.notes.map(note =>{
            if(note.id === payload.id){
              return payload;
            }
            return note;
          });

          state.messageSaved = `${payload.title}, actualizada correctamente`;


        },
        deleteNoteById:(state, action) =>{
          
        }
     },
});

export const {addNewEmptyNote,setActiveNote,deleteNoteById,setNotes,setSaving,noteUpdated,creatingNewNote} = journalSlice.actions;