import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, TextField, Typography, Link, Alert } from "@mui/material";
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useMemo, useState } from 'react';
import { RootState, useAppDispatch } from '../../store/store';
import { startCreatingWithEmailAndPassword } from '../../store/auth/thunks';
import { useSelector } from 'react-redux';

const formData ={
  email:'',
  password:'',
  displayName:''
}

const formValidations = {
  email:[ (value:string[]) => !value.includes('@'),' el correo no es valido'],
  password:[ (value:string) => value.length < 6 ,' la clave debe ser mayor a 6 caracteres'],
  displayName:[ (value:string) => value.length < 1 ,' el nombre es obligatorio']
}

export const RegisterPage = () => {

  const {status, errorMessage} = useSelector((state: RootState) => state.auth);

  const dispatch = useAppDispatch();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const {email, password, onInputChange, displayName,displayNameValid,passwordValid,emailValid,isFormValid} = useForm(formData,formValidations);

  const isCheckingAuthentication = useMemo(()=>{
    return status === 'checking'
  },[status])

  const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setFormSubmitted(true);

    if(!isFormValid) return;

    dispatch(startCreatingWithEmailAndPassword(email,password,displayName));
  }

  return (
    <AuthLayout title='Registrarse'>
        <form onSubmit={onHandleSubmit} className="animate__animated animate__fadeIn animate__faster">
          <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField
                  label="Nombre completo"
                  type="text"
                  placeholder="Jhon doe"
                  fullWidth
                  autoComplete="false"
                  name='displayName'
                  error={!!displayNameValid && formSubmitted}
                  helperText={displayNameValid && formSubmitted}
                  value={displayName}
                  onChange={onInputChange}
                />
              </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
                
              <TextField
                label="Correo"
                type="email"
                placeholder="Correo electronico"
                fullWidth
                autoComplete="false"
                name='email'
                value={email}
                onChange={onInputChange}
                error={!!emailValid && formSubmitted}
                helperText={emailValid && formSubmitted}
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Contraseña"
                type="password"
                placeholder="Contraseña"
                fullWidth
                autoComplete="false"
                name='password'
                value={password}
                onChange={onInputChange}
                error={!!passwordValid && formSubmitted}
                helperText={passwordValid && formSubmitted}
              />
            </Grid>

            <Grid container spacing={2} sx={{ mb: 2 , mt:1}}>
              
            <Grid display={!!errorMessage ? '' : 'none'} item xs={12}>
                <Alert severity='error'>
                  {errorMessage}
                </Alert>
              </Grid>
              <Grid item xs={12}>
                <Button disabled={isCheckingAuthentication} variant="contained" fullWidth type='submit'>
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction={'row'} justifyContent={'end'}>
            <Typography sx={{mr:1}}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to="/auth/login">
                Ingresar
            </Link>
          </Grid>
        </form>
    </AuthLayout>
  )
}
