"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { DishProp } from "@/app/types";
import Footer from "@/components/Footer";
import Head from "next/head";

const MealDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [mealDetail, setMealDetail] = useState<DishProp | null>(null);

  useEffect(() => {
    const fetchMealDetail = async () => {
      if (typeof id === "string") {
        try {
          const result = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
          );
          const data = await result.json();
          setMealDetail(data.meals[0]);
        } catch (error) {
          console.error("Failed to fetch meal details:", error);
          // Handle the error (e.g., show an error message)
        }
      }
    };

    fetchMealDetail();
  }, [id]);

  if (!mealDetail) return <div>Loading...</div>;

  return (
    <div className="p-8 bg-[#0F1117] min-h-screen">
      <Head>
        <title>{mealDetail.strMeal} - Food House</title>
        <meta
          name="description"
          content={`Learn how to make ${mealDetail.strMeal}.`}
        />
      </Head>
      <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
        <Image
          src={mealDetail.strMealThumb || "/fallback-image.jpg"}
          alt={mealDetail.strMeal}
          width={1920}
          height={1080}
          fill
          className="object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{mealDetail.strMeal}</h1>
          <p className="text-xl mb-4">
            {mealDetail.strCategory} - {mealDetail.strArea}
          </p>
          <h2 className="text-2xl font-bold">Ingredients</h2>
          <ul className="list-disc pl-5 mb-4">
            {Array.from({ length: 20 }).map((_, index) => {
              const ingredientKey = `strIngredient${index + 1}`;
              const measureKey = `strMeasure${index + 1}`;
              const ingredient = mealDetail[ingredientKey];
              const measure = mealDetail[measureKey];

              if (ingredient && measure) {
                return (
                  <li key={ingredientKey}>
                    {ingredient}: {measure}
                  </li>
                );
              }
              return null;
            })}
          </ul>

          <h2 className="text-2xl font-bold">Instructions</h2>
          <p>{mealDetail.strInstructions}</p>
          {/* Include any other details you want to display */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MealDetail;
