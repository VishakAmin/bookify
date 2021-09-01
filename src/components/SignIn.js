import { Auth } from 'aws-amplify'
import React,{useState} from 'react'
import { Link, useHistory } from 'react-router-dom';


const SignIn = () => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory()


    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
          await Auth.signIn(userName, password)
          history.push("/")
      }
      catch(err){
          console.log(err);
      }

    }
    
    return (
        <div className='h-screen flex bg-gray-bg1'>
        <div className='w-full max-w-md m-auto bg-white rounded-lg py-10 px-16'>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input 
            onChange= {(e) => setUserName(e.target.value)}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
             id="username"
             type="text" 
             placeholder="Username"/>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"
              onChange= {(e) => setPassword(e.target.value)}        
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Sign In
            </button>
            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
              Forgot Password?
            </a>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2021 Geekyants Corp. All rights reserved.
        </p>
      </div>
      </div>


    )
}

export default SignIn
