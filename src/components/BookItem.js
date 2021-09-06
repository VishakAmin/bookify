import React from 'react'
import { Link } from 'react-router-dom'
import { API, Auth, graphqlOperation, Hub } from 'aws-amplify'

const BookItem = ({title, authors, description, published, image}) => {



    
    return (
     <div className="max-w-xs w-60 m-7 rounded overflow-hidden shadow-xl card m-2  border-gray-500 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-300">
      <img className="w-full h-60" src={image} alt="title"/>
        <div className="px-6 py-4 ">
            <div className="font-bold text-sm mb-2">{title}</div>
            <p className="text-gray-700 text-sm pb-2">
               <strong>Authors:</strong> {authors ? authors : "-"}
            </p>
            <p className="text-gray-700 text-sm ">   
                <strong>Published:</strong> {published ? published : "Not Available"}    
            </p>
        </div>
            <div className="px-6 pt-4 pb-4">
                <Link to="/mybooks" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Add Book
                </Link>
          </div>
        </div>
    )
}

export default BookItem
