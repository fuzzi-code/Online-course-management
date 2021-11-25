import React from 'react'
import AllEvents from './AllEvents'
import AddEvent from './AddEvent';
import HeaderNavbar from "./Navbar"
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';


function LandingPage() {
    return (
        <Router>
         <Switch>
            <Route exact path='/' component={AllEvents}></Route>
            <Route exact path='/addEvent' component={AddEvent}></Route>
        </Switch>
        </Router>
    )
}

export default LandingPage
