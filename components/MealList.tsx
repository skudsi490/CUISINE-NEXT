import React from "react";
import DishCard from "./DishCard";
import { DishProp } from "@/app/types";

interface MealListProps {
  meals: DishProp[];
  title?: string; 
}

const MealList: React.FC<MealListProps> = ({ meals, title }) => {
  if (!meals || meals.length === 0) {
    return <div className="text-center">No meals found.</div>;
  }

  return (
    <div className="meal-list">
      {title && <h2 className="text-3xl text-white font-bold mb-6">{title}</h2>}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {meals.map((meal) => (
          <DishCard key={meal.idMeal} dish={meal} />
        ))}
      </div>
    </div>
  );
};

export default MealList;
