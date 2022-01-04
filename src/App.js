import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { doc, onSnapshot } from 'firebase/firestore'
import { createUserProfileDocument, auth, firestore } from './firebase/firebase.utils'
class App extends React.Component {
  constructor() {
    super();
    //set the users default state to null
    this.state = {
      currentUser: null
    }
  }

  //what the state will change back to when the user logsout
  unsubscribeFromAuth = null
  //when the user logs in, the current user state is set to the current user.
  componentDidMount() {
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      if (userAuth) {

        await createUserProfileDocument(userAuth)

        onSnapshot(doc(firestore, "users", userAuth.uid), (doc) => {
          this.setState({
            currentUser: {
              id: doc.id,
              ...doc.data()
            }

          })

        });


      } else {
        this.setState({ currentUser: userAuth })

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
        <Header currentUser={this.state.currentUser} />

        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;