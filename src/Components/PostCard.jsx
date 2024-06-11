import React from 'react'
import appwriteService from '../appwrite/configuration'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostCard({$id, title, featuredimage}) {
  const userData = useSelector(state => state.auth.userData)
  return (
    <Link to={`/post/${$id}`}>
       <div className='w-full rounded-xl shadow-xl p-6 flex flex-col min-w-64'>
         <div className='w-full text-center mb-6'>
            <img src={appwriteService.getFilePreview(featuredimage)} alt={title} 
            className='inline-block rounded-xl h-72'/>
         </div>
         <h2 className='text-2xl font-semibold mb-4'>{title}</h2>
         <h2 className='text-[1.1.rem] font-normal'>@{userData?.name.trim()}</h2>
       </div>
    </Link>
  )
}

export default PostCard