import React, { useEffect, useState } from 'react'
import Amplify, { API, Auth} from 'aws-amplify'
import {Link, useHistory} from "react-router-dom"

const Books = () => {


    const [bookData, setbookData] = useState()
    const history = useHistory()

    useEffect(() => {
    }, [])
    const handleSignOut = async () => {
        try{
          await Auth.signOut()
          history.push("/signin")
        }
        catch(error) {
          console.log("Error in Logging Out ",error);
        }
      }
    
    return (
        <div>
           <h1>This is Main Page</h1> 
           <div>
               <button type="button" onClick={handleSignOut}>Sign Out</button>
           </div>
        </div>
    )
}

export default Books
