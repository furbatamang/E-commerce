import React from 'react'
import {ReactComponent as SendIcon} from '../assets/icons/send.svg'
const Newsletter = () => {
    return (
        <div className='flex items-center justify-center bg-pink-100 bg-opacity-30'>
            <div className='p-20 flex flex-col items-center gap-y-5'>
                <div className='flex-1'>
                    <h1 className='text-6xl font-bold'>Newsletter</h1>
                </div>
                <div className='flex-1'>
                    <p className='text-xl'>Get timely updates from your favourite products.</p>
                </div>
                <div className='flex flex-1'>
                    <input type="text" className='px-4 basis-full w-96' placeholder='Your email'/>
                    <div className='basis-1/4 bg-teal-400 px-6 py-3 flex justify-center cursor-pointer items-center '>
                        <SendIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Newsletter
