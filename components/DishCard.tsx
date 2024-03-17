import Image from "next/image";
import Link from "next/link";

interface DishProp {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strTags: string | null;
  strYoutube: string;
}

interface Prop {
  dish: DishProp;
}

const DishCard: React.FC<Prop> = ({ dish }) => {
  const areaDisplay = dish.strArea || "Area not specified";

  return (
    <Link href={`/${dish.idMeal}`} passHref>
      <div className="max-w-sm rounded relative w-full">
        <div className="relative w-full h-[37vh]">
          <Image
            src={dish.strMealThumb}
            alt={dish.strMeal}
            fill
            className="rounded-xl"
          />
        </div>
        <div className="py-4 flex flex-col gap-3">
          <div className="flex justify-between items-center gap-1">
            <h2 className="font-bold text-white text-xl line-clamp-1 w-full">
              {dish.strMeal}
            </h2>
            <div className="py-1 px-2 bg-[#161921] rounded-sm">
              <p className="text-white text-sm font-bold capitalize">
                {dish.strCategory}
              </p>
            </div>
          </div>
          <p className="text-base text-white font-bold">Area: {areaDisplay}</p>
        </div>
      </div>
    </Link>
  );
};

export default DishCard;
