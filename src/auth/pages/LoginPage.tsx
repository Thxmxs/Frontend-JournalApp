import { Link as RouterLink } from 'react-router-dom';
import { Google } from "@mui/icons-material";
import { Button, Grid, TextField, Typography, Link } from "@mui/material";
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { startGoogleSignIn, startLoginWithEmailAndPassword } from '../../store/auth/thunks';
import { RootState, useAppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

const formValidations = {
  email:[ (value:string[]) => value.includes('@'),' el correo no es valido'],
  password:[ (value:string) => value.length >= 6 ,' la clave debe ser mayor a 6 caracteres']
}

export const LoginPage = () => {

  const {status} = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  const {email, password, onInputChange} = useForm({
    email:'thomas.c.arcos@gmail.com',
    password:'123456'
  },formValidations);

  const isAuthenticating = useMemo(() =>status === 'checking',[status])

  const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

    console.log({email,password})
    dispatch(startLoginWithEmailAndPassword(email,password));
  }

  const onHandleGoogleSignIn= () =>{
   console.log('google');
   dispatch(startGoogleSignIn());
  }

  return (
    <AuthLayout title='Login'>
        <form onSubmit={onHandleSubmit}>
          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Correo"
                type="email"
                placeholder="Correo electronico"
                fullWidth
                autoComplete="false"
                name='email'
                onChange={onInputChange}
                value={email}
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
                onChange={onInputChange}
                value={password}
              />
            </Grid>

            <Grid container spacing={2} sx={{ mb: 2 , mt:1}}>
              <Grid item xs={12} sm={6}>
                <Button disabled={isAuthenticating} variant="contained" fullWidth type='submit'>
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button disabled={isAuthenticating} variant="contained" fullWidth onClick={onHandleGoogleSignIn}>
                  <Google>
                    <Typography sx={{ml:1}}>Google</Typography>
                  </Google>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction={'row'} justifyContent={'end'}>
            <Link component={RouterLink} color='inherit' to="/auth/register">
                Crear una cuenta
            </Link>
          </Grid>
        </form>
    </AuthLayout>
  );
};
