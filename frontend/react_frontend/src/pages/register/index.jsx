import React, { useState } from 'react'
import axios from '../../axios'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/register', {
                name,
                email,
                password,
                password_confirmation: password,
            });

            console.log('response', response)

            if(response.status == 200) {
                navigate('/login');                
            }
        } catch (err) {
            if (err.response && err.response.data) {
                console.log(err.response.data.message || 'Registration failed!');
            } else {
                console.log('An unexpected error occurred!');
            }
        }
    };


    return (
        <div className="flex items-center justify-center w-full min-h-screen dark:bg-gray-950">
            <div className="max-w-md px-8 py-6 bg-white rounded-lg shadow-md dark:bg-gray-900">
                <h1 className="mb-4 text-2xl font-bold text-center dark:text-gray-200">Welcome Back!</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            type="text" id="name" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your name" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" id="email" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com" />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" id="password" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" />
                    </div>

                    <button type="submit" className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
                </form>
            </div>
        </div >
    )
}

export default Register