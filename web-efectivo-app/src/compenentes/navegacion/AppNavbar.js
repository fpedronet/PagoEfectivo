import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import BarSesion from "./bar/BarSesion";
import { useStateValue } from '../../context/store';
import { Redirect } from "react-router-dom";

const AppNavbar = () => {

  const [{sesionUsuario} , dispatch] = useStateValue();

  return sesionUsuario 
    ? (sesionUsuario.autenticado == true ? 
        <div>
          <AppBar position="fixed" style={{boxShadow:"none"}}>
            <BarSesion />
          </AppBar> 
        </div>       
         : 
         <Redirect to="/auth/login" /> )
    : <Redirect to="/auth/login" />
};

export default AppNavbar;