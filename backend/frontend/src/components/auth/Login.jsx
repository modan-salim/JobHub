import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "student", // Keep "student" for backend logic
    });

    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                navigate("/"); 
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
                    <h1 className="text-2xl font-bold mb-6 text-center text-purple-700">Login</h1>
                    <form onSubmit={submitHandler} className="space-y-6">
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                placeholder="Enter your email address"
                                required
                                className="border rounded-md py-2 px-3 w-full"
                            />
                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={input.password}
                                onChange={changeEventHandler}
                                placeholder="Enter your password"
                                required
                                className="border rounded-md py-2 px-3 w-full"
                            />
                        </div>
                        
                        <div>
                            <Label>Role</Label>
                            <RadioGroup className="flex items-center gap-4 mt-2">
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="radio"
                                        id="applicant"
                                        name="role"
                                        value="student" // This should be "student" to match backend logic
                                        checked={input.role === 'student'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer"
                                    />
                                    <Label htmlFor="applicant" className="text-gray-700">Applicant</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="radio"
                                        id="recruiter"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer"
                                    />
                                    <Label htmlFor="recruiter" className="text-gray-700">Recruiter</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div>
                            {loading ? (
                                <Button className="w-full py-2 bg-purple-500 text-white font-semibold" disabled>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Please wait
                                </Button>
                            ) : (
                                <Button type="submit" className="w-full py-2 bg-purple-500 text-white font-semibold hover:bg-purple-600">
                                    Login
                                </Button>
                            )}
                        </div>

                        <div className="text-center">
                            <span className="text-sm text-gray-600">
                                Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Signup</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
