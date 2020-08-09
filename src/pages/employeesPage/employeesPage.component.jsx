import React from 'react';
import './employeesPage.styles.scss';
import EmployeeListContainer from '../../components/employeeList/employeeList.container';
import {selectCurrentCompany} from '../../redux/company/company.selectors';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';

const EmployeePage = ({currentCompany}) => {  
    const companyColor = currentCompany ? currentCompany.companyColor : ''
    return(
        <div className='EmployeePage' style={{backgroundColor: companyColor}}>
            <EmployeeListContainer />
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentCompany: selectCurrentCompany
})
export default connect(mapStateToProps)(EmployeePage);