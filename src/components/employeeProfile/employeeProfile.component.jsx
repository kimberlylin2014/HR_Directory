import React from 'react';
import './employeeProfile.styles.scss';
import UserProfileModal from '../../components/userProfileModal/userProfileModal.component';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector} from 'reselect';
const EmployeeProfile = ({ employee: {firstName, lastName, jobTitle, department, email, imageURL}, currentUser, user}) => {
    return (
        <div className='EmployeeProfile'>
            <div>
                <h4>{user ? currentUser.firstName : firstName} {user ? currentUser.lastName : lastName}</h4>
                <p>{user ? currentUser.jobTitle: jobTitle}</p>
                <p>{user ? currentUser.department : department}</p>
                <p>{user ? currentUser.email : email}</p>
                {user ? <UserProfileModal modalState={false} buttonLabel='Edit' /> : ''}
            </div>
            <div>
                <img src={`${user ? currentUser.imageURL : imageURL}`} width='120px'/>
            </div>
        </div>
    
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})
export default connect(mapStateToProps)(EmployeeProfile);