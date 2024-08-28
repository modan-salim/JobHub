import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    // Fallback image if profile avatar URL is invalid or missing
    const defaultAvatar = "https://example.com/default-avatar.jpg"; // Ensure this is a valid URL
    const avatarSrc = user?.profile?.profilePhoto || defaultAvatar;

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-8 p-8 shadow-lg'>
                <div className='flex flex-col md:flex-row items-center gap-4'>
                    <div className='flex-shrink-0'>
                        <Avatar className="h-24 w-24 border-2 border-gray-300 rounded-full overflow-hidden">
                            <AvatarImage 
                                src={avatarSrc} 
                                alt="profile" 
                                onError={(e) => e.target.src = defaultAvatar} // Handle image load errors
                                className='object-cover h-full w-full'
                            />
                        </Avatar>
                    </div>
                    <div className='flex-grow'>
                        <h1 className='text-2xl font-semibold text-gray-900'>{user?.fullname}</h1>
                        <p className='text-gray-700 mt-2'>{user?.profile?.bio}</p>
                    </div>
                    <Button onClick={() => setOpen(true)} variant="outline" className="flex-shrink-0">
                        <Pen className='h-5 w-5' />
                    </Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 mb-2'>
                        <Mail className='h-5 w-5 text-gray-600' />
                        <span className='text-gray-800'>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3'>
                        <Contact className='h-5 w-5 text-gray-600' />
                        <span className='text-gray-800'>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h2 className='text-lg font-semibold text-gray-900 mb-2'>Skills</h2>
                    <div className='flex flex-wrap gap-2'>
                        {
                            user?.profile?.skills.length !== 0 
                            ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
                            : <span className='text-gray-600'>NA</span>
                        }
                    </div>
                </div>
                <div className='my-5'>
                    <Label className="text-md font-semibold">Resume</Label>
                    {
                        user?.profile?.resume 
                        ? <a target='_blank' rel='noopener noreferrer' href={user?.profile?.resume} className='text-blue-500 hover:underline'>{user?.profile?.resumeOriginalName}</a>
                        : <span className='text-gray-600'>NA</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl p-8 shadow-lg'>
                <h2 className='text-2xl font-semibold text-gray-900 mb-4'>Applied Jobs</h2>
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
}

export default Profile;
