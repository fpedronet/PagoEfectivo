import React, { useState } from "react";
import {
    Toolbar,
    IconButton,
    Typography,
    Button,
    Avatar,
    Drawer,
  } from '@mui/material';
import { makeStyles } from '@mui/styles';
import FotoUsuario from "../../../logo.svg"
import {useStateValue} from "../../../context/store";
import { MenuIzquierda } from "./menuIzquierda";
import {MenuDerecha} from './menuDerecha';
import { withRouter } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
    seccionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    seccionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    grow: {
      flexGrow: 1,
    },
    avatarSize: {
      width: 40,
      height: 40,
    },
    list: {
      width: 250,
    },
    listItemText: {
      fontSize: "14px",
      fontWeight: 600,
      paddingLeft: "15px",
      color: "#212121",
    },
  }));

const BarSesion = (props) => {

    const classes = useStyle();
    const [{sesionUsuario}, dispatch] = useStateValue();
    const [abrirMenuIzquierda, setAbrirMenuIzquierda] = useState(false);
    const [abrirMenuDerecha, setAbrirMenuDerecha] = useState(false);

    const cerrarMenuIzquierda = () => {
        setAbrirMenuIzquierda(false);
      };
    
      const abrirMenuIzquierdaAction = () => {
        setAbrirMenuIzquierda(true);
      };

      const cerrarMenuDerecha = () => {
        setAbrirMenuDerecha(false);
      };

      const salirSesionApp = () => {       
        localStorage.removeItem("token_seguridad");
    
        dispatch({
           type : "SALIR_SESION",
           nuevoUsuario : null,
           autenticado : false
        })
    
        props.history.push("/auth/login");
      };
    
      const abrirMenuDerechaAction = () => {
        setAbrirMenuDerecha(true);
      }

    return (
        <React.Fragment>

            <Drawer
                open={abrirMenuIzquierda}
                onClose={cerrarMenuIzquierda}
                anchor="left"
            >
                <div
                className={classes.list}
                onKeyDown={cerrarMenuIzquierda}
                onClick={cerrarMenuIzquierda}
                >
                <MenuIzquierda classes={classes} />
                </div>
            </Drawer>

            <Drawer
                open={abrirMenuDerecha}
                onClose={cerrarMenuDerecha}
                anchor="right"
            >
                <div
                className={classes.list}
                onClick={cerrarMenuDerecha}
                onKeyDown={cerrarMenuDerecha}
                >
                <MenuDerecha 
                    classes={classes} 
                    salirSesion={salirSesionApp} 
                    usuario = { sesionUsuario ? sesionUsuario.usuario : null}
                    />
                </div>
            </Drawer>

            <Toolbar>
                <IconButton color="inherit" onClick={abrirMenuIzquierdaAction}>
                <i className="material-icons">menu</i>
                </IconButton>

                <Typography variant="h6">Pago Efectivo</Typography>
                <div className={classes.grow}></div>

                <div className={classes.seccionDesktop}>
                <Button color="inherit" onClick={salirSesionApp}>Salir</Button>
                <Button color="inherit">
                    {sesionUsuario ? sesionUsuario.usuario.username : ""}
                </Button>
                <Avatar src={FotoUsuario}></Avatar>
                </div>

                <div className={classes.seccionMobile}>
                <IconButton color="inherit" onClick={abrirMenuDerechaAction}>
                    <i className="material-icons">more_vert</i>
                </IconButton>
                </div>
            </Toolbar>
        </React.Fragment>       
    );
}

export default withRouter(BarSesion);