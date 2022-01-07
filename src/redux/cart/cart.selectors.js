import { createSelector } from 'reselect'

//select the state you want to select
const selectCart = state => state.cart;

//selects the cartItems inside the cart.
export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems

)
//select the cart's hidden state.
export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
)

//select the cartItems count, so the total number in quantity of the cartItem.
export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity, 0))

//the total price of all cart Items added together.
export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity * cartItem.price, 0)
)