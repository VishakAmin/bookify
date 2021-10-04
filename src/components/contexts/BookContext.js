import React,{ createContext, useReducer} from 'react'
import Reducer from '../../reducer/reducer';

export const BookContext = createContext({
    books : [],
    err: null
})


export const BookProvider = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, {
        books : [],
        err: null
    })

    return (
        <BookContext.Provider value={[state, dispatch]}>
                {children}
        </BookContext.Provider>
    )
}

export default BookContext;
