import { ChevronLeft, Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'

export default function SettingsPage({ setCurrentView }) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <>
            <div className='relative w-full h-full px-2 py-5 flex flex-col gap-2 overflow-hidden'>
                <button
                    onClick={() => setCurrentView('home')}
                    className='flex flex-row items-center bg-black/10 w-fit rounded-lg py-2 px-2 cursor-pointer'>
                    <ChevronLeft className='h-5 w-5' />
                    <p className='text-sm'>Go Back</p>
                </button>
                <div className='flex flex-col gap-2 mt-5'>
                    <label htmlFor="password" className='text-sm font-semibold text-[#696FC7]'>Current Password</label>
                    <div className='relative border p-2 rounded-lg border-[#696FC7] outline-none flex flex-row items-center justify-between'>
                        <input type={`${isVisible ? 'text' : 'password'}`} placeholder='**********' className='w-full outline-none' />
                        <div className='flex flex-row items-center justify-center gap-3 absolute top-0 right-0 h-[100%]'>
                            <button className='absolute top-0 right-0 px-2 bg-[#696FC7] h-full rounded-tr-lg rounded-br-lg cursor-pointer' onClick={() => setIsVisible(!isVisible)}>
                                {isVisible ? (
                                    <EyeOff className='text-[#fff]' />
                                ) : (
                                    <Eye className='text-[#fff]' />
                                )}
                            </button>
                        </div>
                    </div>
                    <label htmlFor="new password" className='text-sm font-semibold text-[#696FC7]'>New Password</label>
                    <div className='relative border p-2 rounded-lg border-[#696FC7] outline-none flex flex-row items-center justify-between'>
                        <input type={`${isVisible ? 'text' : 'password'}`} placeholder='**********' className='w-full outline-none' />
                        <div className='flex flex-row items-center justify-center gap-3 absolute top-0 right-0 h-[100%]'>
                            <button className='absolute top-0 right-0 px-2 bg-[#696FC7] h-full rounded-tr-lg rounded-br-lg cursor-pointer' onClick={() => setIsVisible(!isVisible)}>
                                {isVisible ? (
                                    <EyeOff className='text-[#fff]' />
                                ) : (
                                    <Eye className='text-[#fff]' />
                                )}
                            </button>
                        </div>
                    </div>
                    <div className='flex items-end justify-center mt-5 '>
                        <button className='bg-[#696FC7] text-[#fff] text-lg font-bold px-5 py-2 rounded-lg cursor-pointer'>Save</button>
                    </div>
                </div>
            </div>
        </>
    )
}
