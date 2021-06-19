import navicon from '../assets/navicon.svg'
import naviconC from '../assets/naviconC.svg'
import './Nav.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import header from '../assets/header.svg'

function Nav() {
  const [open, setOpen] = useState(navicon)

  // let navWrapper = document.querySelector('.navWrapper')

  function toggleNav() {
    // navWrapper.classList.toggle('showNav')
    open === navicon ? setOpen(naviconC) : setOpen(navicon)
  }
  return (
    <header>
      <img className="navFlowers" src={header} alt="flowers" />

      <button className="buttonMenu" onClick={toggleNav}>
        <img src={open} alt="nav" />
      </button>
      <div className={`navWrapper ${open === naviconC ? 'showNav' : ''}`}>
        <nav className="navMain">
          <ul>
            <li>
              <Link onClick={toggleNav} to="/menu">
                Menu
              </Link>
            </li>
            <div className="line" />
            <li>
              <Link onClick={toggleNav} to="/about">
                Vårt kaffe
              </Link>
            </li>
            <div className="line" />
            <li>
              <Link onClick={toggleNav} to="/profile">
                Min profil
              </Link>
            </li>
            <div className="line" />
            <li>
              <Link onClick={toggleNav} to="/status">
                Orderstatus
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
export default Nav
