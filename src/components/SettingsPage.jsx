import { ChevronLeft, Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export default function SettingsPage({ setCurrentView, userConfig, setIsLoading, getUserConfig }) {
    const [isVisible, setIsVisible] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const hashPassword = async (password) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    const handleUpdatePassword = async () => {
        setIsLoading(true);

        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error('Please fill in all fields.');
            setIsLoading(false);
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error('New passwords do not match.');
            setIsLoading(false);
            return;
        }

        try {
            const hashedCurrent = await hashPassword(currentPassword);
            
            if (hashedCurrent !== userConfig.master_password) {
                toast.error('Current password is incorrect.');
                setIsLoading(false);
                return;
            }

            const hashedNew = await hashPassword(newPassword);
            
            const updatedConfig = { ...userConfig, master_password: hashedNew };
            localStorage.setItem('userConfig', JSON.stringify(updatedConfig));
            
            if (getUserConfig) await getUserConfig();

            toast.success('Password updated successfully!');
            setCurrentView('home');

        } catch (error) {
            console.error(error);
            toast.error('Failed to update password.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='relative w-full h-full px-2 py-5 flex flex-col gap-2 overflow-hidden'>
            <button
                onClick={() => setCurrentView('home')}
                className='flex flex-row items-center bg-black/10 w-fit rounded-lg py-2 px-2 cursor-pointer'>
                <ChevronLeft className='h-5 w-5' />
                <p className='text-sm'>Go Back</p>
            </button>

            <div className='flex flex-col gap-2 mt-5'>
                <label className='text-sm font-semibold text-[#696FC7]'>Current Password</label>
                <div className='relative border p-2 rounded-lg flex flex-row items-center'>
                    <input
                        type={isVisible ? 'text' : 'password'}
                        placeholder='**********'
                        className='w-full outline-none'
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <button className='absolute top-0 right-0 px-2 bg-[#696FC7] h-full rounded-tr-lg rounded-br-lg cursor-pointer'
                        onClick={() => setIsVisible(!isVisible)}>
                        {isVisible ? <EyeOff className='text-[#fff]' /> : <Eye className='text-[#fff]' />}
                    </button>
                </div>

                <label className='text-sm font-semibold text-[#696FC7] mt-2'>New Password</label>
                <div className='relative border p-2 rounded-lg flex flex-row items-center'>
                    <input
                        type={isVisible ? 'text' : 'password'}
                        placeholder='**********'
                        className='w-full outline-none'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button className='absolute top-0 right-0 px-2 bg-[#696FC7] h-full rounded-tr-lg rounded-br-lg cursor-pointer'
                        onClick={() => setIsVisible(!isVisible)}>
                        {isVisible ? <EyeOff className='text-[#fff]' /> : <Eye className='text-[#fff]' />}
                    </button>
                </div>

                <label className='text-sm font-semibold text-[#696FC7] mt-2'>Confirm New Password</label>
                <div className='relative border p-2 rounded-lg flex flex-row items-center'>
                    <input
                        type={isVisible ? 'text' : 'password'}
                        placeholder='**********'
                        className='w-full outline-none'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <div className='flex items-end justify-center mt-5'>
                    <button
                        onClick={handleUpdatePassword}
                        className='bg-[#696FC7] text-[#fff] text-lg font-bold px-5 py-2 rounded-lg cursor-pointer'>
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}