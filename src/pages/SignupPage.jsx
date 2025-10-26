import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function SignupPage({ setActivePage, setIsLoading }) {
    const [isVisible, setIsVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const hashPassword = async (password) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(hashBuffer))
            .map((b) => b.toString(16).padStart(2, '0'))
            .join('');
    };

    const handleSignup = async () => {
        setIsLoading(true);

        if (!username || !password || !confirmPassword) {
            toast.error('Please fill in all fields');
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            setIsLoading(false);
            return;
        }

        try {
            // Check if user already exists
            const storedConfigJSON = localStorage.getItem('userConfig');
            if (storedConfigJSON) {
                const storedConfig = JSON.parse(storedConfigJSON);
                if (storedConfig.username === username) {
                    toast.error('Username already exists');
                    setIsLoading(false);
                    return;
                }
            }

            const hashedPassword = await hashPassword(password);

            const user_config = {
                loggedIn: false,
                username,
                master_password: hashedPassword,
                theme: 'dark',
                version: '1.0',
                vault_path: 'vault.json.enc',
            };

            localStorage.setItem('userConfig', JSON.stringify(user_config));
            toast.success('Account created successfully!');
            setTimeout(() => {
                setActivePage('Login');
                setIsLoading(false);
            }, 1000);

        } catch (error) {
            console.error(error);
            toast.error('Error creating account');
            setIsLoading(false);
        }
    };

    return (
        <div className='h-full w-full flex flex-col items-center justify-center shadow-lg gap-5'>
            <h1 className='text-4xl font-bold text-[#696FC7]'>Signup</h1>
            <div className='flex flex-col gap-2 w-60'>
                <label className='text-sm font-semibold text-[#696FC7]'>Username</label>
                <input
                    type="text"
                    placeholder='m223rx'
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

                <label className='text-sm font-semibold text-[#696FC7]'>Confirm Password</label>
                <div className='relative border p-2 rounded-lg border-[#696FC7] flex flex-row'>
                    <input
                        type={isVisible ? 'text' : 'password'}
                        placeholder='**********'
                        className='w-full outline-none'
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                onClick={handleSignup}
            >
                Signup
            </button>

            <p className='text-sm'>
                Already have an account?{' '}
                <span
                    className='text-[#696FC7] underline cursor-pointer'
                    onClick={() => setActivePage('Login')}
                >
                    Login now!
                </span>
            </p>
        </div>
    );
}
