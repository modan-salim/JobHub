import React from 'react';
import Job from './Job'; // Adjust the import path as needed

// Dummy job data
const dummyJobs = [
    {
        _id: '1',
        title: 'Software Engineer',
        description: 'Develop and maintain software applications.',
        company: {
            name: 'Tech Innovators Inc.',
            logo: 'https://via.placeholder.com/50',
        },
        position: 'Full-time',
        jobType: 'Permanent',
        salary: '10',
        createdAt: '2024-08-20T12:00:00Z',
        location: 'New York, USA',
    },
    {
        _id: '2',
        title: 'Product Manager',
        description: 'Lead product development and strategy.',
        company: {
            name: 'Creative Solutions Ltd.',
            logo: 'https://via.placeholder.com/50',
        },
        position: 'Part-time',
        jobType: 'Contract',
        salary: '15',
        createdAt: '2024-08-15T09:30:00Z',
        location: 'San Francisco, USA',
    },
    {
        _id: '3',
        title: 'UX Designer',
        description: 'Design user experiences and interfaces.',
        company: {
            name: 'Design Gurus Co.',
            logo: 'https://via.placeholder.com/50',
        },
        position: 'Internship',
        jobType: 'Temporary',
        salary: '5',
        createdAt: '2024-08-10T14:45:00Z',
        location: 'Remote',
    },
    {
        _id: '4',
        title: 'Data Scientist',
        description: 'Analyze and interpret complex data.',
        company: {
            name: 'Data Wizards LLC',
            logo: 'https://via.placeholder.com/50',
        },
        position: 'Full-time',
        jobType: 'Permanent',
        salary: '12',
        createdAt: '2024-08-18T11:00:00Z',
        location: 'Austin, USA',
    },
];

const Jobs = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
            {dummyJobs.map((job) => (
                <Job key={job._id} job={job} />
            ))}
        </div>
    );
};

export default Jobs;
