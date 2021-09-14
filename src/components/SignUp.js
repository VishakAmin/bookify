import React,{useState} from 'react'
import { Link, useHistory} from "react-router-dom"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { useAuth } from './contexts/AuthContext'

const schema = yup.object().shape({
  userName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required()
});


const SignUp = () => {
    const history = useHistory();
    const {signup} = useAuth()
    const { register, handleSubmit, formState:{ errors } } = useForm({
      resolver: yupResolver(schema)
    });
    
    
    const onSubmit = async (data) => {
        try{
          await signup( data.userName, data.password, data.email)
          history.push('/confirm-signup')
        }
        catch(err)
        {
            console.log(err);
        }
    }

    return (
        <div className='h-screen flex bg-gray-bg1'>
        <div className='w-full max-w-md m-auto bg-white rounded-lg py-10 px-16'>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"
            {...register("userName")}
            />
             <p>{errors.userName?.message}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
             Email
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="example@mail.com"
           {...register("email")}
            />
             <p>{errors.email?.message}</p>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"
            {...register("password")}
            />
             <p>{errors.password?.message}</p>
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Sign In
            </button>
            <Link to="/signin">
              <p className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                Sign In
              </p>
            </Link>
            {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
              Forgot Password?
            </a> */}
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2021 Geekyants Corp. All rights reserved.
        </p>
      </div>
      </div>
    )
}

export default SignUp
