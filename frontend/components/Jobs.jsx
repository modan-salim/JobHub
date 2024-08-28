import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const dummyJobs = [
        {
            _id: '1',
            title: 'Frontend Developer',
            description: 'We are looking for a passionate Frontend Developer to join our team.',
            location: 'Bangalore',
            company: 'Tech Innovations',
            salary: '50k-70k'
        },
        {
            _id: '2',
            title: 'Backend Developer',
            description: 'Join our backend team to build scalable server-side applications.',
            location: 'Hyderabad',
            company: 'Code Solutions',
            salary: '60k-80k'
        },
        {
            _id: '3',
            title: 'FullStack Developer',
            description: 'A dynamic role for someone who is comfortable working on both frontend and backend.',
            location: 'Delhi NCR',
            company: 'Future Tech',
            salary: '70k-90k'
        },
        {
            _id: '4',
            title: 'Content Writer',
            description: 'Seeking a creative Content Writer to produce engaging and informative content.',
            location: 'Mumbai',
            company: 'MediaWorks',
            salary: '40k-60k'
        },
        {
            _id: '5',
            title: 'Graphics Designer',
            description: 'Join our creative team as a Graphics Designer to work on various design projects.',
            location: 'Pune',
            company: 'Design Hub',
            salary: '45k-65k'
        },
        {
            _id: '6',
            title: 'Project Manager',
            description: 'We need an experienced Project Manager to oversee and manage various projects.',
            location: 'Ahmedabad',
            company: 'Project Plus',
            salary: '80k-100k'
        },
        {
            _id: '7',
            title: 'UX/UI Designer',
            description: 'A skilled UX/UI Designer is required to enhance user experiences and interfaces.',
            location: 'Surat',
            company: 'Creative Minds',
            salary: '50k-70k'
        },
        {
            _id: '8',
            title: 'Data Analyst',
            description: 'Looking for a Data Analyst to interpret data and provide actionable insights.',
            location: 'Jaipur',
            company: 'Data Insights',
            salary: '55k-75k'
        }
    ];
    

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0 ? <span>Job not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>


        </div>
    )
}

export default Jobs