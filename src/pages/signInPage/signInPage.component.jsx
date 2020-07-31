import React from 'react';
import './signInPage.styles.scss';
import FormSignIn from '../../components/formSignIn/formSignIn.component'

const SignInPage = () => {
    return(
        <div className='SignInPage'>
            <FormSignIn />
        </div>
    )
}

export default SignInPage;