import {useEffect,useState} from 'react';
import {Container, Grid, TextField, Paper, BottomNavigation, BottomNavigationAction, Divider} from '@mui/material';
import { SaveOutlined, ArrowBackOutlined, AddCircleOutline} from '@mui/icons-material';
import style from "../../tools/Style";
import { useStateValue } from '../../context/store';
import { useParams, useHistory } from 'react-router-dom';

import { postGuardarUsuario} from "../../Services/SeguridadService";
import { getObtenerUsuario} from "../../Services/SeguridadService";
import { Box } from '@mui/system';

const FormCrearUsuario = () =>{
    let history = useHistory();
    const [{sesionUsuario}, dispatch]  = useStateValue();
    const {id} = useParams();

    const [model, setModel] = useState({
        id:'',
        idUser:'',
        name:'',
        firstName:'',
        lastName:'',
        email:'',
        phoneNumber:'',
        userName:'',
        password:''
    });

    const modelMemoria = e =>{
        const {name, value} = e.target;
        setModel(anterior=>({
            ...anterior,
            [name]:value
        }));
    }
    
    const btnGuardar = e =>{
        e.preventDefault();
        dispatch({type : "OPEN_BACKDROP", open : true}) 
        postGuardarUsuario(model).then(response =>{   
            dispatch({type : "OPEN_BACKDROP", open : false})           
            if(response.status === 200) {
                btnRegresar();
            }
            dispatch({
                    type : "OPEN_SNACKBAR",
                    openMensaje : {
                        open : true,
                        mensaje : response.data.mensaje,
                        tipoRespuesta:response.data.tipoRespuesta
                    }
                })
        });
    }

    const btnObtener =()=>{ 
        if(id!=undefined){
            model.key= (id==undefined)? "": id;
            getObtenerUsuario(model).then(response =>{            
                if(response.status === 200) {
                    setModel(response.data);
                }else{
                    dispatch({
                        type : "OPEN_SNACKBAR",
                        openMensaje : {
                            open : true,
                            mensaje : "Hubo un problema en el sistema web",
                            tipoRespuesta: 0
                        }
                    })
                }            
            });
        }         
    }

    const btnRegresar =()=>{
        history.push("/usuario");
    }

    useEffect(() => {        
        btnObtener();    
    }, []);

    return (
        <Box style={{width:"100%"}}>
            <Paper style={{zIndex: '100'}} sx={style.paperboton} elevation={3}>
                <BottomNavigation showLabels style={{paddingTop: '8px'}}>
                    <BottomNavigationAction style={{color: '#274c5e'}} label="Regresar" icon={<ArrowBackOutlined color="secondary"/>} onClick={btnRegresar} />
                    <BottomNavigationAction style={{color: '#274c5e'}} label="Nuevo" icon={<AddCircleOutline color="success"/>} />
                    <BottomNavigationAction style={{color: '#274c5e'}} label="Guardar" icon={<SaveOutlined color="primary"/>} type="submit" onClick={btnGuardar} />           
                </BottomNavigation>
            </Paper>

            <div style={style.form}> 
                <Divider>
                    <h3 style={{color: '#1976d2'}}>USUARIO</h3> 
                </Divider>
                <Container style={style.paper}>   
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField name="name" variant="outlined" fullWidth label="Nombre" value={model.name} onChange={modelMemoria}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField name="firstName" variant="outlined" fullWidth label="Apellido Paterno" value={model.firstName} onChange={modelMemoria}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField name="lastName" variant="outlined" fullWidth label="Apellido Materno" value={model.lastName} onChange={modelMemoria}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField name="email" variant="outlined" fullWidth label="Email" value={model.email} onChange={modelMemoria}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField name="phoneNumber" variant="outlined" fullWidth label="Telefono" value={model.phoneNumber} onChange={modelMemoria}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField name="userName" variant="outlined" fullWidth label="Ingrse su Usuario" value={model.userName} onChange={modelMemoria}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField name="password" type="password" variant="outlined" fullWidth label="Ingrse Contraseña" value={model.password} onChange={modelMemoria}/>
                            </Grid>
                            <Grid item xs={12} md={12}>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </div>
        </Box>
    )
};

export default FormCrearUsuario;