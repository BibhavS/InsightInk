import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/configuration";
import { Button, Container } from "../Components";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../store/postSlice";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.items);

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            const postItem  = posts?.find(item => item.$id == slug);
            if (postItem) setPost(postItem);
                else navigate("/");
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredimage);
                dispatch(fetchPosts());
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 px-10">
            <Container>
                <div className="w-full justify-center flex mb-4 relative rounded-xl">
                    <img
                        src={appwriteService.getFilePreview(post.featuredimage)}
                        alt={post.title}
                        className="rounded-xl min-h-[25.5rem]"
                    />

                </div>
                <div className="w-full mt-16">
                    <h1 className="text-5xl font-bold text-center">{post.title}</h1>
                </div>
                <div className="font-normal mt-16 text-2xl text-justify">
                    {parse(post.content)}
                </div>
                {isAuthor && (
                    <div className="mt-10 text-center">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-emerald-800 text-2xl font-semibold" className="mr-6">
                                Edit
                            </Button>
                        </Link>
                        <Button bgColor="bg-red-800 text-2xl font-semibold" onClick={deletePost}>
                            Delete
                        </Button>
                    </div>
                )}
            </Container>
        </div>
    ) : null;
}