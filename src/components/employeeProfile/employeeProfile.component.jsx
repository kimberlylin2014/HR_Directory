import React from 'react';
import './employeeProfile.styles.scss';

const EmployeeProfile = ({ employee: {firstName, lastName, jobTitle, department, email}, currentUser}) => {
    return (
        <div className='EmployeeProfile'>
            <div>
                <h4>{firstName} {lastName}</h4>
                <p>{jobTitle}</p>
                <p>{department}</p>
                <p>{email}</p>
                {currentUser ? <p>EDIT</p> : ''}
            </div>
            <div>
                <img src="https://image.flaticon.com/icons/svg/3237/3237472.svg" width='80px'/>
            </div>
        </div>
    )
}

export default EmployeeProfile;