import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import { ReactComponent as Logo } from '../../assets/crown.svg'

import './header.styles.scss'
import { auth } from '../../firebase/firebase.utils'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropDown from '../cart-dropdown/cart-dropdown.component'

import {createStructuredSelector} from 'reselect'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { selectCartHidden } from '../../redux/cart/cart.selectors'

const Header = ({currentUser, hidden}) => (
    <div className="header">
        <Link className="logo-container" to="/">
            <Logo className="logo"/>
        </Link>        
        <div className ="options">
            <Link className = "option" to="/shop">Shop</Link>
            <Link className = "option" to="/shop">Contact</Link>
            {
                currentUser ?
                <div className="option" onClick = {() => auth.signOut()}>
                    Signout
                </div>
                :
                <Link className = "option" to="/signin">Signin</Link>
            }
            <CartIcon/> 
        </div>
        { hidden ? null :  <CartDropDown />}
       
    </div>
)

/*const mapStateToProps = ({user : {currentUser}, cart: {hidden}}) => ({
    currentUser,
    hidden
})*/
/*const mapStateToProps = (state) => ({
    currentUser : selectCurrentUser(state),
    hidden : selectCartHidden(state)
})*/
const mapStateToProps = createStructuredSelector({
    currentUser : selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header)