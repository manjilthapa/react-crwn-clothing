import React from 'react'
import {connect} from 'react-redux'

import { ReactComponent as Logo } from '../../assets/crown.svg'

import { auth } from '../../firebase/firebase.utils'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropDownContainer from '../cart-dropdown/cart-dropdown.container'

import {createStructuredSelector} from 'reselect'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles'

const Header = ({currentUser, hidden}) => (
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className="logo"/>
        </LogoContainer>        
        <OptionsContainer>
            <OptionLink to="/shop">Shop</OptionLink>
            <OptionLink to="/shop">Contact</OptionLink>
            {
                currentUser ?
                <OptionLink as="div" onClick = {() => auth.signOut()}>
                    Signout
                </OptionLink>
                :
                <OptionLink to="/signin">Signin</OptionLink>
            }
            <CartIcon/> 
        </OptionsContainer>
        { hidden ? null :  <CartDropDownContainer />}
       
    </HeaderContainer>
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