import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);

    return (
        <div className="p-4 bg-white rounded-lg shadow-lg">
            <Table className="w-full">
                <TableCaption className="text-xl font-semibold text-gray-800">A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-100 border-b border-gray-200">
                        <TableHead className="text-lg font-medium text-gray-600">Date</TableHead>
                        <TableHead className="text-lg font-medium text-gray-600">Job Role</TableHead>
                        <TableHead className="text-lg font-medium text-gray-600">Company</TableHead>
                        <TableHead className="text-lg font-medium text-gray-600 text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0 ? (
                            <TableRow>
                                <TableCell colSpan="4" className="text-center text-gray-600 py-4">You haven't applied for any jobs yet.</TableCell>
                            </TableRow>
                        ) : allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id} className="border-b border-gray-200">
                                <TableCell className="py-3 text-lg">{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell className="py-3 text-lg">{appliedJob.job?.title}</TableCell>
                                <TableCell className="py-3 text-lg">{appliedJob.job?.company?.name}</TableCell>
                                <TableCell className="py-3 text-lg text-right">
                                    <Badge className={`py-1 px-3 rounded-full text-white ${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>
                                        {appliedJob.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
}

export default AppliedJobTable;
