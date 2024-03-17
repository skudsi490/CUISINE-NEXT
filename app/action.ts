"use server";

// This function will take a letter and fetch meals starting with that letter
export const fetchFood = async (letter: string) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
  const data = await response.json();
  return data;
};
