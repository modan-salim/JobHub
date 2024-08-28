import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Ahmedabad", "Surat", "Vadodara", "Indore"]
    },
    {
        filterType: "Industry",
        array: [
            "Frontend Developer", 
            "Backend Developer", 
            "FullStack Developer", 
            "Data Scientist", 
            "UX/UI Designer", 
            "Product Manager", 
            "Marketing Specialist", 
            "Sales Executive", 
            "HR Manager", 
            "Finance Analyst", 
            "Operations Manager", 
            "Business Analyst", 
            "Software Engineer", 
            "Cybersecurity Specialist"
        ]
    },
    {
        filterType: "Salary",
        array: ["0-4 LPA", "4-10 LPA", "10-25 LPA", "25-50 LPA", "50 LPA+"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div className='w-full max-w-xs bg-white p-3 rounded-md shadow-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    filterData.map((data, index) => (
                        <div key={index} className='my-4'>
                            <h1 className='font-bold text-lg'>{data.filterType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div className='flex items-center space-x-2 my-2' key={itemId}>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard;
