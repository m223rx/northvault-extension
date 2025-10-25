import { ChevronLeft, ChevronRight, Eye, EyeOff, Facebook, X } from 'lucide-react'
import React, { useState } from 'react'

export default function SavedPasswords({ setCurrentView }) {
    const [isShown, setIsShown] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const data = [
        { id: 1, icon: Facebook, username: "user1", service: 'Facebook' },
        { id: 1, icon: Facebook, username: "user2", service: 'facebook' },
    ]

    return (
        <>
            <div className='relative w-full h-full px-2 py-5 flex flex-col gap-2 overflow-hidden'>
                <button
                    onClick={() => setCurrentView('home')}
                    className='flex flex-row items-center bg-black/10 w-fit rounded-lg py-2 px-2 cursor-pointer'>
                    <ChevronLeft className='h-5 w-5' />
                    <p className='text-sm'>Go Back</p>
                </button>
                <div className='flex flex-col gap-2 mt-5 overflow-y-scroll'>
                    {data.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => setIsShown(!isShown)} 
                            className='w-full h-15 border border-[#696FC7] rounded-lg flex flex-row items-center justify-between gap-1 cursor-pointer'>
                            <div className='w-20 h-full flex items-center justify-center bg-[#696FC7] rounded-tl-lg rounded-bl-lg'>
                                <item.icon className='h-7 w-7 text-[#fff]' />
                            </div>
                            <div className='w-[100%] flex flex-col'>
                                <p className='text-lg font-bold text-[#696FC7]'>{item.username}</p>
                                <p className='text-xs font-bold text-[#696FC7]'>{item.service}</p>
                            </div>
                            <div className='h-full flex items-center justify-center'>
                                <button>
                                    <ChevronRight className='text-[#696FC7]' />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {isShown && (
                    <div className='inset-0 absolute h-full w-[100%] bg-black/20 justify-center flex flex-col px-5'>
                        <div className='flex flex-col bg-white h-50 px-5 py-5 justify-center shadow-lg  rounded-lg relative gap-2 border border-[#696FC7]'>
                            <label htmlFor="password_length" className='text-sm font-semibold text-[#696FC7]'>Password</label>
                            <div className='relative border p-2 rounded-lg border-[#696FC7] flex flex-row'>
                                <input type="text" placeholder='**********' className='outline-none' />
                                <button className='absolute top-0 right-0 px-2 bg-[#696FC7] h-full rounded-tr-lg rounded-br-lg'>
                                    {isVisible ? (
                                        <EyeOff className='text-[#fff]' />
                                    ) : (
                                        <Eye className='text-[#fff]' />
                                    )}

                                </button>
                            </div>
                            <div className='absolute top-0 right-0'>
                                <button className='bg-[#ff0000] px-2 py-2 rounded-tr-lg cursor-pointer rounded-bl-lg'>
                                    <X className='text-[#fff] font-bold' onClick={() => setIsShown(!isShown)} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
