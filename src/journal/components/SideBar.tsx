import { Box, Drawer, Toolbar, Typography, Divider, List, ListItem, ListItemButton, ListItemIcon, Grid, ListItemText } from '@mui/material';
import {TurnedInNot} from '@mui/icons-material';
interface props {
    drawerWidth:number
}

export const SideBar : React.FC<props> = ({drawerWidth = 240}) => {
  return (
    <Box
        component={'nav'}
        sx={{width:{sm:drawerWidth, flexShrink:{sm:0}}}}
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
                    Thomas C
                </Typography>
            </Toolbar>
            <Divider/>
            <List>
                {
                    ['enero','febrero'].map(el => (
                        <ListItem
                            key={el}
                            disablePadding
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <TurnedInNot/>
                                </ListItemIcon>
                                <Grid
                                    container
                                    direction={'column'}
                                >
                                    <ListItemText primary={el}/>
                                    <ListItemText secondary={'loerm ipsum'}/>
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
        </Drawer>
    </Box>
  )
}
