import React from 'react'

const MyBooksItem = ({title, authors, description, published, image, link, removeBooks,id}) => {

    const removeBook = () => {

        removeBooks(id, title)
    }
    
    
    return (
        <div>
              <div className="pt-10 pl-5 flex justify-center">
               <div className="max-w-screen-xl w-full lg:flex">
               <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{backgroundImage: `url(${image})`}} title="Woman holding a mug">
               </div>
               <div className="border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                   <div className="mb-8">
                            
                   <div className="text-black font-bold text-xl mb-2">{title}</div>
                   <p className="text-grey-darker text-base">{description}</p>
                   </div>
                   <div className="flex flex-row justify-between items-center">
                    <div>
                       <p className="text-black leading-none">{authors.slice(1,-1)}</p>
                       <p className="text-grey-dark">{published}</p>
                     </div>
                     <div className="px-6 pt-4 pb-4 space-x-4">
                    <a href={link} target="_blank" rel="noreferrer" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-7 rounded-full">
                        Read 
                    </a>
                    <button onClick={removeBook} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Remove
                    </button>
                    </div>
                    </div>
               </div>
               </div>
               </div>   
        </div>
    )
}

export default MyBooksItem
