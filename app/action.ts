// E:\sites\CUISINE-NEXT\app\action.ts

// Remove "use server" if you plan to use this on the client side
export const fetchFood = async (letter: string) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
  const data = await response.json();
  return data;
};
