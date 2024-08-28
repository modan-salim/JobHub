import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    };

    return (
        <div className='w-full h-full p-4 bg-white border border-gray-200 rounded-lg shadow-md flex flex-col'>
            {/* Header */}
            <div className='flex items-center justify-between mb-4'>
                <p className='text-sm text-gray-500'>
                    {daysAgoFunction(job?.createdAt) === 0
                        ? "Today"
                        : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button variant="outline" className="rounded-full" size="icon">
                    <Bookmark />
                </Button>
            </div>

            {/* Company Info */}
            <div className='flex items-center gap-3 mb-4'>
                <Button className="p-2" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h2 className='font-semibold text-lg mb-1'>{job?.company?.name}</h2>
                    <p className='text-sm text-gray-600'>{job?.location}</p>
                </div>
            </div>

            {/* Job Details */}
            <div className='flex flex-col flex-grow mb-4'>
                <h3 className='font-bold text-xl mb-2'>{job?.title}</h3>
                <p className='text-sm text-gray-700 mb-2'>{job?.description}</p>
            </div>

            {/* Badges */}
            <div className='flex flex-wrap gap-2 mb-4'>
                <Badge className='text-blue-700 font-medium' variant="ghost">{job?.position} Positions</Badge>
                <Badge className='text-[#F83002] font-medium' variant="ghost">{job?.jobType}</Badge>
                <Badge className='text-[#7209b7] font-medium' variant="ghost">{job?.salary} LPA</Badge>
            </div>

            {/* Buttons */}
            <div className='flex gap-4'>
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline" className='flex-1'>
                    Details
                </Button>
                <Button className="bg-[#7209b7] text-white flex-1 hover:bg-[#5e00a2]">
                    Save For Later
                </Button>
            </div>
        </div>
    );
};

export default Job;
