import React from 'react'
import { Route, Switch } from 'react-router-dom'
import {connect} from 'react-redux'

import './App.css'
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import SigninAndSignup from './pages/signin-and-signup/signin-and-signup.component'

import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import {setCurrentUser} from './redux/user/user.actions'

class App extends React.Component {

 /* constructor(){
    super()
    this.state = {
      currentUser : null
    }
  }*/

  unsubscribeFromAuth = null

  componentDidMount(){
    const {setCurrentUser} = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //this.setState({'currentUser':user})
      //createUserProfileDocument(user)
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth)
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id : snapShot.id,
              ...snapShot.data()
          })
          //console.log(this.state)
        })
      }else
        setCurrentUser(userAuth)
        //this.setState({currentUser : userAuth })
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth() // close the open subscription of firebase connection, handle the changes of auth
  }

  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path="/signin" component={SigninAndSignup}/>
        </Switch>
    
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App)
