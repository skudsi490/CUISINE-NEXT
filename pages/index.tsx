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

const Home = () => {
  const [meals, setMeals] = useState<DishProp[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    category: "",
    area: "",
    ingredients: [],
  });

  const fetchMeals = async (appliedFilters: Filters) => {
    setIsLoading(true);
    let fetchedMeals: DishProp[] = [];

    // First, fetch the filtered meal IDs as before
    try {
      const queryParams = new URLSearchParams();
      if (appliedFilters.category)
        queryParams.append("c", appliedFilters.category);
      if (appliedFilters.area) queryParams.append("a", appliedFilters.area);
      appliedFilters.ingredients.forEach((ingredient) =>
        queryParams.append("i", ingredient)
      );
      const filterUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?${queryParams.toString()}`;

      const filterResponse = await fetch(filterUrl);
      const filterData = await filterResponse.json();
      fetchedMeals = filterData.meals || [];
    } catch (error) {
      console.error("Failed to fetch meals:", error);
    }

    // Then, for each meal, fetch the full details including the area
    const detailedMealsPromises = fetchedMeals.map(async (meal: DishProp) => {
      const detailUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`;
      const detailResponse = await fetch(detailUrl);
      const detailData = await detailResponse.json();
      return detailData.meals[0];
    });

    Promise.all(detailedMealsPromises)
      .then((detailedMeals) => {
        setMeals(detailedMeals);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch meal details:", error);
        setIsLoading(false);
      });
  };


  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchMeals(filters);
  }, []); 

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    const appliedFilters = { ...filters, ...newFilters };
    setFilters(appliedFilters);
    fetchMeals(appliedFilters); // Fetch meals with new filters
  };

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
};

export default Home;
