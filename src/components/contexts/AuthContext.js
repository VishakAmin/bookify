import { Auth } from "aws-amplify";
import React,{useState,useEffect, useContext} from "react";

const AuthContext = React.createContext()
export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {

    const [signInUser, setSignInUser] = useState(null)
    const [isLoading, setIsLoadingUser] = useState(false)
    const [isSignIn, setIsSignIn] = useState(false)

    useEffect(() => {
        const fetchUser = async() => { 
            try{
                let user =  await Auth.currentAuthenticatedUser();
                setSignInUser(user)
                setIsSignIn(true)
                setIsLoadingUser(true)
            }
            catch(err) {
                setIsLoadingUser(false)
                console.log(err);
            }
        }
        fetchUser()
    },[])


    function signin(username, password) {
        setIsSignIn(true)
        Auth.signIn(username, password)
    }
    function signup(username, password, email) {
        return Auth.signUp({
            username:username,
            password:password,
            attributes:{
              email:email
            }
          })   
    }

    function logout(){
        setIsSignIn(false)
        Auth.signOut() 
        
    }

    const contextValue = {
        signInUser,      
        signin,
        signup,
        logout,
        isLoading,
        isSignIn
      
    }

    return (
        <AuthContext.Provider value={contextValue}>
           { children}
        </AuthContext.Provider>
    )
}


export default AuthContext;