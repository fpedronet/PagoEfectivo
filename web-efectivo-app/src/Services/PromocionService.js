import httpCliente from '../http/httpCliente';

export const getListarPagoEfectivo = model =>{
    return new Promise((resolve, eject) => {
        httpCliente.get('/pagoefectivo/getListarPagoEfectivo?'+ `page=${model.page}&pages=${model.pages}&request=${model.request}`)
        .then(response=>{
            resolve(response);
        }).catch(error=>{
            resolve(error.response);
        });
    });
}

export const getObtenerPagoEfectivo = model =>{
    return new Promise((resolve, eject) => {
        httpCliente.get('/pagoefectivo/getObtenerPagoEfectivo?'+ `id=${model.id}`)
        .then(response=>{
            resolve(response);
        }).catch(error=>{
            resolve(error.response);
        });
    });
}

export const postGenerarCodigoPromocion = model =>{
    if(model.idPagoEfectivo=="" || model.idPagoEfectivo==null){
        return new Promise((resolve, eject) => {
            httpCliente.post('/pagoefectivo/postGenerarCodigo', model)
            .then(response=>{
                resolve(response);
            }).catch(error=>{
                resolve(error.response);
            });
        });
    }else{
        return new Promise((resolve, eject) => {
            httpCliente.post('/pagoefectivo/postCanjearCodigo', model)
            .then(response=>{
                resolve(response);
            }).catch(error=>{
                resolve(error.response);
            });
        });
    }
    
}
