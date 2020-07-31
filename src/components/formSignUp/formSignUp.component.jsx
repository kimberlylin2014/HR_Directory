import React from 'react';
import './formSignUp.styles.scss';
import { Form, Button } from 'reactstrap';
import FormInput from '../formInput/formInput.component';
import FormError from '../formError/formError.component';
import { signUpUserStart } from '../../redux/user/user.actions'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectErrorMessage } from '../../redux/user/user.selectors';
import { selectCurrentCompany } from '../../redux/company/company.selectors';

class FormSignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            email: '',
            password: '',
            confirmPassword: '',
            hideError: true
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSubmitSignUp = this.handleSubmitSignUp.bind(this);
    }

    handleOnChange(e) {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmitSignUp(e) {
        const {signUpUserStart, company} = this.props;
        e.preventDefault();
        if(this.state.password !== this.state.confirmPassword) {
            this.setState({hideError: false})
            return;
        }
        this.setState({hideError: true});
        signUpUserStart({
            email: this.state.email,
            password: this.state.confirmPassword,
            company

        });
    }

    render() {
        const { revealErrorMessage } = this.props;
        return(
            <div className='FormSignUp'>
                <Form>
                    <FormInput 
                        label='Email'
                        name='email'
                        type='email'
                        value={this.state.email}
                        onChange={this.handleOnChange}
                    />
                    <FormInput 
                        label='New Password'
                        name='password'
                        type='password'
                        value={this.state.password}
                        onChange={this.handleOnChange}
                    />
                    <FormInput 
                        label='Confirm Password'
                        name='confirmPassword'
                        type='password'
                        value={this.state.confirmPassword}
                        onChange={this.handleOnChange}
                    />
                    <FormError message={this.state.hideError ? '' : 'Passwords do not match' }/>
                    <FormError message={revealErrorMessage ? revealErrorMessage : '' }/>
                    <Button color="secondary" onClick={this.handleSubmitSignUp}>Sign Up</Button>
                 </Form>
            </div>   
        )
    }
}

const mapStateToProps = createStructuredSelector({
    revealErrorMessage: selectErrorMessage,
    company: selectCurrentCompany
})

const mapDispatchToProps = (dispatch) => {
    return {
        signUpUserStart: (credentials) => dispatch(signUpUserStart(credentials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormSignUp);