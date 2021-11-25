import React from 'react'
import {Redirect,Route} from 'react-router-dom'

function PrivateRoute({component:Component,...rest}) {
    console.log(Component)
    return (
        <div>
            <Route
            {...rest}
            render={(props)=>{
                console.log(localStorage)
                localStorage.getItem("authToken")?(
                    <Component {...props}/>
                ):(
                    <Redirect to="/signup"/>
                )
            }}
            />
        </div>
    )
}

export default PrivateRoute
