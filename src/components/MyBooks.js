import {API, graphqlOperation } from 'aws-amplify'
import React,{useEffect, useState, useCallback} from 'react'
import { toast } from 'react-toastify';
import InfiniteScroll from "react-infinite-scroll-component";

import { createBookComment, deleteBookComment, deleteUserBooks } from '../graphql/mutations'
import { useAuth } from './contexts/AuthContext';
import MyBooksItem from './MyBooksItem'
import {useFetchhook} from '../hooks/useFetchHook';
import { comment } from 'postcss';


const MyBooks = () => {
  
    const [nextToken, setNextToken] = useState(undefined)
    const [sortType, setSortType] = useState("")
    const {user} = useAuth()
    const [res, fetchBooks] = useFetchhook(user.attributes.sub, nextToken)
    const [books, setBooks] = useState([])

    useEffect(() => { setBooks(book => [...book, ...res.books]) }, [res.books])

    // console.log("In Mybooks",fetchBooks());

    // const fetchBooks = useCallback(async () => {
      
    //     try{
    //           const bookData = await API.graphql(graphqlOperation(getUser,{
    //               id :  user.attributes.sub,
    //               limit:3,
    //               nextToken: nextToken
    //              }
    //              ))
    //             console.log(bookData.data.getUser.book.items)
    //             setBooks(books => [...books,...bookData.data.getUser.book.items])
    //             setNextToken(bookData.data.getUser.book.nextToken)
    //             console.log(bookData.data.getUser.book.nextToken);               
    //         }
    //     catch(err){
    //         console.log("Error fetching...", err);
    //     }
    // },[user.attributes.sub])

    // useEffect(() => {
    //     fetchBooks()
        
    //  },[fetchBooks])


    
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

    const removeBooks = async (id,title) => {
        try{
            await API.graphql(graphqlOperation(deleteUserBooks, 
                {
                    input:{
                        id:id
                    }
            }))
            setBooks(books.filter(book => book.id !== id))
            toast.error(`${title} Deleted Successfully`);
            console.log("INSIDE Remve",books);
        }
        catch(err){
            console.log("Error in deleting",err);
        }
    }

    const addComment = async(id, comment ) => {
       const addCommentresponse = await API.graphql(graphqlOperation(createBookComment, 
          { input:{
              comment:comment,
              bookCommentCommentBookId: id,
              userId: user.attributes.sub,
              userName : user.username
      }}))
        const newComment = {
                comment: comment,
                createdAt: addCommentresponse.data.createBookComment.createdAt,
                id: addCommentresponse.data.createBookComment.id,
                updatedAt:addCommentresponse.data.createBookComment.updatedAt,
                userId: user.attributes.sub,
                userName : user.username
            }  
            console.log(books.map(book => book.book.bookComments.items.push(newComment)));
            console.log(addCommentresponse.data.createBookComment);

      }
      
    const deleteComment = async(id, bookId) => {
    //    await API.graphql(graphqlOperation(deleteBookComment, 
    //         { 
    //             input:{
    //                 id:id
    //         }
    //  
          console.log("CHECK", id);
        //   console.log((books.filter(book =>  (
        //   book.book.bookComments.items.filter(bc => bc.id !== id)
        //  ))
        // ))

        //setBooks(books.filter(book => book.id !== id))
    //    console.log(books.book.bookComments.forEach(function(items) {
    //       items = items.filter(bc => bc.id !== id)  
    //    }))

    
//       console.log("NEW",newArray);
       // setBooks(books.book.bookComments.items.filter(comment => comment.id !== id))     

    console.log(books.forEach(book => book.book.bookComments.items.some(bc => bc.id !== id)));

    }
    
    const fetchMoreData = async () => {
        setNextToken(res.nextNextToken)
        console.log("FETCHMOREDATA",res);
        console.log("FETCHMOREDATA ",nextToken);
    }
    
    console.log("sasasa",books);

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
                hasMore={res.nextNextToken === null ? false : true } 
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
