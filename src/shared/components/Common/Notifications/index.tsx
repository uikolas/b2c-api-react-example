import * as React from 'react';
import { Slide, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Notifications: React.SFC<any> = (props): JSX.Element => {
    return (
        <ToastContainer
            autoClose={ 500000 }
            transition={ Slide }
            position={ toast.POSITION.TOP_LEFT }
            hideProgressBar={ true }
            pauseOnHover={ false }
            pauseOnFocusLoss={ false }
            closeButton={ false }
            draggable={ false }
            style={ {
                width: '100%',
                left: 0,
                top: 0,
                padding: 0,
                margin: 0
            } }
        />
    );
};
