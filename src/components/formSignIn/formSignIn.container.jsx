import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsUserLoading } from '../../redux/user/user.selectors';
import FormSignIn from './formSignIn.component';
import WithSpinner from '../withSpinner/withSpinner.component'

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsUserLoading
});

const FormSignInContainer = connect(mapStateToProps)(WithSpinner(FormSignIn));

export default FormSignInContainer;