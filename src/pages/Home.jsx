import React, { useEffect } from 'react'
import { Container, PostCard } from '../Components'
import { useSelector } from 'react-redux';
import loadingGif from '../assets//loadingIcon.gif';
 

function Home() {
    const posts = useSelector((state) => state.posts.items);
    const loading = useSelector((state) => state.posts.loading);
    const authStatus = useSelector((state) => state.auth.status);


    if (!authStatus) {
        return (
            <div className="w-full py-8 my-8 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-center text-[2.35rem] mt-4 mb-10 font-medium">
                                Welcome to InsightInk
                            </h1>
                            <h1 className="text-2xl font-medium mt-12">
                                Login to create and read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8 px-16">
            <Container>
                <h1 className="text-center text-4xl mt-4 mb-10 font-semibold">
                    Welcome to InsightInk
                </h1>
                {!loading ? (
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