import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsCompanyLoading } from '../../redux/company/company.selectors';
import EmployeeList from './employeeList.component';
import WithSpinner from '../withSpinner/withSpinner.component'

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCompanyLoading
});

const EmployeeListContainer = connect(mapStateToProps)(WithSpinner(EmployeeList));

export default EmployeeListContainer;
