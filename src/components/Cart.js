import './Cart.scss'
import dots from '../assets/dots.svg'
import arrow from '../assets/arrow.svg'
import polygon from '../assets/polygon.svg'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import {
  deleteItemCart,
  addItemCart,
  setOrders,
  resetCart
} from '../actions/coffeeAction'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

function Cart({ removeTotalCost, addTotalCost, totalSum, checkCartDiscount }) {
  const history = useHistory()
  const cart = useSelector((state) => state.cart)
  let user = useSelector((state) => state.user)
  const [filteredCart, setFilteredCart] = useState([])
  const dispatch = useDispatch()
  let loggedIn = useSelector((state) => state.loggedIn)

  useEffect(() => {
    function filteredMenu() {
      setFilteredCart(cart.filter((item, pos) => cart.indexOf(item) === pos))
    }

    filteredMenu()
  }, [cart])

  function sendOrder() {
    if (loggedIn) {
      async function postOrder() {
        let itemIdArr = []
        cart.map((item) => itemIdArr.push(item.id))

        let postBody = {
          userId: user.id,
          items: itemIdArr
        }
        let settings = {
          body: JSON.stringify(postBody),
          headers: {
            'Content-Type': 'Application/json'
          },
          method: 'POST'
        }
        const reponse = await fetch(
          'https://airbean-api.herokuapp.com/api/order',
          settings
        )
        const data = await reponse.json()
        dispatch(setOrders(data))
        console.log(data)
      }
      postOrder()
      history.push('/status')
      dispatch(resetCart())
    } else {
      history.push('/profile')
    }
  }

  return (
    <div className="cartWrapper">
      <img src={polygon} alt="polygon" className="polygon" />
      <h1>Din beställning</h1>

      <ul>
        {cart.length < 1 ? (
          <h4 className="emptyCart">
            Din korg är tom - men så behöver det inte vara
          </h4>
        ) : (
          ''
        )}

        {filteredCart.map((cartItem, index) => (
          <li key={index}>
            <div>
              <div className="cartTitleWrapper">
                <span>{cartItem.title}</span>
                <br />
                <small>{cartItem.price}kr</small>
              </div>
              <div className="divDots">
                <img src={dots} alt="dots" className="dots" />
              </div>

              <div className="amountPicker">
                <img
                  src={arrow}
                  className="upArrow"
                  alt="Up arrow"
                  onClick={() => {
                    dispatch(addItemCart(cartItem))
                    addTotalCost(cartItem)
                    checkCartDiscount()
                  }}
                />
                <span>{cart.filter((item) => item === cartItem).length}</span>
                <img
                  src={arrow}
                  className="downArrow"
                  alt="Down arrow"
                  onClick={() => {
                    dispatch(deleteItemCart(cartItem))
                    removeTotalCost(cartItem)
                    checkCartDiscount()
                  }}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <div className="totalAmountWrapper">
          <h2>Total</h2>
          <img src={dots} alt="dots" />
          <h2>{totalSum}kr</h2>
        </div>
        <small>inkl moms + drönarleverans</small>
      </div>

      <button onClick={sendOrder}>
        {!loggedIn ? 'Vänligen Logga In' : 'Take my money!'}
      </button>
    </div>
  )
}

export default Cart
