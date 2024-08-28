import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer",
    "Product Manager",
    "UX/UI Designer",
    "DevOps Engineer",
    "Digital Marketer",
    "Project Manager"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className="relative my-20">
            <Carousel className="w-full max-w-4xl mx-auto">
                <CarouselContent className="flex items-center">
                    {
                        categories.map((cat, index) => (
                            <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4 p-4">
                                <Button 
                                    onClick={() => searchJobHandler(cat)} 
                                    variant="outline" 
                                    className="w-full h-16 text-lg rounded-full flex items-center justify-center"
                                >
                                    {cat}
                                </Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-md" />
                <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-md" />
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;
