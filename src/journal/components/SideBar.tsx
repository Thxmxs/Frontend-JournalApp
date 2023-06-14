import { Box, Drawer, Toolbar, Typography, Divider, List, ListItem, ListItemButton, ListItemIcon, Grid, ListItemText } from '@mui/material';
import {TurnedInNot} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/store';
import { SideBarItem } from './SideBarItem';
interface props {
    drawerWidth:number
}

export const SideBar : React.FC<props> = ({drawerWidth = 240}) => {

const {displayName} = useSelector((state: RootState) =>( state.auth));
const { notes } = useSelector((state: RootState) =>( state.journal))

  return (
    <Box
        component={'nav'}
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
        <Drawer
            variant='permanent'
            open
            sx={{
                display:{xs:'block'},
                '& .MuiDrawer-paper':{boxSizing:'border-box', width:drawerWidth}
            }}
        >
            <Toolbar>
                <Typography
                    variant='h6'
                    noWrap
                    component={'div'}
                >
                    { displayName }
                </Typography>
            </Toolbar>
            <Divider/>
            <List>
                {
                    notes.map(note => (
                        <SideBarItem note={note} key={note.id}/>
                    ))
                }
            </List>
        </Drawer>
    </Box>
  )
}
