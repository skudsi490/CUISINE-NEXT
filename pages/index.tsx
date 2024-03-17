// E:\sites\CUISINE-NEXT\pages\index.tsx

import React, { useEffect, useState } from "react";
import DishCard from "@/components/DishCard";
import LoadMore from "@/components/LoadMore";
import { DishProp } from "@/app/types";

const Home = () => {
  const [meals, setMeals] = useState<DishProp[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const initialLetter = "a";

  useEffect(() => {
    setIsLoading(true);
    // Dynamically import fetchFood inside useEffect
    import('@/app/action')
      .then(({ fetchFood }) => {
        fetchFood(initialLetter)
          .then((data) => {
            setMeals(data.meals);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Failed to fetch meals:", error);
            setIsLoading(false);
          });
      });
  }, [initialLetter]);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
      <h2 className="text-3xl text-white font-bold">Explore Middle Eastern Cuisine</h2>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {meals.map((meal) => (
          <DishCard key={meal.idMeal} dish={meal} />
        ))}
      </section>
      <LoadMore setMeals={setMeals} />
    </main>
  );
};

export default Home;
