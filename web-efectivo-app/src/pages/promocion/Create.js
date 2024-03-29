import {useState, useEffect} from 'react';
import {Container, Grid, TextField, Paper, BottomNavigation, BottomNavigationAction, Divider} from '@mui/material';
import { SaveOutlined, ArrowBackOutlined, AddCircleOutline} from '@mui/icons-material';
import style from "../../tools/Style";
import { useStateValue } from '../../context/store';
import { useParams, useHistory } from 'react-router-dom';

import {postGenerarCodigoPromocion, getObtenerPagoEfectivo} from "../../Services/PromocionService";
import { Box } from '@mui/system';

const FormCrearPromocion = () =>{
    let history = useHistory();
    const [{sesionUsuario}, dispatch]  = useStateValue();
    const {id} = useParams();

    const [model, setModel] = useState({
        idPagoEfectivo:'',
        codigoPagoEfectivo:'',
        email:'',
        nombre: '',
        estado:'',
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
        dispatch({
            type : "OPEN_BACKDROP",
            open : true
        })     
        postGenerarCodigoPromocion(model).then(response =>{ 
           dispatch({
                type : "OPEN_BACKDROP",
                open : false
            })     
            if(response.status === 200) {
                if(response.data.tipoRespuesta!=2){
                    btnRegresar();
                }               
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
            model.id= (id==undefined)? "": id;
            getObtenerPagoEfectivo(model).then(response =>{            
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
        history.push("/promocion");
    }

    const btnNuevo =()=>{
        history.push("/promocion/create");

        model.idPagoEfectivo='';
        model.codigoPagoEfectivo='';
        model.email='';
        model.nombre= '';
        model.estado='';
    }
    
    useEffect(() => {
        btnObtener();    
    }, []);

    return (
        <Box style={{width:"100%"}}>
            <Paper style={{zIndex: '100'}} sx={style.paperboton} elevation={3}>
                <BottomNavigation showLabels style={{paddingTop: '8px'}}>
                    <BottomNavigationAction style={{color: '#274c5e'}} label="Regresar" icon={<ArrowBackOutlined color="secondary"/>} onClick={btnRegresar} />
                    <BottomNavigationAction style={{color: '#274c5e'}} label="Nuevo" icon={<AddCircleOutline color="success"/>} onClick={btnNuevo}/>
                    {model.estado=="CANJEADO"? null : <BottomNavigationAction style={{color: '#274c5e'}} label={model.idPagoEfectivo? "Canjear":"Generar"} icon={<SaveOutlined color="primary"/>} type="submit" onClick={btnGuardar}/>  }         
                </BottomNavigation>
            </Paper>

            <div style={style.form}> 
                <Divider>
                    <h3 style={{color: '#1976d2'}}>GENERAR PROMOCIÓN</h3> 
                </Divider>
                <Container style={style.paper}>  
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <TextField name="codigoPagoEfectivo" value={model.codigoPagoEfectivo} onChange={modelMemoria} variant="outlined" fullWidth label="Código Promocion" disabled={true}/>
                            </Grid>    
                            <Grid item xs={12} md={12}>
                                <TextField name="email" value={model.email} onChange={modelMemoria} variant="outlined" fullWidth label="Email" disabled={model.idPagoEfectivo? true:false}/>
                            </Grid> 
                            <Grid item xs={12} md={12}>
                                <TextField name="nombre" value={model.nombre} onChange={modelMemoria} variant="outlined" fullWidth label="Nombre"/>
                            </Grid> 
                            <Grid item xs={12} md={12}>
                                <TextField name="estado" value={model.estado} onChange={modelMemoria} variant="outlined" fullWidth label="Estado" disabled={true}/>
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

export default FormCrearPromocion;
