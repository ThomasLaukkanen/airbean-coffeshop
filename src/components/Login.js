import './Login.scss'
import logoMini from '../assets/logoMini.svg'
import { setLogin } from '../actions/coffeeAction'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { setOrders } from '../actions/coffeeAction'
import { setEmailAccount } from '../actions/coffeeAction'

function Login() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  let user = useSelector((state) => state.user)
  const dispatch = useDispatch('')

  async function getOrders() {
    const promise = await fetch(
      `https://airbean-api.herokuapp.com/api/order/history/${user.id}`
    )
    const data = await promise.json()

    dispatch(setOrders(data))
    dispatch(setEmailAccount(email))
  }

  async function createUser(event) {
    event.preventDefault()
    let bodyData = { username: username, email: email }
    let settings = {
      body: JSON.stringify(bodyData),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }

    const response = await fetch(
      'https://airbean-api.herokuapp.com/api/account',
      settings
    )
    const data = await response.json()

    if (data.success) {
      dispatch(setLogin(true))
      sessionStorage.setItem('loggedIn', true)
      if (user !== undefined) {
        getOrders()
      }
    } else if (data.success === false) {
      alert(data.message)
    }
  }

  return (
    <div className="loginWrapper">
      <img src={logoMini} alt="logo" />
      <h1>Välkommen till AirBean-familjen!</h1>
      <p>
        Genom att skapa ett konto nedan kan du spara och se din orderhistorik.
      </p>
      <form onSubmit={createUser}>
        <label>
          <small>Namn</small>
          <br />
          <input
            onKeyUp={(event) => setUsername(event.target.value)}
            type="text"
            placeholder="Sixten Kaffelövér"
            required
          />
        </label>
        <br />
        <label>
          <small>Epost</small>
          <br />
          <input
            onKeyUp={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="sixten.kaffelover@zocom.se"
            required
          />
        </label>
        <br />
        <label>
          <input type="radio" required />
          <small>GDPR OK!</small>
        </label>
        <br />
        <button>LOGGA IN</button>
      </form>
    </div>
  )
}

export default Login
