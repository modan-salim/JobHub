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
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "student", // Keep "student" for backend compatibility
        file: null
    });

    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput(prevInput => ({ ...prevInput, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0] || null;
        setInput(prevInput => ({ ...prevInput, file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const response = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });
            if (response.data.success) {
                toast.success(response.data.message);
                navigate("/login");
            }
        } catch (error) {
            console.error('Signup error:', error);
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
                <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-8">
                    <h1 className="text-2xl font-bold mb-6 text-center text-purple-700">Create Your Account</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="my-4">
                            <Label htmlFor="fullname" className="block text-sm font-medium text-gray-700">Full Name</Label>
                            <Input
                                id="fullname"
                                type="text"
                                name="fullname"
                                value={input.fullname}
                                onChange={handleInputChange}
                                placeholder="Enter your full name"
                                required
                                className="border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm"
                            />
                        </div>

                        <div className="my-4">
                            <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={input.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email address"
                                required
                                className="border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm"
                            />
                        </div>

                        <div className="my-4">
                            <Label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</Label>
                            <Input
                                id="phoneNumber"
                                type="tel"
                                name="phoneNumber"
                                value={input.phoneNumber}
                                onChange={handleInputChange}
                                placeholder="Enter your phone number"
                                required
                                className="border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm"
                            />
                        </div>

                        <div className="my-4">
                            <Label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={input.password}
                                onChange={handleInputChange}
                                placeholder="Enter a strong password"
                                required
                                className="border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm"
                            />
                        </div>

                        <div className="my-4">
                            <Label className="block text-sm font-medium text-gray-700">Role</Label>
                            <RadioGroup className="flex items-center gap-4 mt-2">
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        id="student"
                                        checked={input.role === 'student'}
                                        onChange={handleInputChange}
                                        className="cursor-pointer"
                                    />
                                    <Label htmlFor="student" className="text-gray-700">Applicant</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        id="recruiter"
                                        checked={input.role === 'recruiter'}
                                        onChange={handleInputChange}
                                        className="cursor-pointer"
                                    />
                                    <Label htmlFor="recruiter" className="text-gray-700">Recruiter</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="my-4">
                            <Label htmlFor="file" className="block text-sm font-medium text-gray-700">Profile Photo</Label>
                            <Input
                                id="file"
                                accept="image/*"
                                type="file"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                            />
                            <p className="mt-1 text-sm text-gray-600">Upload a profile photo (optional)</p>
                        </div>

                        <div>
                            {loading ? (
                                <Button className="w-full py-2 bg-purple-500 text-white font-semibold" disabled>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Please wait
                                </Button>
                            ) : (
                                <Button type="submit" className="w-full py-2 bg-purple-500 text-white font-semibold hover:bg-purple-600">
                                    Sign Up
                                </Button>
                            )}
                        </div>

                        <div className="text-center">
                            <span className="text-sm text-gray-600">
                                Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
