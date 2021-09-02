import { Auth } from 'aws-amplify'
import React,{useEffect,useState} from 'react'
import {NavLink, useHistory,Link} from "react-router-dom" 

const Navbar = () => {
    
    const [signInUser, setSignInUser] = useState(null)
    const history = useHistory();

    useEffect(() => {
        let fetchUser = async() => {
            try{
                let user =  await Auth.currentAuthenticatedUser();
                await setSignInUser(user)
            }
            catch(err) {
                console.log(err);
            }
        }
        fetchUser()
    },[])

    const onClickHandler = async () => {
        try{
            await Auth.signOut()
            history.push("/signin")
          }
          catch(error) {
            console.log("Error in Logging Out ",error);
          }
    }
    
    return (
    <div className="w-full text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800">
          <div x-data="{ open: false }" className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
          <div class="p-4 flex flex-row items-center justify-between">
            <p className="text-3xl font-medium" >BOOKIFY</p>
            </div>
            <nav className="flex-col flex-grow pb-4 md:pb-0 hidden md:flex md:justify-end md:flex-row">
              {signInUser ? 
                <>
                  <Link className="px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" to="/">Home</Link>
                  <Link className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" onClick={onClickHandler}>Logout</Link>
                </>
              :
              <>
                  <Link className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" to="signin">Sign In</Link>
                  <Link className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" to="signup">Sign Up</Link>
             </>
              }
            </nav>
          </div>
        </div>
    
    )
}    

export default Navbar

    