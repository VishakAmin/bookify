import {API, graphqlOperation } from 'aws-amplify'
import React,{useEffect, useState, useContext} from 'react'
import { toast } from 'react-toastify';
import InfiniteScroll from "react-infinite-scroll-component";
import _ from "lodash";

import { createBookComment, deleteBookComment, deleteUserBooks } from '../graphql/mutations'
import { useAuth } from './contexts/AuthContext';
import MyBooksItem from './MyBooksItem'
import {useFetchhook,removeBooksApi, deleteCommentApi, createCommentApi} from '../hooks/apis';
import { BookContext } from '../components/contexts/BookContext';


const MyBooks = () => {
    const [state, dispatch] = useContext(BookContext)
    const [nextToken, setNextToken] = useState(undefined)
    const [sortType, setSortType] = useState("")
    const {user} = useAuth()
    const res = useFetchhook(user.attributes.sub, nextToken)
    const [books, setBooks] = useState([])

    useEffect(() => { 
        setBooks(book => [...book, ...res.books]) 
        dispatch({type: "FETCH_BOOKS", payload:res.books})
    }, [res.books])

  
    const handleSort = (e) => {
        setSortType(e.target.value)
        // console.log(sortType);
        // const sortArray = newBooks.sort((a,b) => {
        //     return new Date(a.createdAt) - new Date(b.createdAt)
        // })

        // console.log(sortArray);
        if(sortType === "oldest"){
            res.books.reverse()           
        }
    }

    const removeBooks =  (id,title) => {

        try{
            removeBooksApi(id, title)
            setBooks(books.filter(book => book.id !== id))
            dispatch({type: "REMOVE_BOOKS", payload:id})  
            toast.error(`${title} Deleted Successfully`)
        }
        catch(err){
            console.log(err);
        }
    }
 
    const addComment = async(id, comment ) => {
    
    try{
        createCommentApi(id, comment, user.attributes.sub,user.username).then(
            response => {
                const newComment = {
                    comment: comment,
                    createdAt: response.data.createBookComment.createdAt,
                    id: response.data.createBookComment.id,
                    updatedAt:response.data.createBookComment.updatedAt,
                    userId: user.attributes.sub,
                    userName : user.username
                }  

                const newArray = [...books]
                newArray.forEach(book => {
                  if (book.book.id === id) {
                      book.book.bookComments.items.push(newComment)
                  }  
                })
                console.log(response.data.createBookComment);
                setBooks(newArray)
            }
         )
    }
    catch(err){
            console.log(err);
        }      
    }
      
    const deleteComment = async(id, bookId) => {
        try{
            deleteCommentApi(id)
            const booksCopy = _.cloneDeep(books)
                const bookIndex = booksCopy.findIndex(book => book.book.id === bookId)
                console.log(bookIndex);
                const commentIndex = booksCopy[bookIndex].book.bookComments.items.findIndex(item => item.id === id);            
                console.log(commentIndex);            
                booksCopy[bookIndex].book.bookComments.items.splice(commentIndex, 1)
                console.log(booksCopy);
                setBooks(booksCopy)
                toast.error(`Comment Deleted Successfully`)
        }
        catch(err){
            console.log(err);
        }

          console.log("CHECK", id);
      
    // TODO  How to actually filter the state

             // deepclone
             // Find the index using Findindex 
            //my method 
            // const newArray = [...books]
            // newArray.forEach(book => {
            //     book.book.bookComments.items = book.book.bookComments.items.filter(bc => bc.id !== id)
            // })
            // setBooks(newArray)
    }
    
    const fetchMoreData =  () => {
        console.log("FETCHMOREDATA",res);
        setNextToken(res.nextNextToken)
        console.log("FETCHMOREDATA ",nextToken);
    }
    
    console.log("sasasa",state.books);

    return ( 
        <> 
        <div className="flex justify-end pr-56">
        <label className="block text-left w-36 ">
        <span className="text-gray-700">Sort by Added Date</span>
        <select className="form-select block w-full mt-1 border rounded" onChange={handleSort} defaultValue="choose">
            <option disabled value="choose" >Choose</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option> 
        </select>
        </label>
        </div>
            {books && books.length > 0 ? (
            <InfiniteScroll
                dataLength = {books.length}
                hasMore={!(res.nextNextToken === null) } 
                next={fetchMoreData}
                endMessage ={
                  <p className="text-center text-3xl font-semibold"> Yay! You have seen it all </p>
                }
                loader={ 
                <h4 className="text-center text-3xl font-semibold	">Loading...</h4>
            }
         > 
            {books.map((book, index) => (
                    <MyBooksItem 
                    key={index}
                    bookid={book.book.id}
                    id={book.id}
                    title={book.book.title}
                    authors={book.book.authors}
                    description={book.book.description}
                    image={book.book.image}
                    link={book.book.link}
                    published={book.book.published}
                    comments={book.book.bookComments.items}
                    userId = {user.attributes.sub}
                    removeBooks = {removeBooks}
                    addComment={addComment}
                    deleteComment = {deleteComment}
                    />
             ))}
             </InfiniteScroll>      
            ) :  
            (
                <div>
                    <p className="text-center text-4xl font-bold"> No Books Added</p>
                </div>                    
            )}
        
        </>

    )
}

export default MyBooks
