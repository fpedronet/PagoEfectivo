import React, { useState, useEffect } from 'react';
import {CardActions, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, BottomNavigation,BottomNavigationAction,InputAdornment } from '@mui/material';
import { AddCircleOutline, EditOutlined} from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';
import style from "../../tools/Style";
import ControlTyping from "../../tools/ControlTyping";
import { Link, useHistory } from 'react-router-dom';

import {getListarPagoEfectivo} from "../../Services/PromocionService";

const FormIndexPromocion = () =>{
    let history = useHistory();

    const [textBusqueda, setTextBusqueda] = useState("");
    const typingBuscadorTexto = ControlTyping(textBusqueda, 400);

    const [modelRequest, setModelRequest] = useState({
        request:'',
        page:0,
        pages: 5
    });

    const [modelResponse, setModelResponse] = useState({
        items:[],
        page:0,
        pages: 0,
        total:0
    });     

    useEffect(() => {      
        const listarPlan = async() =>{

            let newTextBusqueda = "";
            let newpage = modelRequest.page + 1;

            if(typingBuscadorTexto){
                newTextBusqueda = typingBuscadorTexto;
                newpage = 1
            }

            const model ={
                request: newTextBusqueda,
                page: newpage,
                pages: modelRequest.pages
            }

            const response = await getListarPagoEfectivo(model);
            setModelResponse(response.data);
        };
        
        listarPlan();
        
    }, [modelRequest, typingBuscadorTexto]);
    
    const btnNuevo=()=>{
        history.push("/promocion/create");
    }

    const btnCambiarPagina = (event, newpag) => {
        setModelRequest((anterior)=>({
            ...anterior,
            page: parseInt(newpag)
        }));
    }

    const btnCambiarCantidadPagina = (event) =>{
        setModelRequest((anterior)=>({
            ...anterior,
            pages: parseInt(event.target.value),
            page:0
        }));
    }

    return (
        <Box style={{width:"100%"}}>
            <Paper style={{zIndex: '100'}} sx={style.paperboton} elevation={3}>
                <BottomNavigation showLabels style={{paddingTop: '8px'}}>
                    <BottomNavigationAction style={{color: '#274c5e'}} label="Nuevo" icon={<AddCircleOutline color="success"/>} onClick={() => btnNuevo()} />
                </BottomNavigation>
            </Paper>
            <div style={style.form}>
                <Divider>
                    <h3 style={{color: '#1976d2'}}>GENERAR PROMOCIÓN</h3> 
                </Divider> 
                <Paper sx={{ marginTop:'-10px', width: '100%', overflow: 'hidden' }}>      
                    <Grid container style={style.btnfiltro}>
                        <Grid item xs={12} sm={4} md={6}>
                            <CardActions>
                                <TextField 
                                    fullWidth 
                                    name="textBusqueda" 
                                    variant="outlined" 
                                    label="Buscar Nombre" 
                                    onChange = {e => setTextBusqueda(e.target.value)} 
                                    spacing={4} 
                                    InputProps={{
                                        endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchIcon />
                                        </InputAdornment>
                                        )
                                    }}
                                /> 
                            </CardActions>
                        </Grid>  
                    </Grid>
                    <Divider></Divider>
                    <CardActions>
                    <TableContainer sx={{ maxHeight: 400 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={style.thead} align="left">Código</TableCell>
                                    <TableCell style={style.thead} align="left">Email</TableCell>
                                    <TableCell style={style.thead} align="left">Nombre</TableCell>
                                    <TableCell style={style.thead} align="left">Estado</TableCell>
                                    <TableCell style={style.thead} align="left">Acción</TableCell>                             
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {modelResponse.items==null? null: modelResponse.items.map((row) =>(
                                    <TableRow key ={row.idPagoEfectivo}>
                                        <TableCell style={style.tbody} align="left">{row.codigoPagoEfectivo}</TableCell>
                                        <TableCell style={style.tbody} align="left">{row.email}</TableCell>
                                        <TableCell style={style.tbody} align="left">{row.nombre}</TableCell>  
                                        <TableCell style={style.tbody} align="left">{row.estado}</TableCell>  
                                        <TableCell style={style.tbody} align="left">
                                                <Link to={`/promocion/edit/${row.idPagoEfectivo}`}> <EditOutlined /></Link>
                                        </TableCell> 
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                
                            </TableFooter>
                        </Table>
                    </TableContainer>
                    </CardActions>
                    <TablePagination 
                                    component="div" 
                                    rowsPerPageOptions={[5, 10, 25]}
                                    count={modelResponse.total}
                                    rowsPerPage={modelRequest.pages}
                                    page={modelRequest.page}
                                    onPageChange={btnCambiarPagina}
                                    onRowsPerPageChange={btnCambiarCantidadPagina}
                                    labelRowsPerPage="Paginación"
                                />
                              
                </Paper>
            </div>
        </Box> 
      );
    };

export default FormIndexPromocion;