import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function LoginPage({ setActivePage, setIsLoading, getUserConfig }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const hashPassword = async (password) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(hashBuffer))
            .map((b) => b.toString(16).padStart(2, '0'))
            .join('');
    };

    const handleLogin = async () => {
        setIsLoading(true);

        if (!username || !password) {
            toast.error('Please fill in both fields.');
            setIsLoading(false);
            return;
        }

        try {
            const storedConfigJSON = localStorage.getItem('userConfig');
            if (!storedConfigJSON) {
                toast.error('User not found.');
                setIsLoading(false);
                return;
            }

            const storedConfig = JSON.parse(storedConfigJSON);

            if (storedConfig.username !== username) {
                toast.error('User not found.');
                setIsLoading(false);
                return;
            }

            const hashedPassword = await hashPassword(password);
            if (hashedPassword !== storedConfig.master_password) {
                toast.error('Incorrect password.');
                setIsLoading(false);
                return;
            }

            storedConfig.loggedIn = true;
            localStorage.setItem('userConfig', JSON.stringify(storedConfig));

            toast.success('Login successful!');
            getUserConfig();
            setTimeout(() => {
                setActivePage('Dashboard');
                setIsLoading(false);
            }, 500);

        } catch (err) {
            console.error(err);
            toast.error('Login failed. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className='h-full w-full flex flex-col items-center justify-center shadow-lg gap-5'>
            <h1 className='text-4xl font-bold text-[#696FC7]'>Login</h1>

            <div className='flex flex-col gap-2 w-60'>
                <label className='text-sm font-semibold text-[#696FC7]'>Username</label>
                <input
                    type="text"
                    placeholder='username'
                    className='border p-2 rounded-lg border-[#696FC7] outline-none'
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label className='text-sm font-semibold text-[#696FC7]'>Password</label>
                <div className='relative border p-2 rounded-lg border-[#696FC7] flex flex-row'>
                    <input
                        type={isVisible ? 'text' : 'password'}
                        placeholder='**********'
                        className='w-full outline-none'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className='absolute top-0 right-0 px-2 bg-[#696FC7] h-full rounded-tr-lg rounded-br-lg cursor-pointer'
                        onClick={() => setIsVisible(!isVisible)}
                    >
                        {isVisible ? <EyeOff className='text-[#fff]' /> : <Eye className='text-[#fff]' />}
                    </button>
                </div>
            </div>

            <button
                className='bg-[#696FC7] px-5 py-2 rounded-lg text-[#fff] font-bold cursor-pointer mt-2'
                onClick={handleLogin}
            >
                Login
            </button>

            <p className='text-sm'>
                Don't have an account?{' '}
                <span
                    className='text-[#696FC7] underline cursor-pointer'
                    onClick={() => setActivePage('Signup')}
                >
                    Create one!
                </span>
            </p>
        </div>
    );
}
