import React, { useEffect, useState } from "react";

interface Category {
  strCategory: string;
}

interface Area {
  strArea: string;
}

interface Ingredient {
  strIngredient: string;
}

type FilterChange = (filters: {
  category?: string;
  area?: string;
  ingredients?: string[];
}) => void;

const FilterOptions = ({
  onFilterChange,
}: {
  onFilterChange: FilterChange;
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const fetchData = async (endpoint: string) => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/${endpoint}`
    );
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    fetchData("list.php?c=list").then((data) => setCategories(data.meals));
    fetchData("list.php?a=list").then((data) => setAreas(data.meals));
    fetchData("list.php?i=list").then((data) => setIngredients(data.meals));
  }, []);

  const applyFilters = () => {
    onFilterChange({
      category: selectedCategory,
      area: selectedArea,
      ingredients: selectedIngredients,
    });
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setSelectedArea("");
    setSelectedIngredients([]);
  };

  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedArea(e.target.value);
    setSelectedCategory("");
    setSelectedIngredients([]);
  };

  const handleIngredientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const updatedIngredients = selectedIngredients.includes(value)
      ? selectedIngredients.filter(ingredient => ingredient !== value)
      : [...selectedIngredients, value];

    setSelectedIngredients(updatedIngredients);
    setSelectedCategory('');
    setSelectedArea('');
  };


  return (
    <div className="filter-options flex flex-col items-center gap-4 mb-8">
      <div className="flex flex-wrap justify-center gap-4">
        <select
          name="category"
          onChange={handleCategoryChange}
          value={selectedCategory}
          className="bg-gray-800 text-white p-2 rounded-lg shadow-md hover:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.strCategory} value={category.strCategory}>
              {category.strCategory}
            </option>
          ))}
        </select>

        <select
          name="area"
          onChange={handleAreaChange}
          value={selectedArea}
          className="bg-gray-800 text-white p-2 rounded-lg shadow-md hover:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          <option value="">Select Area</option>
          {areas.map((area) => (
            <option key={area.strArea} value={area.strArea}>
              {area.strArea}
            </option>
          ))}
        </select>

        <select
          multiple
          name="ingredient"
          onChange={handleIngredientChange}
          value={selectedIngredients}
          className="bg-gray-800 text-white p-2 rounded-lg shadow-md hover:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          <option value="">Select Ingredients (Ctrl+Click)</option>
          {ingredients.map((ingredient) => (
            <option
              key={ingredient.strIngredient}
              value={ingredient.strIngredient}
            >
              {ingredient.strIngredient}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={applyFilters}
        className="mt-4 bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterOptions;
