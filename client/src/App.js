import {useState} from 'react'
import SignUp from "./auth/signUp"
import "./App.css"
import LandingPage from "./components/landingPage";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import AllEvents from "./components/AllEvents";
import AddEvent from "./components/AddEvent";
import HeaderNavbar from "./components/Navbar";
import Login from './auth/login';

import PrivateRoute from './components/routing/PrivateRoute';

function App() {
  const [userAuth,setUserAuth]=useState(false)
  return (
    <Router>
    <HeaderNavbar/>
    <Switch>
            <Route exact path='/' component={AllEvents}></Route>
            <Route exact path='/addEvent' component={Login}></Route>
    </Switch>
    </Router>
  )
}

export default App;
