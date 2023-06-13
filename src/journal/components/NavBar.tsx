import { AppBar, Toolbar, IconButton, Grid, Typography } from '@mui/material';
import {MenuOutlined, LogoutOutlined} from '@mui/icons-material';
import { useAppDispatch } from '../../store/store';
import { startLogOut } from '../../store/auth/thunks';

interface props {
    drawerWidth:number
}

export const NavBar : React.FC<props> = ({drawerWidth=240}) => {
    const dispatch = useAppDispatch();
    const onLogout = () =>{
        dispatch(startLogOut());
    }

  return (
    <AppBar 
    position='fixed'
    sx={{
        width:{sm:`calc(100% - ${drawerWidth}px)`},
        ml:{sm:`${drawerWidth}px`}
        }}
    >
        <Toolbar>
            <IconButton
                color='inherit'
                edge='start'
                sx={{mr:2, display:{sm:'none'}}}
            >
                <MenuOutlined/>
            </IconButton>

            <Grid container direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Typography variant='h6' noWrap component={'div'}>JournalApp</Typography>

                <IconButton color='error' onClick={onLogout}>
                    <LogoutOutlined/>
                </IconButton>

            </Grid>
        </Toolbar>
    </AppBar>
  )
}
