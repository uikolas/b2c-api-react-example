import * as React from 'react';
import { ToastContainer, Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CssBaseline from '@material-ui/core/CssBaseline';
// import 'typeface-roboto';

import {IComponent} from "../../../typings/app";

import {getContentRoutes} from '../../routes/contentRoutes';


const styles = require('./style.scss');
console.info('primary', styles.primary); // -> #BF4040
console.info('secondary', styles.secondary); // -> #1F4F7F
const className = styles.appHandler;

export const AppHandler = function (props: IComponent) {
  return (
    <div className={className}>
      <CssBaseline />
      {getContentRoutes()}
      <ToastContainer
        autoClose={3000}
        transition={Slide}
        position={toast.POSITION.BOTTOM_LEFT}
        pauseOnHover={true}
        style={{
          width: '100%',
          left: 0,
        }}
      />
    </div>
  );
};
