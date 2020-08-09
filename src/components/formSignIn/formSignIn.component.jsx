import React from 'react';
import './formSignIn.styles.scss'
import { Form, Button } from 'reactstrap';
import FormInput from '../formInput/formInput.component';
import { Link } from 'react-router-dom';
import { signInUserStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';
import { createStructuredSelector} from 'reselect';
import { selectCurrentCompany } from '../../redux/company/company.selectors';
import { selectErrorMessage } from '../../redux/user/user.selectors';
import FormError from '../formError/formError.component';
import { signOutUserStart} from '../../redux/user/user.actions'
import { withRouter } from 'react-router-dom';

class FormSignIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSignInSubmit = this.handleSignInSubmit.bind(this);
    }

    handleOnChange(e) {
        const {value, name} = e.target;
        this.setState({
            [name]: value
        });    
    }

    handleSignInSubmit(e) {
        e.preventDefault();
        console.log('submitting')
        const { signInUserStart, company } = this.props;
        const { email, password } = this.state;

        signInUserStart({email, password, company});
    }
    render() {
        console.log('rendering form sign in')
        const { revealErrorMessage, history, signOutUserStart } = this.props
        return(
            <div className='FormSignIn'>
                <Form>         
                    <h2 className='text-center'>Sign In</h2>
                    <FormInput 
                        label='Email'
                        name='email'
                        type='email'
                        value={this.state.email}
                        onChange={this.handleOnChange}
                    />
                    <FormInput 
                        label='Password'
                        name='password'
                        type='password'
                        value={this.state.password}
                        onChange={this.handleOnChange}
                    />
                    <FormError message={revealErrorMessage ? revealErrorMessage : '' }/>
                    <div className='d-flex align-items-center buttons'>
                        <Button onClick={this.handleSignInSubmit}>Sign In</Button>
                        <Button onClick={() => {
                            history.push('/');
                            signOutUserStart();
                        }}>Change Company</Button>
                        <Link to='/signUp'>New Employee?</Link>
                    </div>
                </Form>
            </div>
        )
    }
}

const mapDisptachToProps = (dispatch) => {
    return {
        signInUserStart: (credentials) => dispatch(signInUserStart(credentials)),
        signOutUserStart: () => dispatch(signOutUserStart())
    }
}

const mapStateToProps = createStructuredSelector({
    revealErrorMessage: selectErrorMessage,
    company: selectCurrentCompany
})

export default withRouter(connect(mapStateToProps, mapDisptachToProps)(FormSignIn));