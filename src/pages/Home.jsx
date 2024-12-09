import React, { useEffect } from 'react'
import { Container, PostCard } from '../Components'
import { useSelector } from 'react-redux';
import loadingGif from '../assets/loadingIcon.gif';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../store/postSlice';
 

function Home() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.items);
    const loading = useSelector((state) => state.posts.loading);
    const authStatus = useSelector((state) => state.auth.status);
    
    useEffect(() => {
        if (posts.length === 0) { // Only fetch posts if they haven't been fetched yet
            dispatch(fetchPosts());
        }
    }, [dispatch, posts.length]);

    if (!authStatus) {
        return (
            <div className="w-full py-8 text-center">
                <Container>
                    <div className="flex flex-wrap items-center">
                        <div className="p-2 w-full">
                            <h1 className="text-center md:text-[3.4rem] sm:text-5xl text-[2rem] mb-10 font-medium">
                                Welcome to InsightInk
                            </h1>
                            <h1 className="sm:text-2xl text-xl font-medium mt-12">
                                Login to create and read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8 px-8">
            <Container>
                <h1 className="text-center text-[2.5rem] mt-5 mb-8 font-medium">
                    Welcome to InsightInk
                </h1>
                {(!loading && posts) ? (
                    <div className="grid grid-cols-3 gap-12">
                        {posts.map((post) => (
                            <div key={post.$id} className="p-2">
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
    );
};

export default Home