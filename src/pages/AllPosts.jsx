import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../Components'
import { useDispatch, useSelector } from 'react-redux';
import loadingGif from '../assets//loadingIcon.gif';

function AllPosts() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.items);
    const loading = useSelector((state) => state.posts.loading);

    useEffect(() => {
        if (posts.length === 0) { // Only fetch posts if they haven't been fetched yet
            dispatch(fetchPosts());
        }
    }, [dispatch, posts.length]);

    return (
        <div className='w-ful py-8'>
            <Container>
                {!loading ? (
                    <div className='grid grid-cols-3 gap-12'>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <img src={loadingGif} alt="loading" />
                    </div>
                )}
            </Container>

        </div>
    )
}

export default AllPosts