import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsUserLoading } from '../../redux/user/user.selectors';
import LandingPage from './landingPage.component';
import WithSpinner from '../../components/withSpinner/withSpinner.component'

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsUserLoading
});

const LandingPageContainer = connect(mapStateToProps)(WithSpinner(LandingPage));

export default LandingPageContainer;