import {Auth, API, graphqlOperation } from 'aws-amplify'
import React,{useEffect, useState} from 'react'
import { toast } from 'react-toastify';

import { deleteBook } from '../graphql/mutations'
import { listBooks } from '../graphql/queries'
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

    const fetchBooks = async () => {
       
        try{
            const filter = {
                userId: {
                    eq: user.attributes.sub
                }
            };
            console.log("USER IS ", user.attributes.sub  );
            const todoData = await API.graphql(graphqlOperation(listBooks,{
                filter :  filter
              }))
            console.log("MY NOOKS",todoData);
            setBooks(todoData.data.listBooks.items);
        }
        catch(err){
            console.log("Error fetching", err);
        }
    }


    const removeBooks = async (id,title) => {
        try{
            await API.graphql(graphqlOperation(deleteBook, {input:{id:id}}))
            setBooks(books.filter(book => book.id !== id))
            toast.error(`${title} Deleted Successfully`);
        }
        catch(err){
            console.log("Error in deleting",err);
        }
    }


    console.log(sortType);
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
            {books.length > 0 ? (
             books.map((book) => (
                    <MyBooksItem 
                    key={book.id}
                    id={book.id}
                    title={book.title}
                    authors={book.authors}
                    description={book.description}
                    image={book.image}
                    link={book.link}
                    published={book.published}
                    removeBooks = {removeBooks}
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
