import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            
            if (res.data.success) {
                setIsApplied(true); // Update the local state
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }]
                };
                dispatch(setSingleJob(updatedSingleJob)); // Update the Redux store
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className='max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg'>
            <div className='flex flex-col md:flex-row items-start md:items-center justify-between'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900'>{singleJob?.title}</h1>
                    <div className='flex flex-wrap items-center gap-3 mt-4'>
                        <Badge className='text-blue-700 font-bold' variant="ghost">{singleJob?.position} Positions</Badge>
                        <Badge className='text-[#F83002] font-bold' variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className='text-[#7209b7] font-bold' variant="ghost">{singleJob?.salary} LPA</Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`mt-4 md:mt-0 rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <div className='border-t border-gray-300 mt-6 pt-6'>
                <h2 className='text-xl font-semibold text-gray-900 mb-4'>Job Description</h2>
                <div className='space-y-4'>
                    <div className='flex items-center'>
                        <h3 className='w-1/4 font-semibold text-gray-700'>Role:</h3>
                        <p className='w-3/4 text-gray-800'>{singleJob?.title}</p>
                    </div>
                    <div className='flex items-center'>
                        <h3 className='w-1/4 font-semibold text-gray-700'>Location:</h3>
                        <p className='w-3/4 text-gray-800'>{singleJob?.location}</p>
                    </div>
                    <div className='flex items-center'>
                        <h3 className='w-1/4 font-semibold text-gray-700'>Description:</h3>
                        <p className='w-3/4 text-gray-800'>{singleJob?.description}</p>
                    </div>
                    <div className='flex items-center'>
                        <h3 className='w-1/4 font-semibold text-gray-700'>Experience:</h3>
                        <p className='w-3/4 text-gray-800'>{singleJob?.experienceLevel || 'N/A'} yrs</p>
                    </div>
                    <div className='flex items-center'>
                        <h3 className='w-1/4 font-semibold text-gray-700'>Salary:</h3>
                        <p className='w-3/4 text-gray-800'>{singleJob?.salary} LPA</p>
                    </div>
                    <div className='flex items-center'>
                        <h3 className='w-1/4 font-semibold text-gray-700'>Skills:</h3>
                        <p className='w-3/4 text-gray-800'>{singleJob?.requirements} </p>
                    </div>
                    <div className='flex items-center'>
                        <h3 className='w-1/4 font-semibold text-gray-700'>Total Applicants:</h3>
                        <p className='w-3/4 text-gray-800'>{singleJob?.applications?.length || 0}</p>
                    </div>
                    <div className='flex items-center'>
                        <h3 className='w-1/4 font-semibold text-gray-700'>Posted Date:</h3>
                        <p className='w-3/4 text-gray-800'>{singleJob?.createdAt ? new Date(singleJob.createdAt).toLocaleDateString() : 'N/A'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDescription;
