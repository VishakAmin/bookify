import moment from 'moment'
import React,{useState} from 'react'

const MyBooksItem = ({title, authors, comments ,description, published, image, link, removeBooks,id, addComment,deleteComment, bookid, userId}) => {

    const [comment, setComment] = useState("")
    const removeBook = () => {
        removeBooks(id, title)
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        addComment(bookid, comment)
        setComment("")
    }
    
    const deleteBookComment = (id) => {
        deleteComment(id,bookid)
    }

    return (
        <div>
              <div className="pt-10 pl-5 flex justify-center">
               <div className="max-w-screen-xl w-full lg:flex shadow-lg">
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
               <div className="pl-64 pt-4">
                        <h6 className="text-black font-semibold"> Comment Section</h6>
                        <div>                                
                            <form onSubmit={handleSubmit} className="space-x-4 pt-2">
                                <input type="text" value={comment} className="w-6/12 p-3 border rounded-lg" placeholder="Add your comment" onChange={(e) => setComment(e.target.value)}/>
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Post</button>
                            </form>
                        </div>
                        {comments.length > 0 ? (
                            comments.map((com) => (
                                <>
                                <div>
                                <div className="w-1/2 bg-white p-2 pt-4 rounded">
                                    <div className="flex ml-3">
                                    <div>
                                        {
                                            com.userId === userId ?   <h1 className="font-semibold align-center">You</h1> :   <h1 className="font-semibold align-center">{com.userName}</h1>
                                        }
                                      <h1 className="italic align-center">On {moment(com.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}</h1>
                                    </div>
    
                                  </div> 
                                    </div>
                                </div>
                                <div key={com.id} className="w-6/12 mt-4 border-r border-b border-l border-grey-light  lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex justify-between ">
                                <p>{com.comment}</p>
                                {   com.userId === userId ? 

                                     <button onClick={()=>deleteBookComment(com.id)} >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg> 
                                </button>
                                :
                                ""


                                }        
                                </div>
                                </>
                            ))
                        ) : <p className="pt-6 font-semibold text-lg">No Comments</p>
        
                        }
                    </div>
                  
        </div>
    )
}

export default MyBooksItem
