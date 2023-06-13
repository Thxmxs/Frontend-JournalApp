import { Box, Toolbar } from '@mui/material';
import React from 'react'
import { NavBar } from '../components/NavBar'
import { SideBar } from '../components/SideBar';

interface props {
    children:React.ReactElement
}

const drawerWidth =240;

export const JournalLayout : React.FC<props> = ({children}) => {
  return (
    <Box sx={{display:'flex'}} className="animate__animated animate__fadeIn animate__faster">
        <NavBar drawerWidth={drawerWidth}/>
        <SideBar drawerWidth={drawerWidth}/>
        <Box component={'main'}
            sx={{flexGrow:1,p:3}}
        >
            <Toolbar/>
            {children}
        </Box>
    </Box>
  )
}
