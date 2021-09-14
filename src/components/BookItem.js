import React, { useEffect, useState, useCallback } from 'react'
import {Auth} from 'aws-amplify'


const BookItem = ({title, authors, description, published, image, link, books,bookAdded, bookId, removeBook, addBook}) => {
    const [signInUser, setSignInUser] = useState("")

    
    useEffect(() => {
        const fetchUser = async() => { 
            try{
                let user =  await Auth.currentAuthenticatedUser();
                await setSignInUser(user.attributes.sub)
            }
            catch(err) {
                console.log(err);
            }
        }
        fetchUser()
     },[])

    const addBooks = async () => {
        console.log("Inside Add", signInUser);
       addBook({title, authors, description, published, image, link, signInUser})
    }

    const removeBooks =  (e) => {
        removeBook(e.target.name)
    }

    return (
     <div className="max-w-xs w-60 m-7 rounded overflow-hidden shadow-xl card m-2  border-gray-500 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-300">
      <img className="w-full h-60" src={image} alt="title"/>
        <div className="px-6 py-4 ">
            <div className="font-bold text-sm mb-2">{title}</div>
            <p className="text-gray-700 text-sm pb-2">
               <strong>Authors:</strong> {authors ? authors : "-"}
            </p>
            <p className="text-gray-700 text-sm ">   
                <strong>Published:</strong> {published ? published : "Not Available"}    
            </p>
        </div>
            <div className="px-6 pt-4 pb-4">
                { 
                  bookAdded && bookAdded.includes(title) ? 
                (  
                    <button onClick={removeBooks} name={title} id="animate.css" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                      Remove Book
                    </button>
                )
                : 
                (
                    <button onClick={ addBooks} id="animate.css" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Add Book
                    </button>
                )
                }
              
          </div>
          
        </div>
    
    )
}

export default BookItem
