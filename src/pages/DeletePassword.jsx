import { ChevronLeft, ChevronRight, Eye, EyeOff, Facebook, X } from 'lucide-react'
import React from 'react'

export default function DeletePassword({ setCurrentView }) {

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
                            className='w-full h-15 border border-[#696FC7] rounded-lg flex flex-row items-center justify-between gap-1'>
                            <div className='w-25 h-full flex items-center justify-center bg-[#696FC7] rounded-tl-lg rounded-bl-lg rounded-br-4xl'>
                                <item.icon className='h-7 w-7 text-[#fff]' />
                            </div>
                            <div className='w-full flex flex-col'>
                                <p className='text-lg font-bold text-[#696FC7]'>{item.username}</p>
                                <p className='text-xs font-bold text-[#696FC7]'>{item.service}</p>
                            </div>
                            <div className='h-full flex items-center justify-center w-23'>
                                <button className='w-6 bg-[#ff0000]/75 h-6 flex items-center justify-center rounded-full cursor-pointer'>
                                    <X className='text-[#fff] p-1' />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
