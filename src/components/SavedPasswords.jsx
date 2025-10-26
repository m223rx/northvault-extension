import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, EyeOff, X, Lock, Search } from 'lucide-react';
import { decryptData } from '../helpers/cryptoHelpers';
import toast from "react-hot-toast";

const VAULT_KEY = 'userVault';

export default function SavedPasswords({ setCurrentView, userConfig, setIsLoading }) {
    const [vault, setVault] = useState([]);
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const master_key = userConfig?.master_password;

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

    useEffect(() => {
        const fetchVault = async () => {
            setIsLoading(true);
            await loadVault();
            setIsLoading(false);
        };
        fetchVault();
    }, []);

    const copyPassword = (password) => {
        if (navigator.clipboard.writeText(password)) {
            setSelectedEntry(null);
            toast.success("Password copied to clipboard!")
        }
    };

    return (
        <div className='relative w-full h-full px-2 py-5 flex flex-col gap-2 overflow-hidden'>
            <button
                onClick={() => setCurrentView('home')}
                className='flex flex-row items-center bg-black/10 w-fit rounded-lg py-2 px-2 cursor-pointer'
            >
                <ChevronLeft className='h-5 w-5' />
                <p className='text-sm'>Go Back</p>
            </button>

            <div className='relative border p-2 rounded-lg border-[#696FC7] flex flex-row items-center justify-between mt-1'>
                <input type='text' placeholder='Search service...' className='w-full outline-none' />
                <button className='absolute top-0 right-0 px-2 bg-[#696FC7] h-full rounded-tr-lg rounded-br-lg cursor-pointer'>
                    <Search className='text-white' />
                </button>
            </div>

            <div className='flex flex-col gap-2 mt-5 overflow-y-auto'>
                {vault.length === 0 && <p className='text-gray-500 text-sm'>No saved passwords yet.</p>}

                {vault.map((item, index) => (
                    <div key={index} className='flex flex-col'>
                        <div
                            onClick={() => setSelectedEntry(selectedEntry === item ? null : item)}
                            className={`w-full border border-[#696FC7] ${!selectedEntry && 'rounded-lg'} rounded-tl-lg rounded-tr-lg flex flex-row items-center justify-between gap-1 p-2 cursor-pointer`}
                        >
                            <div className='w-15 h-15 flex items-center justify-center bg-[#696FC7] rounded-full'>
                                <Lock className='h-7 w-7 text-white' />
                            </div>
                            <div className='flex-1 flex flex-col py-1 px-2'>
                                <p className='text-lg font-bold text-[#696FC7]'>{item.username}</p>
                                <p className='text-xs font-bold text-[#696FC7]'>{item.service}</p>
                            </div>
                            <ChevronRight className='text-[#696FC7]' />
                        </div>
                        {selectedEntry === item && (
                            <div className='bg-gray-50 border border-[#696FC7] rounded-b-lg p-2 relative flex flex-col gap-2'>
                                <label className='text-sm font-semibold text-[#696FC7]'>Password</label>
                                <div className='relative flex items-center'>
                                    <input
                                        type={isVisible ? 'text' : 'password'}
                                        value={item.password}
                                        readOnly
                                        disabled
                                        className='w-full border p-2 rounded-lg outline-none text-[#bdbbbb]'
                                    />
                                    <button
                                        className='absolute right-2 cursor-pointer'
                                        onClick={() => setIsVisible(!isVisible)}
                                    >
                                        {isVisible ? <EyeOff className='text-[#696FC7]' /> : <Eye className='text-[#696FC7]' />}
                                    </button>
                                </div>
                                <button
                                    onClick={() => copyPassword(item.password)}
                                    className='bg-[#696FC7] w-full py-2 rounded-lg text-white font-bold mt-2 cursor-pointer'
                                >
                                    Copy
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
