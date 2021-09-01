import { Auth } from 'aws-amplify'
import React,{useState, useEffect} from 'react'
import { Redirect, Route} from 'react-router-dom'
import Books from './Books'
import Todo from './Todo'

const PrivateRoute = ({children, ...rest}) => {

    
    const [signInUser, setSignInUser] = useState(null)
    const [isLoading, setIsLoadingUser] = useState(true)

    useEffect(() => {
        let fetchUser = async() => {
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

    return (
        <Route {...rest} render = {({location}) => {
            return signInUser ? <Books/>
            : <Redirect to={{ 
                pathname: "/signin",
                state: {from: location}
            }} /> 
        }} />
    )
}

export default PrivateRoute
