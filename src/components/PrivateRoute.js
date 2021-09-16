import { Auth } from 'aws-amplify'
import React,{useState, useEffect} from 'react'
import { Redirect, Route} from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'


const PrivateRoute = ({component: Component, ...rest}) => {
    //const [signInUser, setSignInUser] = useState(null)
   // const [isLoading, setIsLoadingUser] = useState(true)
    const {user} = useAuth() 

    // Do get current user from context api.
   
    // if(isLoading){
    //     return <p>Loading........</p>
    // }

    console.log(user)

    return ( 
        <Route
            {...rest}
            render={ props => {
                    return user ? <Component {...props} /> : <Redirect to="/signin"/>
                }
            }
        >
        </Route>
    )
}

export default PrivateRoute
