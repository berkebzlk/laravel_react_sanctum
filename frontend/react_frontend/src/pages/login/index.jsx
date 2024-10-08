import React, { useState } from 'react'
import axios from '../../axios'
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore'; // Zustand store'unu içe aktar


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = useAuthStore((state) => state.login);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const loginResponse = await axios.post('/login', {
                email,
                password,
            });

            console.log('response', loginResponse)

            if(loginResponse.status !== 200) {
              console.log('login de hata')
              return;
            }
            
            const token = loginResponse.data.access_token;

            const userResponse = await axios.get('/user', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            const user = userResponse.data;

            login(token, user);
            console.log('navigate oncesi')
            navigate('/dashboard');   
        } catch (err) {
            if (err.response && err.response.data) {
                console.log(err.response.data.message || 'Login failed!');
            } else {
                console.log('An unexpected error occurred!');
            }
        }
    };


    return (
        <div className="flex items-center justify-center w-full min-h-screen dark:bg-gray-950">
            <div className="max-w-md px-8 py-6 bg-white rounded-lg shadow-md dark:bg-gray-900">
                <h1 className="mb-4 text-2xl font-bold text-center dark:text-gray-200">Login</h1>
                <form onSubmit={handleSubmit}>
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

export default Login