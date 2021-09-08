import { Auth } from 'aws-amplify'
import React,{useState, useEffect} from 'react'
import { Redirect, Route} from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'


const PrivateRoute = ({component: Component, ...rest}) => {
    const [signInUser, setSignInUser] = useState(null)
    const [isLoading, setIsLoadingUser] = useState(true)
    const {userSignedIn} = useAuth() 

    // Do get current user from context api.
     useEffect(() => {
        const fetchUser = async() => { 
            try{
                await userSignedIn()
                let user =  await Auth.currentAuthenticatedUser();
                await setSignInUser(user)
                setIsLoadingUser(false)
            }
            catch(err) {
                setIsLoadingUser(false)
                console.log(err);
            }
        }
        fetchUser()
     },[])

    if(isLoading){
        return <p>Loading........</p>
    }

    return (
        <Route
            {...rest}
            render={ props => {
                    return signInUser ? <Component {...props} /> : <Redirect to="/signin"/>
                }
            }
        >
        </Route>
    )
}

export default PrivateRoute
