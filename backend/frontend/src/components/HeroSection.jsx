import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='bg-[#f0f4f8] py-16'>
            <div className='text-center max-w-4xl mx-auto'>
                <span className='mx-auto px-6 py-2 rounded-full bg-[#d0e1f9] text-[#1e3a8a] font-medium text-lg'>Top Job Search Platform</span>
                <h1 className='text-4xl md:text-5xl font-bold mt-6 mb-4'>
                    Discover & Apply for Your <br />
                    <span className='text-[#4a3f4d]'>Dream Job</span>
                </h1>
                <p className='text-lg text-gray-700 mb-8'>
                    Find the best opportunities and advance your career with ease.
                </p>
                <div className='flex flex-col sm:flex-row justify-center items-center gap-4'>
                    <input
                        type="text"
                        placeholder='Search for jobs...'
                        onChange={(e) => setQuery(e.target.value)}
                        className='w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    />
                    <Button onClick={searchJobHandler} className="bg-[#6A38C2] text-white rounded-full px-6 py-3 mt-4 sm:mt-0 flex items-center">
                        <Search className='h-5 w-5 mr-2' />
                        Search
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection;
