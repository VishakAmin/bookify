import React, { useEffect, useState } from 'react'
import Amplify, { API} from 'aws-amplify'
import {Link, useHistory} from "react-router-dom"
import axios from 'axios'
import BookItem from './BookItem'
import SearchBox from './UI/SearchBox'

const Books = () => {
    const [bookData, setbookData] = useState()
    const [searchKey, setSearchKey] = useState()
    const history = useHistory()

    //https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyCUjSXweCgK40ZnBNC_Z96mhHFD5wxhRg8

    useEffect(() => {
      // axios.get("https://www.googleapis.com/books/v1/volumes?q=%22/*%22+orderBy=newest&maxResults=40&startIndex=1") 
      // .then((response) => {
      //       setbookData(response.data.items)           
      // })
      // .catch((error) => {
      //   console.log(error)
      // })
    },[])
    
  const handleSubmit = () => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchKey}&key=${process.env.REACT_APP_API_KEY}`) 
      .then((response) => {
        setbookData(response.data.items)           
  })
  .catch((error) => {
    console.log(error)
  })
    }
    
    console.log(searchKey);
    console.log(bookData);
    return (
        <div>
           <div className="flex justify-center">
             <SearchBox  onChange={(e) => (setSearchKey(e.target.value))} onClick={handleSubmit}/>             
           </div>
           <div className= "flex flex-wrap content-start">     
            {bookData && bookData.map((item) => (
                 <BookItem 
                  key={item.id}
                  title = {item.volumeInfo.title}
                  authors = {item.volumeInfo.authors}
                  description={item.volumeInfo.description}
                  published ={item.volumeInfo.publishedDate}
                  image={item.volumeInfo.imageLinks.thumbnail ? item.volumeInfo.imageLinks.thumbnail : "N/A"}
                />
            ))}
            </div>            
        </div>
    )
}

export default Books
