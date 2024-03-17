
"use client";

import React, { useEffect, useState } from "react";
import DishCard from "@/components/DishCard";
import LoadMore from "@/components/LoadMore";
import { DishProp } from "@/app/types";
import { fetchFood } from "@/app/action";

function Home() {
  const [meals, setMeals] = useState<DishProp[]>([]);
  const initialLetter = "a"; 

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchFood(initialLetter);
      setMeals(result.meals);
    };

    fetchData();
  }, [initialLetter]); 

  return (
    <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
      <h2 className="text-3xl text-white font-bold">
        Explore Middle Eastern Cuisine
      </h2>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {meals.map((item) => (
          <DishCard key={item.idMeal} dish={item} />
        ))}
      </section>
      <LoadMore setMeals={setMeals} />
    </main>
  );
}

export default Home;
