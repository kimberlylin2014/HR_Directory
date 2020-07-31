import React from 'react';
import './formError.styles.scss';

const FormError = ({message}) => {
    return(
        <div className='FormError'>
            <p>{message}</p>
        </div>    
    )
}

export default FormError;