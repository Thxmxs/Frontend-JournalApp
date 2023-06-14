import { TurnedInNot } from '@mui/icons-material'
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Grid } from '@mui/material';
import React from 'react'
import { INote } from '../../store/journal/interface/Ijournal';
import { useMemo } from 'react';

import { useAppDispatch } from '../../store/store';
import { setActiveNote } from '../../store/journal/journalSlice';

interface props{
    note:INote
}

export const SideBarItem : React.FC<props> = ({note}) => {
    const dispatch = useAppDispatch();
    const newTitle = useMemo(() =>{
        return note.title.length > 17
        ? note.title.substring(0,17) + '...'
        : note.title
    },[note.title])

    const onHandleActiveNote = () =>{
        dispatch(setActiveNote(note))
    }

  return (
    <ListItem
    key={note.id}
    disablePadding
    onClick={onHandleActiveNote}
    >
    <ListItemButton>
        <ListItemIcon>
            <TurnedInNot/>
        </ListItemIcon>
        <Grid
            container
            direction={'column'}
        >
            <ListItemText primary={newTitle}/>
            <ListItemText secondary={note.body}/>
        </Grid>
    </ListItemButton>
</ListItem>
)
}
