import React, { useState } from 'react'
import { ChevronLeft, CircleFadingPlus, Settings, X } from 'lucide-react';

export default function SaveNewPassword({ setCurrentView }) {
    const [isShown, setIsShown] = useState(false);

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
                    <input type="text" placeholder='m223rx' className='border p-2 rounded-lg border-[#696FC7] outline-none' />
                    <label htmlFor="service" className='text-sm font-semibold text-[#696FC7]'>Service</label>
                    <input type="text" placeholder='github.com' className='border p-2 rounded-lg border-[#696FC7] outline-none' />
                    <label htmlFor="password" className='text-sm font-semibold text-[#696FC7]'>Password</label>
                    <div className='relative border p-2 rounded-lg border-[#696FC7] outline-none flex flex-row items-center justify-between'>
                        <input type="text" placeholder='********' />
                        <div className='flex flex-row items-center justify-center gap-3 absolute top-0 right-0 h-[100%]'>
                            <button>
                                <CircleFadingPlus className='h-6 w-6 text-[#696FC7] cursor-pointer' />
                            </button>
                            <button className='bg-[#696FC7] h-[100%] px-2 rounded-tr-lg rounded-br-lg cursor-pointer'>
                                <Settings className='h-6 w-6 text-[#fff]' onClick={() => setIsShown(!isShown)}/>
                            </button>
                        </div>
                    </div>
                </div>
                {isShown && (
                    <div className='inset-0 absolute h-full w-[100%] bg-black/20 justify-center flex flex-col px-5'>
                        <div className='flex flex-col bg-white h-50 px-5 py-5 justify-center shadow-lg  rounded-lg relative gap-2 border border-[#696FC7]'>
                            <label htmlFor="password_length" className='text-sm font-semibold text-[#696FC7]'>Password length</label>
                            <input type="text" placeholder='12' className='border p-2 rounded-lg border-[#696FC7] outline-none' />
                            <div className='absolute top-0 right-0'>
                                <button className='bg-[#ff0000] px-2 py-2 rounded-tr-lg cursor-pointer rounded-bl-lg'>
                                    <X className='text-[#fff] font-bold' onClick={() => setIsShown(!isShown)} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div>
                    <button className='bg-[#696FC7] w-full text-[#fff] py-2 text-m font-bold rounded-lg mt-5 cursor-pointer'>Save</button>
                </div>
            </div>
        </>
    )
}
