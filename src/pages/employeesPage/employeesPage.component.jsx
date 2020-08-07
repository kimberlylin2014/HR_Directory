import React from 'react';
import './employeesPage.styles.scss';
import EmployeeList from '../../components/employeeList/employeeList.component';

const EmployeePage = () => {  
    return(
        <div className='EmployeePage'>
            <EmployeeList />
        </div>
    )
}

export default EmployeePage;