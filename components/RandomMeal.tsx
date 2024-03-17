import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { DishProp } from '@/app/types'; 

const RandomMeal = () => {
    const [meal, setMeal] = useState<DishProp | null>(null); 
    
    const fetchRandomMeal = async () => {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
        const data = await response.json();
        setMeal(data.meals[0]);
    };

    useEffect(() => {
        fetchRandomMeal();
    }, []);

    if (!meal) {
        return <div className="text-center text-white text-lg bg-gray-800 p-4 rounded-md">Loading Meal of the Day...</div>;
    }

    return (
        <div className="random-meal p-8 bg-gray-800 text-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Meals of the Day</h2>
            <div className="meal-content flex flex-col items-center gap-4">
                <Image
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    width={320}
                    height={180}
                    layout="intrinsic"
                    className="rounded-lg"
                />
                <h3 className="text-2xl">{meal.strMeal}</h3>
                <p className="text-lg">{meal.strCategory} - {meal.strArea}</p>
                <p className="text-sm text-gray-300">{meal.strInstructions.substring(0, 150)}...</p>
                <button
                    className="px-6 py-2 bg-blue-500 hover:bg-blue-700 transition-colors duration-300 rounded text-white uppercase font-semibold"
                    onClick={fetchRandomMeal}
                >
                    Refresh Meal
                </button>
            </div>
        </div>
    );
};

export default RandomMeal;
