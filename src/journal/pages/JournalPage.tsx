import { JournalLayout } from "../layout/JournalLayout"
//import { NoteView } from "../views/NoteView";
import { NothingSelectedView } from "../views/NothingSelectedView";
import { IconButton } from '@mui/material';
import {  AddOutlined } from '@mui/icons-material';
import { RootState, useAppDispatch } from "../../store/store";
import { startNewNote } from "../../store/journal/thunks";
import { useSelector } from "react-redux";
import { NoteView } from "../views/NoteView";



export const JournalPage = () => {
    const {isSaving,active} = useSelector((state:RootState) =>(state.journal));
    const dispatch = useAppDispatch();

    const onHandleClickNewNote = () =>{
        dispatch(startNewNote());
    }

  return (
    <JournalLayout>
        <>
        {
            active 
            ? <NoteView/>
            : <NothingSelectedView/> 
        }

            <IconButton
                disabled={isSaving}
                onClick={onHandleClickNewNote}
                size="large"
                sx={{
                    color:'white',
                    backgroundColor:'error.main',
                    ':hover':{backgroundColor:'error.main', opaciti:0.9},
                    position:'fixed',
                    right:50,
                    bottom:50
                }}
            >
                <AddOutlined sx={{fontSize:30}}/>
            </IconButton>
        </>
    </JournalLayout>
  )
}
