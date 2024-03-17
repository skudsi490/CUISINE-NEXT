// index.tsx

import React, { useEffect, useState } from "react";
import DishCard from "@/components/DishCard";
import LoadMore from "@/components/LoadMore";
import RandomMeal from "@/components/RandomMeal";
import SearchBar from "@/components/SearchBar";
import FilterOptions from "@/components/FilterOptions";
import { DishProp } from "@/app/types";

interface Filters {
  category: string;
  area: string;
  ingredients: string[];
}

function Home() {
  const [meals, setMeals] = useState<DishProp[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    category: "",
    area: "",
    ingredients: [],
  });

  const fetchMeals = async (appliedFilters: Filters) => {
    setIsLoading(true);

    try {
      const queryParams = new URLSearchParams();
      if (appliedFilters.category)
        queryParams.append("c", appliedFilters.category);
      if (appliedFilters.area) queryParams.append("a", appliedFilters.area);
      appliedFilters.ingredients.forEach((ingredient) =>
        queryParams.append("i", ingredient)
      );
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?${queryParams.toString()}`;

      const response = await fetch(url);
      const data = await response.json();
      const mealsData: DishProp[] = data.meals || [];
      setMeals(mealsData);
    } catch (error) {
      console.error("Failed to fetch meals:", error);
      // Notify user of the error if you have a notification system
    } finally {
      setIsLoading(false);
    }
  };

  // Handle filter change and fetch data
  const handleFilterChange = (newFilters: Partial<Filters>) => {
    const appliedFilters = { ...filters, ...newFilters };
    setFilters(appliedFilters);
    fetchMeals(appliedFilters);
  };

  // Fetch meals on mount
  useEffect(() => {
    fetchMeals(filters);
  }, []); // The empty array ensures this effect only runs once on mount

  return (
    <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
      <SearchBar />
      <RandomMeal />
      <FilterOptions onFilterChange={handleFilterChange} />
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {meals.length > 0 ? (
            meals.map((meal) => <DishCard key={meal.idMeal} dish={meal} />)
          ) : (
            <p className="text-center col-span-full">No meals found.</p>
          )}
        </div>
      )}
      <LoadMore setMeals={setMeals} />
    </main>
  );
}

export default Home;
