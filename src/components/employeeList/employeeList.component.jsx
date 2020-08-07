import React from 'react';
import './employeeList.styles.scss';

import EmployeeProfile from '../../components/employeeProfile/employeeProfile.component';
import { selectCompanyEmployees } from '../../redux/company/company.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {selectCurrentUser} from '../../redux/user/user.selectors';

const EmployeeList = ({companyEmployees, currentUser}) => {
    return(
        <div className='EmployeeList'>
            <h3>Employee Directory</h3>
            {companyEmployees.map(employee => {
                console.log(employee)
                if(currentUser.id === employee.id) {
                    return <EmployeeProfile key={employee.id} employee={employee} currentUser={true}/>
                }
                return <EmployeeProfile key={employee.id} employee={employee} currentUser={false}/>
            })}
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    companyEmployees: selectCompanyEmployees,
    currentUser: selectCurrentUser
})

export default connect(mapStateToProps)(EmployeeList);