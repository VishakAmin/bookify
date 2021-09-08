import {Auth, API, graphqlOperation } from 'aws-amplify'
import React,{useEffect, useState} from 'react'
import { toast } from 'react-toastify';

import { deleteBook } from '../graphql/mutations'
import { listBooks } from '../graphql/queries'
import { useAuth } from './contexts/AuthContext';
import MyBooksItem from './MyBooksItem'


const MyBooks = () => {
    const [books, setBooks] = useState([])
    const {user} = useAuth()

    useEffect(() => {
    //     const fetchUser = async() => { 
    //         try{
    //             let user =  await userSignedIn();
    //             setSignInUser(user.attributes.sub);
    //         }
    //         catch(err) {  
    //             console.log(err);
    //         }
    //     }
    //    fetchUser()
    console.log(user.attributes.sub);
    fetchBooks()
     },[])

   

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


    
    return ( 
        <>
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
