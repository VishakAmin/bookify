import { API, graphqlOperation } from 'aws-amplify'
import React,{useEffect, useState} from 'react'
import { toast } from 'react-toastify';

import { deleteBook } from '../graphql/mutations'
import { listBooks } from '../graphql/queries'
import MyBooksItem from './MyBooksItem'

const MyBooks = () => {
    const [books, setBooks] = useState([])

    const fetchBooks = async () => {
        try{
            const todoData = await API.graphql(graphqlOperation(listBooks))
            console.log(todoData);
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

    
    useEffect(() => {
        fetchBooks()
    }, [])
    console.log(books);
    
    return ( 
        <>
            {books ? (
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
                <p> Add Books</p>
                    

            )}
        
        </>

    )
}

export default MyBooks
