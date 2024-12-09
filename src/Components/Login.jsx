import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {  
        setError("");
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData){
                    console.log("Authenticated successfully"+ userData.name);
                    dispatch(authLogin(userData))
                }
                navigate("/");
            }
        }
        catch (error) {
            alert("There was a problem signing in");
            setError(error.message)
        }
    }

    return (
        <>
            <div className='flex items-center justify-center w-full my-4'>
                <div className={`mx-auto w-full max-w-lg shadow-xl rounded-xl p-10 border border-black/10`}>
                     
                    <div>
                        <h2 className='text-center text-3xl font-bold leading-tight'>
                            Sign in to your account
                        </h2>
                        <p className='mt-4 text-center text-base text-black/60'>
                            Don&apos;t have any account?&nbsp;
                            <Link
                                to="/signup"
                                className='font-medium text-primary transition-all duration-200 hover:underline'
                            >
                                Signup
                            </Link>
                        </p>
                        {error && <p className='text-red-700 mt-8 text-center'>{error}</p>}
                        <form onSubmit={handleSubmit(login)}
                            className='mt-8'>
                            <div className='space-y-6'>
                                <Input
                                    label="Email: "
                                    placeholder="Enter your email"
                                    type="email"
                                    {...register("email", {
                                        required: true,
                                        validate: {
                                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                                "Email address must be a valid address",
                                        }
                                    })}
                                />
                                <Input
                                    label="Password: "
                                    placeholder="Enter your password"
                                    type="password"
                                    {...register("password", {
                                        required: true,
                                    })}
                                />
                                <Button
                                    type="submit"
                                    className='w-full py-3'
                                >
                                    Sign in
                                </Button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Login