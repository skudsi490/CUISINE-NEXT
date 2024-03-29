// E:\sites\CUISINE-NEXT\pages\[id].tsx

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { DishProp } from "@/app/types";

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
        }
      }
    };

    fetchMealDetail();
  }, [id]);

  if (!mealDetail) {
    return <div className="text-center">Loading...</div>;
  }

  // Extract the YouTube video ID from the URL
  const videoId = mealDetail.strYoutube.split("v=")[1];
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="p-8 bg-[#0F1117] min-h-screen text-white">
      <div className="max-w-4xl mx-auto bg-[#161921] rounded-lg overflow-hidden shadow-lg">
        <Image
          src={mealDetail.strMealThumb || "/fallback-image.jpg"}
          alt={mealDetail.strMeal}
          layout="responsive"
          width={1920}
          height={1080}
          objectFit="cover"
          className="rounded-t-lg"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{mealDetail.strMeal}</h1>
          <p className="text-xl mb-4">
            {mealDetail.strCategory} - {mealDetail.strArea}
          </p>

          {mealDetail.strSource && (
            <a
              href={mealDetail.strSource}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Source
            </a>
          )}

          <h2 className="text-2xl font-bold mt-4">Ingredients</h2>
          <ul className="list-disc pl-5 mb-4">
            {Array.from({ length: 20 }).map((_, index) => {
              const ingredient = mealDetail[`strIngredient${index + 1}`];
              const measure = mealDetail[`strMeasure${index + 1}`];
              return ingredient && measure ? (
                <li key={index}>
                  {ingredient}: {measure}
                </li>
              ) : null;
            })}
          </ul>

          <h2 className="text-2xl font-bold">Instructions</h2>
          <p className="whitespace-pre-line mb-4">
            {mealDetail.strInstructions}
          </p>

          {videoId && (
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={youtubeEmbedUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealDetail;
