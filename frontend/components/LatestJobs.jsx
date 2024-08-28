import React from 'react';
import LatestJobCards from './LatestJobCards'; // Ensure the path is correct

// Dummy job data
const dummyJobs = [
    {
        _id: '1',
        title: 'Frontend Developer',
        description: 'Build and maintain user interfaces.',
        company: {
            name: 'Tech Wizards',
            logo: 'https://via.placeholder.com/50',
        },
        position: 'Full-time',
        jobType: 'Permanent',
        salary: '8',
        createdAt: '2024-08-22T10:00:00Z',
        location: 'Los Angeles, USA',
    },
    {
        _id: '2',
        title: 'Backend Developer',
        description: 'Develop server-side applications and APIs.',
        company: {
            name: 'Code Masters',
            logo: 'https://via.placeholder.com/50',
        },
        position: 'Full-time',
        jobType: 'Permanent',
        salary: '9',
        createdAt: '2024-08-21T11:30:00Z',
        location: 'New York, USA',
    },
    {
        _id: '3',
        title: 'Data Analyst',
        description: 'Analyze and visualize data trends.',
        company: {
            name: 'Data Pros',
            logo: 'https://via.placeholder.com/50',
        },
        position: 'Part-time',
        jobType: 'Contract',
        salary: '7',
        createdAt: '2024-08-20T13:15:00Z',
        location: 'San Francisco, USA',
    },
    {
        _id: '4',
        title: 'UI/UX Designer',
        description: 'Design user-friendly interfaces and experiences.',
        company: {
            name: 'Design Agency',
            logo: 'https://via.placeholder.com/50',
        },
        position: 'Freelance',
        jobType: 'Temporary',
        salary: '6',
        createdAt: '2024-08-19T09:00:00Z',
        location: 'Remote',
    },
    {
        _id: '5',
        title: 'Product Manager',
        description: 'Oversee product development and strategy.',
        company: {
            name: 'Product Innovators',
            logo: 'https://via.placeholder.com/50',
        },
        position: 'Full-time',
        jobType: 'Permanent',
        salary: '11',
        createdAt: '2024-08-18T14:30:00Z',
        location: 'Austin, USA',
    },
    {
        _id: '6',
        title: 'Marketing Specialist',
        description: 'Plan and execute marketing campaigns.',
        company: {
            name: 'Marketing Experts',
            logo: 'https://via.placeholder.com/50',
        },
        position: 'Part-time',
        jobType: 'Contract',
        salary: '5',
        createdAt: '2024-08-17T15:45:00Z',
        location: 'Chicago, USA',
    },
];

const LatestJobs = () => {
    // You can remove the useSelector part if not using Redux
    // const {allJobs} = useSelector(store=>store.job);

    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top </span> Job Openings</h1>
            <div className='grid grid-cols-3 gap-4 my-5'>
                {
                    dummyJobs.length <= 0 ? <span>No Job Available</span> : dummyJobs.slice(0,6).map((job) => <LatestJobCards key={job._id} job={job}/>)
                }
            </div>
        </div>
    );
}

export default LatestJobs;
