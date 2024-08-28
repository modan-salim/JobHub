import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
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
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="relative">
            <Carousel className="w-full max-w-6xl mx-auto my-10">
                <CarouselContent>
                    {categories.map((cat, index) => (
                        <CarouselItem key={index} className="flex justify-center items-center p-4">
                            <Button 
                                onClick={() => searchJobHandler(cat)} 
                                variant="outline" 
                                className="rounded-full px-6 py-2 text-lg font-medium bg-white shadow-md hover:bg-gray-100"
                            >
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10" />
                <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10" />
            </Carousel>
        </div>
    );
}

export default CategoryCarousel;
