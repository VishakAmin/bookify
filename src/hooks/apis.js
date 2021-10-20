import { useContext, useEffect, useState } from 'react'
import {API, graphqlOperation } from 'aws-amplify'

import { getUser } from '../graphql/queries';
import { createBookComment, deleteBookComment, deleteUserBooks } from '../graphql/mutations'
import { BookContext } from '../components/contexts/BookContext';

export const useFetchhook = (id, nextToken) => {
    const [state, dispatch] = useContext(BookContext)
    const [books, setBooks] = useState([])
    const [nextNextToken, setNextNextToken] = useState(null)
    const [error, setError] = useState(null)

    const fetchBooks = async () => {  
        try{
              const bookData = await API.graphql(graphqlOperation(getUser,{
                  id : id,
                  limit: 3,
                  nextToken: nextToken
                 }
                 ))
                console.log(bookData)
               // dispatch({type: "FETCH_BOOKS", payload:bookData.data.getUser.book.items})
                setBooks(bookData.data.getUser.book.items)
                setNextNextToken(bookData.data.getUser.book.nextToken)              
            }
        catch(err){
          setError(err);
        }
    }
    useEffect(() => {
        fetchBooks()
    },[nextToken])

    console.log(books);
    return {books, nextNextToken, error}
}


export const removeBooksApi = async (id, title) => {
         const  removeBooksResponse =  await API.graphql(graphqlOperation(deleteUserBooks, 
                {
                    input:{
                        id:id
                    }
            }))
        return removeBooksResponse
}

export const deleteCommentApi = async (id) => {
    const deleteCommentResponse = await API.graphql(graphqlOperation(deleteBookComment, 
                { 
                    input:{
                        id:id
                }
            }))
    return deleteCommentResponse
}

export const createCommentApi = async (id, comment, userId, username) => {
    const addCommentresponse = await API.graphql(graphqlOperation(createBookComment, 
        { input:{
            comment:comment,
            bookCommentCommentBookId: id,
            userId: userId,
            userName : username
    }}))
    return addCommentresponse;
}