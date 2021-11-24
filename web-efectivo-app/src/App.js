import React,{ useState, useEffect } from 'react';
// import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme from "./theme/theme";
import {BrowserRouter as Router, Switch, Route}  from 'react-router-dom';
import {Grid, Snackbar, ThemeProvider } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// useState (mensje y sessiones)
import { useStateValue } from './context/store';

// layout
import AppNavbar from './compenentes/navegacion/AppNavbar';
import RutaSegura from './compenentes/navegacion/RutaSegura';

// Pages
import Inicio from './pages/inicio/Index';

import Login from './pages/seguridad/Login';

import UsuarioIndex from './pages/seguridad/Index';
import UsuarioCreate from './pages/seguridad/Create';
import UsuarioEdit from './pages/seguridad/Create';

import PromocionIndex from './pages/promocion/Index';
import PromocionCreate from './pages/promocion/Create';
import PromocionEdit from './pages/promocion/Create';

// Services
import {getObtenerUsuarioSesion} from './Services/SeguridadService';


function App() {
  const [{ openSnackbar, openBackdrop }, dispatch] = useStateValue();
  
  const [iniciaApp, setIniciaApp] = useState(false);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  useEffect(() => {
      if(!iniciaApp){
        getObtenerUsuarioSesion(dispatch).then(response => {
          setIniciaApp(true);
        }).catch(error => {
          setIniciaApp(true);
        });
      }
  }, [iniciaApp]);

  return iniciaApp === false ? null : (
    <React.Fragment>
      
      <Snackbar 
        anchorOrigin = {{vertical:"bottom", horizontal:"center"}}
        open = {openSnackbar? openSnackbar.open: false}
        autoHideDuration = {3000}
        ContentProps = {{"aria-describedby":"message-id"}} 
        onClose={()=>
          dispatch({
            type : "OPEN_SNACKBAR",
            openMensaje : {
              open : false,
              mensaje : "",
              tipoRespuesta:1
            }
        })
      }       
      >
        <Alert 
          severity={openSnackbar? ((openSnackbar.tipoRespuesta==1)? "success":((openSnackbar.tipoRespuesta==0)?"error":"warning")): "info"}
          sx={{ width: '100%' }}
          onClose={()=>
            dispatch({
              type : "OPEN_SNACKBAR",
              openMensaje : {
                open : false,
                mensaje : "",
                tipoRespuesta:1
              }
          })
        }
        >
          <span id="message-id">{openSnackbar? openSnackbar.mensaje:""}</span>
        </Alert>
      </Snackbar>

     <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open = {openBackdrop? openBackdrop.open: false}
        onClose={()=>
          dispatch({
            type : "OPEN_BACKDROP",
            open : false
        })
      }
      >
        <CircularProgress
         color="inherit"/>
      </Backdrop>

      <Router>
            <ThemeProvider theme={theme}>    
            <AppNavbar />      
              <Grid container>
                  <Switch>

                    <Route exact path="/auth/login" component={Login} />

                    <RutaSegura 
                      exact
                      path = "/inicio"
                      component = {Inicio}
                    />

                    <RutaSegura exact path = "/usuario" component = {UsuarioIndex} />
                    <RutaSegura exact path = "/usuario/create" component = {UsuarioCreate} />
                    <RutaSegura exact path = "/usuario/edit/:id" component = {UsuarioEdit} />

                    <RutaSegura exact path = "/promocion" component = {PromocionIndex} />
                    <RutaSegura exact path = "/promocion/create" component = {PromocionCreate} />
                    <RutaSegura exact path = "/promocion/edit/:id" component = {PromocionEdit} />

                  </Switch>
              </Grid>
            </ThemeProvider>
      </Router> 
    </React.Fragment>    
  );
}

export default App;
