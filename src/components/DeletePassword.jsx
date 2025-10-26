import { ChevronLeft, Lock, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { decryptData, encryptData } from '../helpers/cryptoHelpers';
import toast from 'react-hot-toast';

const VAULT_KEY = 'userVault';

export default function DeletePassword({ setCurrentView, userConfig, setIsLoading }) {
    const [vault, setVault] = useState([]);
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
            toast.error('Failed to load vault');
            return [];
        }
    };

    const saveVault = async (newVault) => {
        if (!master_key) return console.error('No master key available!');
        try {
            const encrypted = await encryptData(newVault, master_key);
            localStorage.setItem(VAULT_KEY, JSON.stringify(encrypted));
            setVault(newVault);
        } catch (err) {
            console.error('Failed to save vault:', err);
            toast.error('Failed to update vault');
        }
    };

    const deletePassword = async (id) => {
        const newVault = vault.filter(item => item.id !== id);
        await saveVault(newVault);
        toast.success('Password deleted successfully!');
    };

    useEffect(() => {
        const fetchVault = async () => {
            setIsLoading(true);
            await loadVault();
            setIsLoading(false);
        };
        fetchVault();
    }, []);

    return (
        <div className='relative w-full h-full px-2 py-5 flex flex-col gap-2 overflow-hidden'>
            <button
                onClick={() => setCurrentView('home')}
                className='flex flex-row items-center bg-black/10 w-fit rounded-lg py-2 px-2 cursor-pointer'>
                <ChevronLeft className='h-5 w-5' />
                <p className='text-sm'>Go Back</p>
            </button>

            <div className='flex flex-col gap-2 mt-5 overflow-y-scroll'>
                {vault.length === 0 && <p className='text-gray-500 text-sm'>No saved passwords.</p>}
                {vault.map((item, index) => (
                    <div
                        key={index}
                        className='w-full h-15 border border-[#696FC7] rounded-lg flex flex-row items-center justify-between gap-1'>
                        <div className='w-25 h-full flex items-center justify-center bg-[#696FC7] rounded-tl-lg rounded-bl-lg rounded-br-4xl'>
                            <Lock className='h-7 w-7 text-[#fff]' />
                        </div>
                        <div className='w-full flex flex-col'>
                            <p className='text-lg font-bold text-[#696FC7]'>{item.username}</p>
                            <p className='text-xs font-bold text-[#696FC7]'>{item.service}</p>
                        </div>
                        <div className='h-full flex items-center justify-center w-23'>
                            <button
                                className='w-6 bg-[#ff0000]/75 h-6 flex items-center justify-center rounded-full cursor-pointer'
                                onClick={() => deletePassword(item.id)}
                            >
                                <X className='text-[#fff] p-1' />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
