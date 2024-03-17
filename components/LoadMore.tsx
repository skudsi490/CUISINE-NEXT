import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { DishProp } from "@/app/types";
import { fetchFood } from "@/app/action";

// Function to get the next letter in the alphabet
const getNextLetter = (currentLetter: string) => {
  return currentLetter === "z"
    ? "a"
    : String.fromCharCode(currentLetter.charCodeAt(0) + 1);
};

interface LoadMoreProps {
  setMeals: React.Dispatch<React.SetStateAction<DishProp[]>>;
}

function LoadMore({ setMeals }: LoadMoreProps) {
  const { ref, inView } = useInView();
  const [currentLetter, setCurrentLetter] = useState("a");

  useEffect(() => {
    if (inView) {
      const fetchMoreFood = async () => {
        const result = await fetchFood(currentLetter);
        if (result.meals) {
          setMeals((prevMeals: DishProp[]) => [...prevMeals, ...result.meals]);
          setCurrentLetter(getNextLetter(currentLetter));
        }
      };

      fetchMoreFood();
    }
  }, [inView, currentLetter, setMeals]);

  return (
    <div ref={ref} className="flex justify-center items-center w-full">
      {inView && (
        <Image src="/spinner.svg" alt="Loading..." width={56} height={56} />
      )}
    </div>
  );
}

export default LoadMore;
