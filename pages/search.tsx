import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DishCard from "@/components/DishCard";
import { DishProp } from "@/app/types";

const SearchPage: React.FC = () => {

  const [searchResults, setSearchResults] = useState<DishProp[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchTerm = router.query.s as string; 

  const performSearch = async (term: string) => {
    setIsLoading(true); 
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
          term
        )}`
      );
      const data = await response.json();
      setSearchResults(data.meals || []);
    } catch (error) {

      console.error("Failed to fetch search results:", error);
    } finally {

      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      performSearch(searchTerm);
    }
  }, [searchTerm]);

  return (
    <div className="p-8">
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              {searchResults.map((meal) => (
                <DishCard key={meal.idMeal} dish={meal} />
              ))}
            </div>
          ) : (
            searchTerm && (
              <div className="text-center mt-8">
                No results found for &quot;{searchTerm}&quot;.
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};


export default SearchPage;
