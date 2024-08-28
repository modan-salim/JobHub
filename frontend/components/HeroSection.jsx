import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
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
        <div className='relative bg-gray-900 text-white py-20 px-4'>
            <div className='relative z-10 text-center'>
                <span className='mx-auto px-4 py-2 rounded-full bg-white text-gray-900 font-medium shadow-lg inline-block'>
                    Discover Your Future
                </span>
                <h1 className='text-4xl md:text-5xl font-bold my-4'>
                    Find Your <span className='text-yellow-400'>Dream Job</span> Today
                </h1>
                <p className='text-lg md:text-xl mb-6'>
                    Explore thousands of job opportunities and take the next step in your career with ease. Join our community of professionals and find the perfect match for your skills and ambitions.
                </p>
                <div className='flex max-w-3xl mx-auto shadow-lg border border-gray-700 rounded-full overflow-hidden'>
                    <input
                        type="text"
                        placeholder='Search for jobs, companies, or keywords...'
                        onChange={(e) => setQuery(e.target.value)}
                        className='flex-1 px-4 py-2 outline-none border-none bg-gray-800 text-white placeholder-gray-400'
                    />
                    <Button onClick={searchJobHandler} className="bg-yellow-400 text-gray-900">
                        <Search className='h-6 w-6' />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;

