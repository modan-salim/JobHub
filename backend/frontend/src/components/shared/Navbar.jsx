import React, { useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('User state:', user); // Debugging user data
    }, [user]);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error("Logout error:", error);
            toast.error(error.response?.data?.message || "Logout failed");
        }
    };

    return (
        <nav className='bg-white shadow-md border-b border-gray-300'>
            <div className='container mx-auto flex items-center justify-between py-4 px-6 md:px-12'>
                <h1 className='text-3xl font-extrabold text-purple-700 p-1 rounded-md'>
                    Job<span className='text-purple-500'>Hub</span>
                </h1>
                <ul className='flex items-center space-x-6 text-gray-900'>
                    <li><Link to="/" className='text-lg hover:text-purple-600 transition-colors'>Home</Link></li>
                    <li><Link to="/jobs" className='text-lg hover:text-purple-600 transition-colors'>Jobs</Link></li>
                    <li><Link to="/browse" className='text-lg hover:text-purple-600 transition-colors'>Browse</Link></li>
                    {user && user.role === 'recruiter' && (
                        <>
                            <li><Link to="/admin/companies" className='text-lg hover:text-purple-600 transition-colors'>Companies</Link></li>
                            <li><Link to="/admin/jobs" className='text-lg hover:text-purple-600 transition-colors'>Jobs</Link></li>
                        </>
                    )}
                    {user ? (
                        <li>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer h-10 w-10 rounded-full border-2 border-purple-500 overflow-hidden">
                                        <AvatarImage 
                                            src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} 
                                            alt="User profile" 
                                            className='object-cover h-full w-full' 
                                        />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-96 bg-white text-gray-800 shadow-lg rounded-lg p-4">
                                    <div className='flex flex-col items-start gap-4'>
                                        <div className='flex gap-4 items-center'>
                                            <Avatar className="h-16 w-16 border-2 border-purple-500 overflow-hidden">
                                                <AvatarImage 
                                                    src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} 
                                                    alt="User profile" 
                                                    className='object-cover h-full w-full' 
                                                />
                                            </Avatar>
                                            <div>
                                                <h4 className='text-lg font-semibold'>{user?.fullname}</h4>
                                                <p className='text-sm text-gray-600'>{user?.profile?.bio || 'No bio available'}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col mt-4'>
                                            {user.role === 'student' && (
                                                <div className='flex items-center gap-2 mb-2'>
                                                    <User2 />
                                                    <Button variant="link" className='text-lg text-purple-700'>
                                                        <Link to="/profile">View Profile</Link>
                                                    </Button>
                                                </div>
                                            )}
                                            <div className='flex items-center gap-2'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link" className='text-lg text-purple-700'>
                                                    Logout
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </li>
                    ) : (
                        <>
                            <li><Link to="/login">
                                <Button variant="outline" className='text-purple-700 border-purple-500 hover:bg-purple-50 text-lg'>Login</Button>
                            </Link></li>
                            <li><Link to="/signup">
                                <Button className="bg-purple-500 hover:bg-purple-600 text-white text-lg">Signup</Button>
                            </Link></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
