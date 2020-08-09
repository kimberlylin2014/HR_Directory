import React from 'react';
import './formUpdateProfileModal.styles.scss';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import FormInput from '../formInput/formInput.component';

import { updateProfileFormStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';
import  {selectCurrentUser, selectUserFirstTimeLogIn} from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';

class FormUpdateProfileModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: props.currentUser.firstName ? props.currentUser.firstName : "",
            lastName: props.currentUser.lastName ? props.currentUser.lastName : "",
            image: props.currentUser.image ? props.currentUser.image : "",
            imageURL: props.currentUser.imageURL ? props.currentUser.imageURL : "",
            department: props.currentUser.department ? props.currentUser.department : 'Engineering',
            jobTitle: props.currentUser.jobTitle ? props.currentUser.jobTitle : "",
            progress: 0
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleUploadStart = this.handleUploadStart.bind(this);
        this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
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
        updateProfileFormStart({currentUser, profileForm: this.state});
        toggle();
    }
    handleUploadStart() {
        this.setState({
            progress: 0
        })
    }
    handleUploadSuccess(file) {
        this.setState({
            image: file,
            progress: 100
        });
        firebase.storage().ref('profiles').child(file).getDownloadURL()
            .then(url => this.setState({imageURL: url}))
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
                    <label
                        style={{backgroundColor: 'steelblue', color: 'white', padding: 5, borderRadius: 4, cursor: 'pointer'}}  
                    >
                        Upload Photo
                        <FileUploader 
                            hidden
                            accept="image/*"
                            name='img'
                            title='foo'
                            storageRef={firebase.storage().ref('profiles')}
                            onUploadStart={this.handleUploadStart}
                            onUploadSuccess={this.handleUploadSuccess}
                        />
                    </label>
                    <p id='progress'>Completion Status: {this.state.progress}%</p>
                    <Button onClick={this.handleFormSubmit} >
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