import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, TextField, Typography, Link } from "@mui/material";
import { AuthLayout } from '../layout/AuthLayout';

export const RegisterPage = () => {
  return (
    <AuthLayout title='Registrarse'>
        <form>
          <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
                
                <TextField
                  label="Nombre completo"
                  type="text"
                  placeholder="Jhon doe"
                  fullWidth
                  autoComplete="false"
                />
              </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
                
              <TextField
                label="Correo"
                type="email"
                placeholder="Correo electronico"
                fullWidth
                autoComplete="false"
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Contraseña"
                type="password"
                placeholder="Contraseña"
                fullWidth
                autoComplete="false"
              />
            </Grid>

            <Grid container spacing={2} sx={{ mb: 2 , mt:1}}>
              <Grid item xs={12}>
                <Button variant="contained" fullWidth>
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction={'row'} justifyContent={'end'}>
            <Link component={RouterLink} color='inherit' to="/auth/register">
                Crear una cuenta
            </Link>
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
