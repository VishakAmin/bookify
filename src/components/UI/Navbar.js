import { Storage, API, graphqlOperation } from 'aws-amplify'
import React,{useState, useEffect} from 'react'
import {useHistory,Link} from "react-router-dom" 
import { getPicture } from '../../graphql/queries'


import { useAuth } from '../contexts/AuthContext'

const Navbar = () => {
    
  const { logout,  user} = useAuth()
  const [imageData, setImageData] = useState()
  const [image, setImage] = useState("")

    const history = useHistory();
    const onClickHandler = async () => {
        try{
            await logout()
            history.push("/signin")
          }
          catch(error) {
            console.log("Error in Logging Out ",error);
          }
    }

    useEffect(() =>  {
      console.log(user);
      const getPhoto = async () => {
        user && API.graphql(graphqlOperation(getPicture,{
          id:  user.attributes.sub
        })).then(response => {
          console.log(response);
          setImageData(response.data.getPicture.file)
        })
     
      }
     
      getPhoto()
    },[user])
    
    imageData && Storage.get(imageData.key).then(response => {
      setImage(response)
    })
   
  console.log(image);

    return (
    <div className="w-full text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800">
          <div x-data="{ open: false }" className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
          <div className="p-4 flex flex-row items-center justify-between">
            <p className="text-3xl font-medium" >BOOKIFY</p>
            </div>
        
            <nav className="flex-col flex-grow pb-4 md:pb-0 hidden md:flex md:justify-end md:flex-row">
              {user  ? 
                <>
                  <Link  className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" to="/">Home</Link>
                  <Link  className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" to="/mybooks">Books</Link>
                  <button className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" onClick={onClickHandler}>Logout</button>
                  <img className="inline object-cover ml-3  w-10 h-10 rounded-full" src={image} alt="Profile"/>
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
export const getUser = /* GraphQL */ `
  query GetUser(
    $id: ID!
    $limit: Int
    $nextToken: String
  ) {
    getUser(id: $id) {
      id
      book(limit: $limit, nextToken: $nextToken) {

        nextToken
        items {
          id
          createdAt
          updatedAt
          book {
          title
          id
          authors
          createdAt
          description
          etag
          image
          link
          published
          updatedAt
          bookComments {
            items {
              comment
              userName
              userId
              updatedAt
              id
              createdAt
            }
          }
        }
        }
        
      }
      createdAt
      updatedAt
    } 
  }
`;