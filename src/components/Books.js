import React, { useState } from 'react'
import axios from 'axios'

import BookItem from './BookItem'
import SearchBox from './UI/SearchBox'

const Books = () => {
    const [bookData, setbookData] = useState()
    const [searchKey, setSearchKey] = useState()
  

    //https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyCUjSXweCgK40ZnBNC_Z96mhHFD5wxhRg8

    // useEffect(() => {
    //   // axios.get("https://www.googleapis.com/books/v1/volumes?q=%22/*%22+orderBy=newest&maxResults=40&startIndex=1") 
    //   // .then((response) => {
    //   //       setbookData(response.data.items)           
    //   // })
    //   // .catch((error) => {
    //   //   console.log(error)
    //   // })
    // },[])
    
  const handleSubmit = () => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchKey}&key=${process.env.REACT_APP_API_KEY}`) 
      .then((response) => {
        setbookData(response.data.items)           
    })
    .catch((error) => {
    console.log(error)
    })
  }

  console.log(bookData);
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
