import { Auth } from 'aws-amplify'
import React,{useState, useEffect} from 'react'
import { Redirect, Route} from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'


const PrivateRoute = ({component: Component, ...rest}) => {
   // const [isLoading, setIsLoadingUser] = useState(true)
    const {user} = useAuth() 
    // if(isLoading){
    //     return <p>Loading........</p>
    // }

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
