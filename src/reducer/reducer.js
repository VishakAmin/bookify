const Reducer = (state, action) => {

    switch(action.type) {
        case 'FETCH_BOOKS':
            return {
                ...state,
                books: [...state.books, ...action.payload]
            }
        case "REMOVE_BOOKS":
            return {
                ...state,
                books : state.books.filter(book => book.id !== action.payload)
            }
        default:
            return state
    } 
}

export default Reducer;