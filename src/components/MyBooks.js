import {API, graphqlOperation } from 'aws-amplify'
import React,{useEffect, useState} from 'react'
import { toast } from 'react-toastify';

import { createBookComment, deleteBookComment, deleteUserBooks } from '../graphql/mutations'
import { listUsers } from '../graphql/queries'
import { useAuth } from './contexts/AuthContext';
import MyBooksItem from './MyBooksItem'


const MyBooks = () => {
    const [books, setBooks] = useState([])
    const [sortType, setSortType] = useState("")
    const {user} = useAuth()

    const fetchBooks = async () => {
        try{
            const userData = await API.graphql(graphqlOperation(listUsers,{
                filter : { id : {eq: user.attributes.sub } }
              }))
             // console.log("TIMESS",userData.data.listUsers.items[0].book.items);
              setBooks(userData.data.listUsers.items[0].book.items);
        }
        catch(err){
            console.log("Error fetching...", err.errors);
        }
    }

    useEffect(() => {
        fetchBooks()
     },[])

    
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
    


    return ( 
        <> 
        <div className="flex justify-end pr-56">
        <label className="block text-left w-36 ">
        <span className="text-gray-700">Sort by Added Date</span>
        <select className="form-select block w-full mt-1 border rounded" onChange={handleSort}>
            <option  disabled defaultValue=" " selected>Choose</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option> 
        </select>
        </label>
        </div>
            {books && books.length > 0 ? (
             books.map((book) => (
                    <MyBooksItem 
                    key={book.book.id}
                    id={book.id}
                    bookid={book.book.id}
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
