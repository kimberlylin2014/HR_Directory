import React from 'react';
import './formUpdateProfileModal.styles.scss';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import FormInput from '../formInput/formInput.component';

import { updateProfileFormStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';
import  {selectCurrentUser, selectUserFirstTimeLogIn} from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';


class FormUpdateProfileModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: props.currentUser.firstName ? props.currentUser.firstName : "",
            lastName: props.currentUser.lastName ? props.currentUser.lastName : "",
            img: props.currentUser.img ? props.currentUser.img : "",
            department: props.currentUser.department ? props.currentUser.department : 'Engineering',
            contactNum: props.currentUser.contactNum ? props.currentUser.contactNum : "",
            jobTitle: props.currentUser.jobTitle ? props.currentUser.jobTitle : ""
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
    handleOnChange(e) {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }
    handleFormSubmit(e) {
        e.preventDefault();
        const { currentUser, updateProfileFormStart, toggle } = this.props;   
        updateProfileFormStart({currentUser, profileForm: this.state})
        toggle();
    }
    render() {
        const { firstTimer } = this.props;
        return (
            <div className='FormUpdateProfileModal'>
                <Form>
                    <FormInput 
                       label='First Name'
                       name='firstName'
                       type='text'
                       value={this.state.firstName}
                       onChange={this.handleOnChange}
                    />
                    <FormInput 
                       label='Last Name'
                       name='lastName'
                       type='text'
                       value={this.state.lastName}
                       onChange={this.handleOnChange}
                    />
                    <FormGroup>
                        <Label for="dpt">Select Department</Label>
                        <Input type="select" name="department" id="dpt" onChange={this.handleOnChange} value={this.state.department}>
                            <option>Engineering</option>
                            <option>Sales</option>
                            <option>Marketing</option>
                            <option>Human Resource</option>
                        </Input>
                    </FormGroup>
                    <FormInput 
                       label='Job Title'
                       name='jobTitle'
                       type='text'
                       value={this.state.jobTitle}
                       onChange={this.handleOnChange}
                    />
                    <FormInput 
                       label='Contact Number'
                       name='contactNum'
                       type='number'
                       value={this.state.contactNum}
                       onChange={this.handleOnChange}
                    />
                    <FormInput 
                       label='Profile Picture'
                       name='img'
                       type='file'
                       value={this.state.img}
                       onChange={this.handleOnChange}
                    />
                    <Button onClick={this.handleFormSubmit}>
                        {firstTimer ? 'Complete' : "Update"}
                    </ Button>
                </Form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateProfileFormStart: (formObject) => dispatch(updateProfileFormStart(formObject))
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    firstTimer: selectUserFirstTimeLogIn
})

export default connect(mapStateToProps, mapDispatchToProps)(FormUpdateProfileModal);