import React from 'react';
import { List, ListItem, ListItemText, Divider, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import FotoUsuario from "../../../logo.svg"

export const MenuIzquierda = ({classes}) => (
    <div className = {classes.list}>
        <List style={{background:"#0059b3"}}>
            <ListItem>
                <Avatar src={ FotoUsuario }/>
                <ListItemText primary="Orbis" style={{color:"white"}} />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem component={Link} button to="/usuario">
                <i className="material-icons">account_box</i>
                <ListItemText classes={{primary: classes.listItemText}} primary="Usuario" />
            </ListItem>
            <ListItem component={Link} button to="/promocion">
                <i className="material-icons">add_box</i>
                <ListItemText classes={{primary: classes.listItemText}} primary="Promoción" />
            </ListItem>
        </List>
      
    </div>
);