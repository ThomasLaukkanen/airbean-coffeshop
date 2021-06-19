const initState = {
  menu: [],
  loggedIn: false,
  user: {},
  orders: [],
  email: '',
  cart: []
}

export const coffeeReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_COFFEE':
      return {
        ...state,
        menu: action.payload
      }
    case 'SET_LOGIN':
      return {
        ...state,
        loggedIn: action.payload
      }
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      }
    case 'SET_ORDERS':
      return {
        ...state,
        orders: [...state.orders, action.payload]
      }
    case 'SET_EMAIL':
      return {
        ...state,
        email: action.payload
      }
    case 'SET_CART':
      return {
        ...state,
        cart: [...state.cart, action.payload]
      }
    case 'ADD_CART_ITEM':
      return {
        ...state,
        cart: [...state.cart, action.payload]
      }
    case 'DELETE_CART_ITEM':
      const array = [...state.cart]
      const index = array.indexOf(action.payload)
      if (index > -1) {
        array.splice(index, 1)
      }
      return {
        ...state,
        cart: array
      }
    case 'RESET_CART':
      return {
        ...state,
        cart: []
      }
    case 'SET_DISCOUNT':
      /***
       * if cart has id 1 & id 7 and NOT id 8
       * then add id 8
       * remove id 7
       */
      let newCart = [...state.cart]

      if (
        newCart.find((item) => item.id === 1) &&
        newCart.find((item) => item.id === 7) &&
        !newCart.find((item) => item.id === 8)
      ) {
        newCart = newCart.filter((item) => item.id !== 7)

        newCart = [
          ...newCart,
          {
            id: 8,
            title: 'Gustav Adolfsbakelse',
            desc: 'Världens godaste bakelse',
            price: 19
          }
        ]
        return {
          ...state,

          cart: [...newCart]
        }
      } else if (
        newCart.find((item) => item.id === 8) &&
        !newCart.find((item) => item.id === 1)
      ) {
        newCart = newCart.filter((item) => item.id !== 8)

        newCart = [
          ...newCart,
          {
            id: 7,
            title: 'Gustav Adolfsbakelse',
            desc: 'Världens godaste bakelse',
            price: 40
          }
        ]
        return {
          ...state,

          cart: [...newCart]
        }
      } else {
        return {
          ...state,

          cart: [...state.cart]
        }
      }
    default:
      return state
  }
}
