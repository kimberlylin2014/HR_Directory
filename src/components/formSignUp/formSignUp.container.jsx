import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsUserLoading } from '../../redux/user/user.selectors';
import FormSignUp from './formSignUp.component';
import WithSpinner from '../withSpinner/withSpinner.component'

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsUserLoading
});

const FormSignUpContainer = connect(mapStateToProps)(WithSpinner(FormSignUp));

export default FormSignUpContainer;