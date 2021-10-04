import { useEffect, useState } from 'react'
import {API, graphqlOperation } from 'aws-amplify'

import { getUser } from '../graphql/queries';

export const useFetchhook = (id, nextToken) => {
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
    return [{books, nextNextToken, error}, fetchBooks]
}

