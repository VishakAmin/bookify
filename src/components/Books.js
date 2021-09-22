import React, { useEffect, useState, useCallback, useReducer } from 'react'
import axios from 'axios'
import { Auth, API,graphqlOperation} from 'aws-amplify'
import { toast } from 'react-toastify';

import BookItem from './BookItem'
import SearchBox from './UI/SearchBox'
import { listBooks, listUsers } from '../graphql/queries'
import { createBook, createUserBooks, deleteBook } from '../graphql/mutations'
import { useAuth } from './contexts/AuthContext';

function reducer(state, action) {
  switch (action.type) {
    case "fetch-books": 
       return [action.payload] 
    default:
      break;
  }  
}

const Books = () => {
    const [bookData, setbookData] = useState()
    const [books, dispatch] = useReducer(reducer,[])
    const [searchKey, setSearchKey] = useState()
    const [myBooks, setMyBooks] = useState()
    const {user} = useAuth()

    let userId = user.attributes.sub

  const handleSubmit = () => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchKey}&key=${process.env.REACT_APP_API_KEY}`) 
      .then((response) => {
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
        console.log("TIMESS",userData.data.listUsers.items[0].book.items);

    //    setMyBooks(userData.data.listUsers.items[0].book.items)

        // const booksData = await API.graphql(graphqlOperation(listBooks,{
        //   filter : { userId : {eq: user.attributes.sub } }
        // }))


       

        dispatch({type:"fetch-books", payload:userData.data.listUsers.items[0].book.items})
        // setMyBooks(todoData.data.listBooks.items);
    }
    catch(err){
        console.log("Error fetching", err);
    }
},[])

const removeBook = async (title) => {
  try{
      const book  = books.filter(item => item.title === title)
      await API.graphql(graphqlOperation(deleteBook, {input:{id:book[0].id}}))
      //setbookData(bookData.filter(item => item.volumeInfo.title !== book[0].title))
      fetchBooks()
      toast.error(`${title} Removed Successfully`);
  }
  catch(err){
      console.log("Error in deleting",err);
  }
}

const addBooks = async ({title, authors, description, published, image, link}) => {
  try{
    console.log("USER",userId);
      const book = {title, authors, description, published, image, link}
      let  allBooks = await API.graphql(graphqlOperation(listBooks,{
          filter : {
            title : {
              eq: title
            }
          }        
      }))
      console.log(allBooks.data.listBooks.items[0]);
      console.log(user.attributes.sub);

      if(allBooks.data.listBooks.items.length > 0){
        let response = await API.graphql(graphqlOperation(createUserBooks, {
          input: {
            userBooksUserId: userId,
            userBooksBookId: allBooks.data.listBooks.items[0].id
          }
        }))
        console.log(response);          
      }
      else{
        
          let response = await API.graphql(graphqlOperation(createBook, {input:book}))
          console.log(response.data.createBook.id);
          let response_ = await API.graphql(graphqlOperation(createUserBooks, {
           input:{
             userBooksUserId: userId,
             userBooksBookId: response.data.createBook.id
           }
         })) 
         console.log(response, response_);
      }

  }
  catch(err){
      console.log("Error in creating", err)
  }
}
console.log("REDUCER", books[0]);

useEffect(() => {
    fetchBooks()
},[])

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
                   image={item.volumeInfo.imageLinks.thumbnail ? item.volumeInfo.imageLinks.thumbnail : "N/A"}
                   link={item.volumeInfo.previewLink}
                   bookAdded ={books[0] && books[0].map(book => book.book.title )}
                   bookId = {books[0] && books[0].map(book => book.book.id)}
                   books={books}
                  removeBook={removeBook}
                  addBook={addBooks}
                 
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

export default Books
