import {Auth, API, graphqlOperation } from 'aws-amplify'
import React,{useEffect, useState, useCallback} from 'react'
import { toast } from 'react-toastify';

import { deleteBook,createBookComment, deleteBookComment } from '../graphql/mutations'
import { listUsers } from '../graphql/queries'
import { useAuth } from './contexts/AuthContext';
import MyBooksItem from './MyBooksItem'


const MyBooks = () => {
    const [books, setBooks] = useState([])
    const [sortType, setSortType] = useState("")
    const {user} = useAuth()

    useEffect(() => {
    console.log(user.attributes.sub);
    fetchBooks()
     },[])

    
    const handleSort = (e) => {
        setSortType(e.target.value)

        const newBooks = [...books]
        console.log(sortType);
        const sortArray = newBooks.sort((a,b) => {
            return new Date(a.createdAt) - new Date(b.createdAt)
        })

        console.log(sortArray);
        if(sortType === "newest"){
            setBooks(sortArray)
        }
        else{
            setBooks(sortArray.reverse())
        }
    }

    const fetchBooks = useCallback(async () => {
       
        try{
            const userData = await API.graphql(graphqlOperation(listUsers,{
                filter : { id : {eq: user.attributes.sub } }
              }))

              console.log("TIMESS",userData.data.listUsers.items[0]);

              setBooks(userData.data.listUsers.items[0].book);
        }
        catch(err){
            console.log("Error fetching...", err.errors);
        }
    },[])

    const removeBooks = async (id,title) => {
        try{
            await API.graphql(graphqlOperation(deleteBook, 
                {
                    input:{
                        id:id
                    }
            }))
            setBooks(books.filter(book => book.id !== id))
            toast.error(`${title} Deleted Successfully`);
        }
        catch(err){
            console.log("Error in deleting",err);
        }
    }


    const addComment = async(id, comment ) => {
        let response = await API.graphql(graphqlOperation(createBookComment, 
          { input:{
              comment:comment,
              bookCommentCommentBookId: id
      }}))
      fetchBooks()
      }
      
    const deleteComment = async(id) => {
        let response = await API.graphql(graphqlOperation(deleteBookComment, 
            { input:{
                    id:id
            }}))
        fetchBooks()
        console.log(response, id);   
    }
    
    console.log("sasasasasasasasasasasas",  books);

    return ( 
        <> 
        <div className="flex justify-end pr-56">
        <label className="block text-left w-36 ">
        <span className="text-gray-700">Sort by Added Date</span>
        <select className="form-select block w-full mt-1 border rounded" onChange={handleSort}>
            <option value="" disabled selected>Choose</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option> 
        </select>
        </label>
        </div>
            {books && books.book.items.length > 0 ? (
             books.book.items.map((book) => (
                    <MyBooksItem 
                    key={book.book.id}
                    id={book.book.id}
                    title={book.book.title}
                    authors={book.items[0].book.items.book.authors}
                    description={book.items[0].book.items.book.description}
                    image={book.items[0].book.items.book.image}
                    link={book.items[0].book.items.book.link}
                    published={book.items[0].book.items.book.published}
                    comments={book.items[0].book.items.book.bookComments.items}
                    removeBooks = {removeBooks}
                    addComment={addComment}
                    deleteComment = {deleteComment}
                    />
             ))   
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
