import React from 'react';
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';

// Pages
import LandingPage from './pages/landingPage/landingPage.component';
import SignInPage from './pages/signInPage/signInPage.component';
import SignUpPage from './pages/signUpPage/signUpPage.component';
import HomePage from './pages/homePage/homePage.component';

import { checkUserSession } from './redux/user/user.actions';
import { connect } from 'react-redux';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';


class App extends React.Component {
  componentDidMount() {
    const { checkUserSession} = this.props;
    checkUserSession();
    
  }
  render() {
    const { currentUser } = this.props;
    return (
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/signIn' render={() => {
          return currentUser ?<Redirect to='/homePage' /> : <SignInPage />
        }}/>
        <Route exact path='/signUp' render={() => {
          return currentUser ?<Redirect to='/homePage' /> : <SignUpPage />
        }}/>
        <Route exact path='/homePage' render={() => {
           return currentUser ? <HomePage /> : <Redirect to='/'/>
        }} />
      </Switch>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    checkUserSession: () => dispatch(checkUserSession())
  }
}
 

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
