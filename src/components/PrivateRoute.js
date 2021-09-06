import { Auth } from 'aws-amplify'
import React,{useState, useEffect} from 'react'
import { Redirect, Route} from 'react-router-dom'


const PrivateRoute = ({component: Component, ...rest}) => {
    const [signInUser, setSignInUser] = useState(null)
    const [isLoading, setIsLoadingUser] = useState(true)
    
    // Do get current user from context api.
     useEffect(() => {
        const fetchUser = async() => { 
            try{
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

    console.log(signInUser);

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
