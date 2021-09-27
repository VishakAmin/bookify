import {API, graphqlOperation } from 'aws-amplify'
import React,{useEffect, useState, useCallback} from 'react'
import { toast } from 'react-toastify';

import { createBookComment, deleteBookComment, deleteUserBooks } from '../graphql/mutations'
import { getUser, listUsers } from '../graphql/queries'
import { useAuth } from './contexts/AuthContext';
import MyBooksItem from './MyBooksItem'
import InfiniteScroll from "react-infinite-scroll-component";

const MyBooks = () => {
    const [books, setBooks] = useState([])
    const [nextToken, setNextToken] = useState(null)
    const [sortType, setSortType] = useState("")
    const {user} = useAuth()

    const fetchBooks = useCallback(async () => {
      
        try{
              const bookData = await API.graphql(graphqlOperation(getUser,{
                  id :  user.attributes.sub,
                  limit:3,
                  nextToken: nextToken
                 }
                 ))
                console.log(bookData.data.getUser.book.items)
                setBooks(books => [...books,...bookData.data.getUser.book.items])
                setNextToken(bookData.data.getUser.book.nextToken)
                console.log(bookData.data.getUser.book.nextToken);               
            }
        catch(err){
            console.log("Error fetching...", err);
        }
    },[user.attributes.sub])

    useEffect(() => {
        fetchBooks()
     },[fetchBooks])


    
    const handleSort = (e) => {
        setSortType(e.target.value)
        // console.log(sortType);
        // const sortArray = newBooks.sort((a,b) => {
        //     return new Date(a.createdAt) - new Date(b.createdAt)
        // })

        // console.log(sortArray);
        if(sortType === "oldest"){
            setBooks(books.reverse())             
        }
    }

    const removeBooks = async (id,title) => {
        try{
            await API.graphql(graphqlOperation(deleteUserBooks, 
                {
                    input:{
                        id:id
                    }
            }))
            fetchBooks()
            toast.error(`${title} Deleted Successfully`);
        }
        catch(err){
            console.log("Error in deleting",err);
        }
    }

    const addComment = async(id, comment ) => {
       await API.graphql(graphqlOperation(createBookComment, 
          { input:{
              comment:comment,
              bookCommentCommentBookId: id,
              userId: user.attributes.sub,
              userName : user.username
      }}))
      fetchBooks()
      }
      
    const deleteComment = async(id) => {
       await API.graphql(graphqlOperation(deleteBookComment, 
            { 
                input:{
                    id:id
            }
        }))
        fetchBooks()       
    }
    
    const fetchMoreData = async () => {
        console.log("FETCHMOREDATA",nextToken);
        await fetchBooks()
    }
    
    console.log("hgfhfghfgh",books);


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
            dataLength = {50}
            hasMore={true} 
            next={fetchMoreData}
            // endMessage ={
            //   <p className="text-center text-3xl font-semibold"> Yay! You have seen it all </p>
            // }
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
