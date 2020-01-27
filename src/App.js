import React from 'react'
import './App.css'
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import { Route, Switch } from 'react-router-dom'
import Header from './components/header/header.component'
import SigninAndSignup from './pages/signin-and-signup/signin-and-signup.component'
import { auth } from './firebase/firebase.utils'


class App extends React.Component {

  constructor(){
    super()
    this.state = {
      currentUser : null
    }
  }

  unsubscribeFromAuth = null

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({'currentUser':user})
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth() // close the open subscription of firebase connection, handle the changes of auth
  }

  render(){
    return (
      <div>
        <Header currentUser = {this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path="/signin" component={SigninAndSignup}/>
        </Switch>
    
      </div>
    )
  }
}

export default App;
