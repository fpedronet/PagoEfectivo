const initialState  = {
    open : false,
    mensaje: "",
    tipoRespuesta:1
};

const openSnackbarReducer = (state = initialState, action) => {
    switch(action.type) {
        case "OPEN_SNACKBAR" :
            return {
                ...state,
                open : action.openMensaje.open,
                mensaje : action.openMensaje.mensaje,
                tipoRespuesta : action.openMensaje.tipoRespuesta,
            };
        default : 
            return state;
    }
}

export default openSnackbarReducer;
