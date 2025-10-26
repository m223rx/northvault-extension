import React, { useEffect, useState } from 'react'
import { decryptData } from '../helpers/cryptoHelpers';
const VAULT_KEY = 'userVault';

export default function DashboardHome({ setCurrentView, userConfig }) {
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
            return [];
        }
    };

    useEffect(() => {
        const fetchVault = async () => {
            await loadVault();
        };
        fetchVault();
    }, []);

    return (
        <>
            <section className="relative w-full px-2 h-full py-5">
                {/* <label htmlFor="states" className="mt-5 text-sm font-bold text-[#696FC7] ">Password Manager</label> */}
                <div className="flex flex-col w-full p-2">
                    <div className="w-[100%] h-full py-5 shadow-lg flex flex-col items-center justify-center rounded-xl gap-3">
                        <label htmlFor="count" className="font-bold text-[#696FC7]">Total saved passwords</label>
                        <div className="bg-[#B4DEBD] py-3 px-3 h-10 w-10 flex items-center justify-center rounded-full">
                            <p className="text-lg font-bold text-[#fff]">{vault.length}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 items-center justify-center w-full p-2">
                    <button
                        onClick={() => setCurrentView('save')}
                        className={`py-3 rounded-lg px-3 w-full font-semibold text-sm text-[#696FC7] border-[#696FC7] border hover:bg-[#696FC7] hover:text-[#fff] cursor-pointer`}>Save new password</button>
                    <button
                        onClick={() => setCurrentView('saved')}
                        className={`py-3 rounded-lg px-3 w-full font-semibold text-sm text-[#696FC7] border-[#696FC7] border hover:bg-[#696FC7] hover:text-[#fff] cursor-pointer`}>Show saved passwords</button>
                    <button
                        onClick={() => setCurrentView('delete')}
                        className={`py-3 rounded-lg px-3 w-full font-semibold text-sm text-[#696FC7] border-[#696FC7] border hover:bg-[#696FC7] hover:text-[#fff] cursor-pointer`}>Delete saved password</button>
                </div>
            </section>
        </>
    )
}
