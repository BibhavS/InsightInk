import React, {useEffect, useState} from 'react'
import { Container, PostForm } from '../Components'
import appwriteService from '../appwrite/configuration'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
  const [post, setPost] = useState(null);
  const {slug} = useParams();
  const navigate = useNavigate();
  const posts = useSelector(state => state.posts.items)

  useEffect(() => {
    if(slug){
        const postItem = posts?.find(item => item.$id == slug)
        if(postItem){
          setPost(postItem)
        }
    }
    else{
        navigate("/");
    }
  }, [slug, navigate])

  console.log(post)

  return post ? (
    <div className='py-8'>
        <Container>
           <PostForm post={post}/>
        </Container>
    </div>
  ) : null
}

export default EditPost