import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        setIsLoading(true);
        setError('');
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
                <h1 className="text-2xl font-semibold mb-4">Create Your Company</h1>
                <p className="text-gray-600 mb-6">Please provide the name of your company. You can change this later.</p>

                <Label htmlFor="companyName">Company Name</Label>
                <Input
                    id="companyName"
                    type="text"
                    className="my-2"
                    placeholder="e.g., JobHunt, Microsoft"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="flex gap-4">
                    <Button variant="outline" onClick={() => navigate("/admin/companies")}>
                        Cancel
                    </Button>
                    <Button
                        onClick={registerNewCompany}
                        disabled={isLoading || !companyName}
                    >
                        {isLoading ? 'Creating...' : 'Continue'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CompanyCreate;
