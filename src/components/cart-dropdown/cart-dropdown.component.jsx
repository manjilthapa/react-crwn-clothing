import React from 'react'


import CustomButton from '../custom-button/custom-button.component'

import './cart-dropdown.styles.scss'
import CartItem from '../cart-item/cart-item.component'
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

export default CartDropDown