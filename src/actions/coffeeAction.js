export const setCoffee = (menu) => {
  return {
    type: 'SET_COFFEE',
    payload: menu
  }
}

export const setLogin = (boolean) => {
  return {
    type: 'SET_LOGIN',
    payload: boolean
  }
}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    payload: user
  }
}

export const setOrders = (orders) => {
  return {
    type: 'SET_ORDERS',
    payload: orders
  }
}

export const setEmailAccount = (email) => {
  return {
    type: 'SET_EMAIL',
    payload: email
  }
}

export const setCart = (cart) => {
  return {
    type: 'SET_CART',
    payload: cart
  }
}

export const deleteItemCart = (cartItem) => {
  return {
    type: 'DELETE_CART_ITEM',
    payload: cartItem
  }
}

export const addItemCart = (cartItem) => {
  return {
    type: 'ADD_CART_ITEM',
    payload: cartItem
  }
}

export const resetCart = () => {
  return { type: 'RESET_CART' }
}

export const setDiscount = (item) => {
  return {
    type: 'SET_DISCOUNT',
    payload: item
  }
}
