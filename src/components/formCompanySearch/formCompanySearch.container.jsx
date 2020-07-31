import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsCompanyLoading } from '../../redux/company/company.selectors';
import FormCompanySearch from './formCompanySearch.component';
import WithSpinner from '../withSpinner/withSpinner.component'

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCompanyLoading
});

const FormCompanySearchContainer = connect(mapStateToProps)(WithSpinner(FormCompanySearch));

export default FormCompanySearchContainer;
