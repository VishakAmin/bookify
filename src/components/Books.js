import React, { useEffect, useState, useCallback, useReducer } from 'react'
import axios from 'axios'
import { API,graphqlOperation} from 'aws-amplify'
import { toast } from 'react-toastify';

import BookItem from './BookItem'
import SearchBox from './UI/SearchBox'
import { getUser, listBooks, listUsers } from '../graphql/queries'
import { createBook, createUserBooks, deleteUserBooks, userBooksHandler } from '../graphql/mutations'
import { useAuth } from './contexts/AuthContext';
import InfiniteScroll from "react-infinite-scroll-component";


function reducer(state, action) {
  switch (action.type) {
    case "fetch-books": 
       return action.payload
    default:
      break;
  }  
}

const Books = () => {
    const [bookData, setbookData] = useState([])
    const [totalItems, setTotalItems] = useState()
    const [books, dispatch] = useReducer(reducer,[])
    const [searchKey, setSearchKey] = useState()
    const [startIndex, setStartIndex] = useState(0)
    const [hasMore, setHasMore] = useState(true)

    const {user} = useAuth()
    const userId = user.attributes.sub

    const handleSubmit = () => {
      console.log("Inside",startIndex);
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchKey}&maxResults=12&startIndex=${startIndex}&key=${process.env.REACT_APP_API_KEY}`) 
        .then((response) => {
          console.log(response.data);
          console.log(startIndex)
          setbookData(bookData => [...bookData,...response.data.items])   
          setTotalItems(response.data.totalItems)
      })
      .catch((error) => {
      console.log(error)
      })
    }

      const fetchBooks = useCallback(async () => {
        try{
            const userData = await API.graphql(graphqlOperation(getUser,{
               id : user.attributes.sub 
            }))
            console.log(userData.data.getUser.book.items);
            dispatch({type:"fetch-books", payload:userData.data.getUser.book.items})
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
            await API.graphql(graphqlOperation(userBooksHandler, {
              input: {
                userBooksUserId: user.attributes.sub,
                userBooksBookId: allBooks.data.listBooks.items[0].id
              }
            }))
            fetchBooks()       
          }
          else{
              const createBookResponse = await API.graphql(graphqlOperation(createBook, {input:book}))

              await API.graphql(graphqlOperation(userBooksHandler, {
              input:{
                userBooksUserId: user.attributes.sub,
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

    const fetchMoreData = async () => {
         setStartIndex(startIndex+12)
         handleSubmit()
    }

    const onSearchClick = async () => {
       setStartIndex(0)
       setbookData([])
       handleSubmit()
    }

    const handleChange = (e) => {
     setSearchKey(e.target.value)
     setStartIndex(prev => 0)
    }
    
 //   console.log(bookData,startIndex,totalItems);
    
    return (
        <div>
           <div className="flex justify-center">
             <SearchBox  onChange={handleChange} onClick={onSearchClick}/>             
           </div>
           {
             bookData && totalItems ? (
             <InfiniteScroll
             dataLength = {bookData.length}
             hasMore={bookData.length < totalItems} 
             next={fetchMoreData}
             endMessage ={
               <p className="text-center text-3xl font-semibold"> Yay! You have seen it all </p>
             }
             loader={ 
              <h4 className="text-center text-3xl font-semibold	">Loading...</h4>
            }
          > 
           <div className= "flex flex-wrap content-start">                
            {(
                bookData.map((item, index) => (
                  <BookItem 
                    key={index}
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
            ) 
           }
        </div>
        </InfiniteScroll>
        )
           :
            (
            <div className= "pl-96 pt-10">
                <p className="font-bold	text-4xl text-gray-600" > All the books in the universe now under your finger tips..!!</p>
                </div>
            )
          }
            </div>     
          
    )
}

export default Books;
