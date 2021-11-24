import React from 'react';
import { List,ListItem,Avatar,ListItemText } from '@mui/material';
import FotoUsuario from "../../../logo.svg"

export const MenuDerecha = ( { 
    classes,
    usuario,
    salirSesion
}) => (
    <div className={classes.list}>
        <List>
            <ListItem>
                <Avatar src={ usuario.username || FotoUsuario }/>
                <ListItemText classes={{primary : classes.listItemText}} primary={ usuario ? usuario.username : ""}/>
            </ListItem>
            <ListItem button onClick={salirSesion}>
                <ListItemText classes={{primary : classes.listItemText}} primary = "Salir"/>
            </ListItem>
        </List>
    </div>
);