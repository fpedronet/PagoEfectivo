import { Avatar, Button, Container, TextField, Typography } from '@mui/material';
import style from "../../tools/Style";
import { useState } from "react";
import {postLogin} from '../../Services/SeguridadService';
import { withRouter } from 'react-router-dom';
import { useStateValue } from "../../context/store";
import { LockClockOutlined } from '@mui/icons-material';

const FormLogin =(props)=>{
    const [{sesionUsuario}, dispatch] = useStateValue();

    const [model, setModel] = useState({
        UserName:'',
        Password:''
    });

    const modelMemoria = e => {
        const {name, value} = e.target;
        setModel(anterior=>({
            ...anterior,
            [name]:value
        }));
    }

    const btnLogin = e =>{
        e.preventDefault();
        dispatch({type : "OPEN_BACKDROP", open : true}) 
        postLogin(model, dispatch).then(response =>{   
           dispatch({type : "OPEN_BACKDROP", open : false}) 
           if(response.status === 200) {
                window.localStorage.setItem('token_seguridad', response.data.token);
                props.history.push("/");
            }else{
                dispatch({
                    type : "OPEN_SNACKBAR",
                    openMensaje : {
                        open : true,
                        mensaje : "Las credenciales son incorrectas",
                        tipoRespuesta: 2
                    }
                })
            }           
        });
    }

    return(
        <Container maxWidth="xs">
            <div style={style.paper}>
                <Avatar style={style.avatar}>
                    <LockClockOutlined style={style.icon} />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login Usuario
                </Typography>
                <form style={style.form}>
                    <TextField name="UserName" value={model.UserName} onChange={modelMemoria} variant="outlined" fullWidth label="Usuario" margin="normal" />
                    <TextField name="Password" value={model.Password} onChange={modelMemoria} type="password" variant="outlined" fullWidth label="Contraseña" margin="normal" />
                    <Button type="submit" onClick={btnLogin} variant="contained" fullWidth color="primary" style={style.submit}>Ingresar</Button>
                </form>
            </div>
        </Container>
    )
};

export default withRouter(FormLogin);