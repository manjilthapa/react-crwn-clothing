import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {createStructuredSelector} from 'reselect'
import { compose } from 'redux'

import { selectCartItems } from '../../redux/cart/cart.selectors'
import CartDropDown from './cart-dropdown.component'



const mapStateTopProps = createStructuredSelector({
    cartItems: selectCartItems
})

const CartDropDownContainer = compose(
    withRouter,
    connect(mapStateTopProps)
)(CartDropDown)


export default CartDropDownContainer
