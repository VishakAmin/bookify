import React, { useEffect, useState, useCallback, useReducer } from 'react'
import axios from 'axios'
import { API,graphqlOperation} from 'aws-amplify'
import { toast } from 'react-toastify';

import BookItem from './BookItem'
import SearchBox from './UI/SearchBox'
import { listBooks, listUsers } from '../graphql/queries'
import { createBook, createUserBooks, deleteUserBooks } from '../graphql/mutations'
import { useAuth } from './contexts/AuthContext';

function reducer(state, action) {
  switch (action.type) {
    case "fetch-books": 
       return action.payload
    default:
      break;
  }  
}

const Books = () => {
    const [bookData, setbookData] = useState()
    const [books, dispatch] = useReducer(reducer,[])
    const [searchKey, setSearchKey] = useState()
    const {user} = useAuth()

    const userId = user.attributes.sub

    const handleSubmit = () => {
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchKey}&key=${process.env.REACT_APP_API_KEY}`) 
        .then((response) => {
          console.log(response.data.items);
          setbookData(response.data.items)           
      })
      .catch((error) => {
      console.log(error)
      })
    }

      const fetchBooks = useCallback(async () => {
        try{
            const userData = await API.graphql(graphqlOperation(listUsers,{
              filter : { id : {eq: user.attributes.sub } }
            }))
            dispatch({type:"fetch-books", payload:userData.data.listUsers.items[0].book.items})
        }
        catch(err){
            console.log("Error fetching", err);
        }
    },[user.attributes.sub])

    const removeBook = async (title) => {
      const bookToRemove = books.filter((book) => book.book.title === title )
      try{
          await API.graphql(graphqlOperation(deleteUserBooks, 
              {
                  input : {
                      id : bookToRemove[0].id
                  }
          }))
          fetchBooks()
          toast.error(`${title} Deleted Successfully`);
      }
      catch(err){
          console.log("Error in deleting",err);
      }
    }

    const addBooks = async ({title, authors, description, published, image, link, etag}) => {
      try{
      
          const book = {title, authors, description, published, image, link, etag}
          const allBooks = await API.graphql(graphqlOperation(listBooks,{
              filter : {
                etag : {
                  eq: etag
                }
              }        
          }))

          console.log(allBooks);
          if(allBooks.data.listBooks.items.length > 0){
            await API.graphql(graphqlOperation(createUserBooks, {
              input: {
                userBooksUserId: userId,
                userBooksBookId: allBooks.data.listBooks.items[0].id
              }
            }))
            fetchBooks()       
          }
          else{
              const createBookResponse = await API.graphql(graphqlOperation(createBook, {input:book}))
              await API.graphql(graphqlOperation(createUserBooks, {
              input:{
                userBooksUserId: userId,
                userBooksBookId: createBookResponse.data.createBook.id
              }
            })) 
              fetchBooks()
          }
      }
      catch(err){
          console.log("Error in creating", err)
      }
    }

    useEffect(() => {
        fetchBooks()
    },[fetchBooks])

    return (
        <div>
           <div className="flex justify-center">
             <SearchBox  onChange={(e) => (setSearchKey(e.target.value))} onClick={handleSubmit}/>             
           </div>
           <div className= "flex flex-wrap content-start">     
            {bookData ? (
                bookData.map((item) => (
                  <BookItem 
                   key={item.id}
                   title = {item.volumeInfo.title}
                   authors = {item.volumeInfo.authors}
                   description={item.volumeInfo.description}
                   published ={item.volumeInfo.publishedDate}
                   image={item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : "N/A"}
                   link={item.volumeInfo.previewLink}
                   etag={item.id}
                   removeBook={removeBook}
                   addBook={addBooks}      
                   bookAdded ={books && books.map(book => book.book.title )}
                 />
             ))
            ) :
            (
            <div className= "pl-96 pt-10">
                <p className="font-bold	text-4xl text-gray-600" > All the books in the universe now under your finger tips..!!</p>
                </div>
            )
          }
            </div>            
        </div>
    )
}

export default Books;
