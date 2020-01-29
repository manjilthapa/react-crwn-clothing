import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import CustomButton from '../custom-button/custom-button.component'

import './cart-dropdown.styles.scss'
import CartItem from '../cart-item/cart-item.component'
import { selectCartItems } from '../../redux/cart/cart.selectors'
import {toggleCartHidden} from '../../redux/cart/cart.actions'


const CartDropDown = ({cartItems, history, dispatch}) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            { cartItems.length ?
                (cartItems.map(cartItem => (<CartItem key={cartItem.id} item={cartItem} />)))
                :
                (<span className="empty-message">Cart is empty</span>)
            }
        </div>
        <CustomButton onClick = {() => {
            history.push('/checkout')
            dispatch(toggleCartHidden())
            }
        }>Go to checkout</CustomButton>
    </div>
)

/*const mapStateToProps = ({cart: {cartItems}}) => ({
    cartItems
})*/
const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})
export default withRouter(connect(mapStateToProps)(CartDropDown))