import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const Banner = () => {
    const [query, setQuery] = useState("");

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 md:py-20 py-14'>
            <h1 className='text-5xl font-bold text-primary mb-3 text-center'>Find your <span className='text-blue-400'>Jobs</span> here</h1>
            <p className='text-lg text-black/70 mb-8 text-center'>Thousands of jobs in the computer, engineering and technology sectors are waiting for you</p>
            <form className="flex justify-center">
                <div className='w-full md:w-1/2'>
                    <div className='relative bg-white rounded-lg shadow-sm ring-1 ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600'>
                        <input
                            type='text'
                            name='title'
                            id='title'
                            placeholder='Search for jobs...'
                            className='block w-full py-2 pl-10 pr-4 border-0 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none'
                            value={query}
                            onChange={handleInputChange}
                        />
                        <FiSearch className='absolute inset-y-0 left-0 mt-2.5 ml-3 text-gray-400' />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Banner;
