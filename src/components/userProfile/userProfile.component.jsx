import React from 'react'; 
import './userProfile.styles.scss';

import { selectUserFirstTimeLogIn} from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import UserProfileModal from '../../components/userProfileModal/userProfileModal.component';
import { selectCurrentUser } from '../../redux/user/user.selectors'

const UserProfile = ({firstTimer, currentUser}) => {
    const {firstName, lastName, jobTitle, department, img} = currentUser;
    console.log('User Profile')
    let modalStateBoolean;
    if(firstTimer) {
        modalStateBoolean = true;
    } else {
        modalStateBoolean = false;
    }
    return (
        <div className='UserProfile'>
            
            <div className='d-flex'>
                <div className='text-center'>
                    <img src="https://image.flaticon.com/icons/svg/3237/3237472.svg" width='80px'alt=""/>
                    <UserProfileModal modalState={modalStateBoolean} buttonLabel='Edit' />
                </div>
                <div className='profile-details'>
                    <ul>
                    <h5>My Profile</h5>
                        <li><span className='profile-subtitle'>Name:</span> &nbsp; &nbsp; {firstName} {lastName}</li>
                        <li><span className='profile-subtitle'>Job Title:</span> &nbsp; &nbsp;{jobTitle}</li>
                        <li><span className='profile-subtitle'>Department:</span> &nbsp; &nbsp;{department}</li>
                    </ul>
                </div>
            </div>
            
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    firstTimer: selectUserFirstTimeLogIn,
    currentUser: selectCurrentUser
})


export default connect(mapStateToProps)(UserProfile);