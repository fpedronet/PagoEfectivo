import sesionUsuarioReducer from './sesionUsuarioReducer';
import openSnackbarReducer from './openSnackbarReducer';
import openBackdropReducer from './openBackdropReducer';

export const mainReducer = ({sesionUsuario, openSnackbar, openBackdrop}, action) => {
    return {
        sesionUsuario : sesionUsuarioReducer(sesionUsuario, action),
        openSnackbar :  openSnackbarReducer(openSnackbar, action),
        openBackdrop :  openBackdropReducer(openBackdrop, action)
    }
}