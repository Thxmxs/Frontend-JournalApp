import { Grid, Typography, Button, TextField } from '@mui/material';
import { SaveOutlined } from '@mui/icons-material';
import { ImageGallery } from '../components/ImageGallery';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/store';
import { useForm } from '../../hooks/useForm';
import { useMemo, useEffect } from 'react';
import { setActiveNote } from '../../store/journal/journalSlice';
import { startSaveNote } from '../../store/journal/thunks';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css'

export const NoteView = () => {

    const dispatch = useAppDispatch();
    const {active:activeNote, messageSaved, isSaving} = useSelector((state:RootState) =>state.journal);

    const {body, title, date, onInputChange, formState} = useForm(activeNote,null);

    const parseDateToString = useMemo(() =>{
        const newDate = new Date(date);
        return newDate.toUTCString()
    },[date]);

    useEffect(() => {
      dispatch(setActiveNote(formState))
    }, [formState])
    
    const onHandleSaveNote = ()=>{
        dispatch(startSaveNote());
    }
    useEffect(() => {
        if(messageSaved.length > 1){
            Swal.fire('Nota actualizada',messageSaved, 'success');
        }
    }, [messageSaved])
    

  return (
    <Grid
        container
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        sx={{mb:1}}
        className="animate__animated animate__fadeIn animate__faster"
    >
        <Grid item>
            <Typography
                fontSize={39}
                fontWeight={'light'}
            >
                {parseDateToString}
            </Typography>
        </Grid>

        <Grid item>
            <Button disabled={!!isSaving} color='primary' sx={{padding:2}} onClick={onHandleSaveNote}>
                <SaveOutlined sx={{fontSize:30,mr:1}}/>
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField
                type='text'
                variant='filled'
                fullWidth
                placeholder='Ingrese un titulo'
                label='titulo'
                sx={{border:'none', mb:1}}
                name="title"
                value={title}
                onChange={onInputChange}
            />
            <TextField
                type='text'
                variant='filled'
                fullWidth
                multiline
                placeholder='Que sucedio hoy?'
                sx={{border:'none', mb:1}}
                minRows={5}
                name="body"
                value={body}
                onChange={onInputChange}
            />
        </Grid>
        <ImageGallery/>
    </Grid>
  )
}
