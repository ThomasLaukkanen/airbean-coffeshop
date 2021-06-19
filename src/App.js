import './App.css'
import { Route, Switch } from 'react-router-dom'
import Profile from './views/Profile'
import Menu from './views/Menu'
import Cart from './components/Cart'
import Status from './views/Status'
import About from './views/About'
import Nav from './components/Nav'
function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route path="/" exact component={Profile} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/menu" exact component={Menu} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/status" exact component={Status} />
        <Route path="/about" exact component={About} />
      </Switch>
    </div>
  )
}

export default App
