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
import Header from './components/header/header.component'

class App extends React.Component {
  componentDidMount() {
    console.log('mounting')
    const { checkUserSession} = this.props;
    checkUserSession();
    
  }
  render() {
    const { currentUser } = this.props;
    console.log(currentUser);
    console.log('rendering app')
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' render={() => {
              return currentUser ? <Redirect to='/homePage'/> : <LandingPage />
            }}/>
          <Route exact path='/signIn' render={() => {
            return currentUser ? <Redirect to='/homePage' /> : <SignInPage />
          }}/>
          <Route exact path='/signUp' render={() => {
            return currentUser ? <Redirect to='/homePage' /> : <SignUpPage />
          }}/>
          <Route strict exact path='/homePage' render={() => {
            return currentUser ? <HomePage /> : <Redirect to='/'/>
          }} />
          <Route  path='' render={() => {
           return <h1>404 Not Found</h1>
          }} />
        </Switch>
      </div>
      
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
