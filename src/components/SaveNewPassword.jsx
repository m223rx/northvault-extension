import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ChevronLeft, CircleFadingPlus, Settings, X } from 'lucide-react';
import { encryptData, decryptData } from '../helpers/cryptoHelpers'
import toast from "react-hot-toast";

const VAULT_KEY = 'userVault';

export default function SaveNewPassword({ setCurrentView, userConfig, getUserConfig, setIsLoading }) {
    const [vault, setVault] = useState([]);
    const [service, setService] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isShown, setIsShown] = useState(false);
    const master_key = userConfig?.master_password;
    const [passwordLength, setPasswordLength] = useState(8);


    const loadVault = async () => {
        const stored = localStorage.getItem(VAULT_KEY);
        if (!stored || stored === "null") return [];

        try {
            const parsed = JSON.parse(stored);
            if (!parsed) return [];
            const decrypted = await decryptData(parsed, master_key);
            if (!decrypted) return [];
            setVault(decrypted);
            return decrypted;
        } catch (err) {
            console.error('Failed to load vault:', err);
            return [];
        }
    };


    const saveVault = async (newVault) => {
        if (!master_key) return console.error('No master key available!');
        const encrypted = await encryptData(newVault, master_key);
        localStorage.setItem(VAULT_KEY, JSON.stringify(encrypted));
        setVault(newVault);
    };


    const generatePassword = (
        length = passwordLength,
        uppercase = true,
        lowercase = true,
        numbers = true,
        symbols = true
    ) => {
        let chars = "";

        if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
        if (numbers) chars += "0123456789";
        if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?/";

        if (!chars) return "";

        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            password += chars[randomIndex];
        }
        setPassword(password);
    };

    const handleSave = async () => {
        setIsLoading(true);
        if (!service || !username || !password) {
            setIsLoading(false);
            return toast.error('Please fill all fields!');
        }
        const entry = {
            id: uuidv4(),
            service,
            username,
            password: password,
        };
        try {
            const currentVault = await loadVault();
            const newVault = [...currentVault, entry];
            await saveVault(newVault);
            setService('');
            setUsername('');
            setPassword('');
            getUserConfig();
            setTimeout(() => {
                setCurrentView('home');
                setIsLoading(false);
            }, 500);
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <>
            <div className='relative w-full h-full px-2 py-5 flex flex-col gap-2'>
                <button
                    onClick={() => setCurrentView('home')}
                    className='flex flex-row items-center bg-black/10 w-fit rounded-lg py-2 px-2 cursor-pointer'>
                    <ChevronLeft className='h-5 w-5' />
                    <p className='text-sm'>Go Back</p>
                </button>
                <div className='flex flex-col gap-2 mt-5'>
                    <label htmlFor="username" className='text-sm font-semibold text-[#696FC7]'>Username</label>
                    <input
                        type="text"
                        placeholder='username'
                        className='border p-2 rounded-lg border-[#696FC7] outline-none'
                        onChange={(e) => setUsername(e.target.value)} />
                    <label htmlFor="service" className='text-sm font-semibold text-[#696FC7]'>Service</label>
                    <input
                        type="text"
                        placeholder='service name'
                        className='border p-2 rounded-lg border-[#696FC7] outline-none'
                        onChange={(e) => setService(e.target.value)} />
                    <label htmlFor="password" className='text-sm font-semibold text-[#696FC7]'>Password</label>
                    <div className='relative border p-2 rounded-lg border-[#bdbbbb] outline-none flex flex-row items-center justify-between'>
                        <input
                            type="text"
                            placeholder='********'
                            className='outline-none text-[#bdbbbb]'
                            value={password}
                            disabled />
                        <div className='flex flex-row items-center justify-center gap-3 absolute top-0 right-0 h-[100%]'>
                            <button onClick={() => generatePassword(length = passwordLength)}>
                                <CircleFadingPlus className='h-6 w-6 text-[#696FC7] cursor-pointer' />
                            </button>
                            <button className='bg-[#696FC7] h-[100%] px-2 rounded-tr-lg rounded-br-lg cursor-pointer'>
                                <Settings className='h-6 w-6 text-[#fff]' onClick={() => setIsShown(!isShown)} />
                            </button>
                        </div>
                    </div>
                </div>
                {isShown && (
                    <div className='inset-0 absolute h-full w-[100%] bg-black/20 justify-center flex flex-col px-5'>
                        <div className='flex flex-col bg-white h-50 px-5 py-5 justify-center shadow-lg  rounded-lg relative gap-2 border border-[#696FC7]'>
                            <label htmlFor="password_length" className='text-sm font-semibold text-[#696FC7]'>Password length</label>
                            <input
                                type="text"
                                placeholder='password length'
                                className='border p-2 rounded-lg border-[#696FC7] outline-none'
                                onChange={(e) => setPasswordLength(e.target.value)} />
                            <div className='absolute top-0 right-0'>
                                <button className='bg-[#ff0000] px-2 py-2 rounded-tr-lg cursor-pointer rounded-bl-lg'>
                                    <X className='text-[#fff] font-bold' onClick={() => setIsShown(!isShown)} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <div>
                    <button
                        onClick={handleSave}
                        className='bg-[#696FC7] w-full text-[#fff] py-2 text-m font-bold rounded-lg mt-5 cursor-pointer'
                    >
                        Save
                    </button>
                </div>
            </div>
        </>
    )
}
