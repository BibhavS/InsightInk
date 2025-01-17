import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input } from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("")
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const create = async (data) => {
        setError("");
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = authService.getCurrentUser();
                if (userData) dispatch(login(userData))
                navigate("/")
            }

        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <> 
        <div className="flex items-center justify-center w-full my-4">
            <div className={`mx-auto w-full max-w-lg shadow-xl rounded-xl p-10 border border-black/10`}>
              <div>
                <h2 className="text-center text-3xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-4 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-700 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)} className='mt-8'>
                    <div className='space-y-6'>
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                            })}
                        />
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
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) ||
                                        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character"
                                }
                            })}
                        />
                        <Button type="submit" className="w-full py-3">
                            Create Account
                        </Button>
                    </div>
                </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Signup