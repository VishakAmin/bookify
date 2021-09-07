import {Auth, API, graphqlOperation } from 'aws-amplify'
import React,{useEffect, useState} from 'react'
import { toast } from 'react-toastify';

import { deleteBook } from '../graphql/mutations'
import { listBooks } from '../graphql/queries'
import MyBooksItem from './MyBooksItem'

const MyBooks = () => {
    const [books, setBooks] = useState([])

    const [signInUser, setSignInUser] = useState("")

    let data = ""

    useEffect(() => {
        const fetchUser = async() => { 
            try{
                const user =  await Auth.currentAuthenticatedUser();
                await setSignInUser(user.attributes.sub)
            }
            catch(err) {
                console.log(err);
            }
        }
        fetchUser()
        fetchBooks()
     },[])


    const fetchBooks = async () => {
        try{
            console.log("USER IS ", data);
            const todoData = await API.graphql(graphqlOperation(listBooks,{
                filter : { userId : { eq : signInUser } }
              }))
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
