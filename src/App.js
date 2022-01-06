import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { doc, onSnapshot } from 'firebase/firestore'
import { createUserProfileDocument, auth, firestore } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.actions';
class App extends React.Component {
  //what the state will change back to when the user logsout
  unsubscribeFromAuth = null

  //when the user logs in, the current user state is set to the current user.
  componentDidMount() {

    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      if (userAuth) {
        console.log(userAuth, "Top of if statement userAuth")

        await createUserProfileDocument(userAuth)

        onSnapshot(doc(firestore, "users", userAuth.uid), (doc) => {

          setCurrentUser({
            id: doc.id,
            ...doc.data()
          })
          console.log(this.props.currentUser)
        });


      } else {
        setCurrentUser({ userAuth })

      }

    })
  }
  //when the user logs out the lifecycle method calls unsubscribe to set the state back to null.
  componentWillUnmount() {
    this.unsubscribeFromAuth();


  }

  render() {
    return (
      <div>
        <Header />

        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' render={() => this.props.currentUser ? (<Redirect to="/" />) : (<SignInAndSignUpPage />)} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})


//the 2nd argument which is a function that gets the dispatch property that takes an object ACTION that goes
//to a function 
const mapDispatchToProps = dispatch => ({
  //action and action payload goes to dispatch function which invokes the setCurrentUser action with a user payload.
  setCurrentUser: user => dispatch(setCurrentUser(user))
})
//null is first when we dont need to MSTP
export default connect(mapStateToProps, mapDispatchToProps)(App);
