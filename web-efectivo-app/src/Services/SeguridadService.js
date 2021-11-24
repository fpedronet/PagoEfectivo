import httpCliente from '../http/httpCliente';
import axios from 'axios';

const instancia = axios.create();
instancia.CancelToken = axios.CancelToken;
instancia.isCancel = axios.isCancel;

export const postLogin = (usuario, dispatch) =>{
    return new Promise((resolve, eject) => {
        instancia.post('/usuario/postLogin', usuario).then(response=>{ 
            dispatch({
                type : "INICIAR_SESION",
                sesion : response.data,
                autenticado : true
              })         
            resolve(response);
        }).catch(error => {
            resolve(error.response);
        });
    });
};

export const getListarUsuario = model =>{
    return new Promise((resolve, eject) => {
        httpCliente.get('/usuario/getListarUsuario?'+ `page=${model.page}&pages=${model.pages}&request=${model.request}`)
        .then(response=>{
            resolve(response);
        }).catch(error=>{
            resolve(error.response);
        });
    });
}

export const getObtenerUsuario = model =>{
    return new Promise((resolve, eject) => {
        httpCliente.get('/usuario/getObtenerUsuario?'+ `id=${model.key}`)
        .then(response=>{
            resolve(response);
        }).catch(error=>{
            resolve(error.response);
        });
    });
}
export const getObtenerUsuarioSesion = (dispatch) =>{
    return new Promise((resolve, eject) => {
      httpCliente.get('/usuario/getObtenerUsuarioSesion').then(response=>{
            dispatch({
                type:"INICIAR_SESION",
                sesion:response.data,
                autenticado:true,
            });
            
             resolve(response);
        }).catch(error => {
            resolve(error.response);
        })
     });
}

export const postGuardarUsuario = usuario =>{
    return new Promise((resolve, eject) => {
        httpCliente.post('/usuario/postGuardarUsuario', usuario)
        .then(response=>{
            resolve(response);
        }).catch(error=>{
            resolve(error.response);
        });
    });
}