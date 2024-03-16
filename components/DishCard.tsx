import Image from "next/image";

export interface DishProp {
  id: string;
  name: string;
  image: {
    original: string;
  };
  kind: string;
  origin: string;
  popularity: string;
  score: string;
}

interface Prop {
  dish: DishProp;
  index: number;
}

function DishCard({ dish }: Prop) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg relative w-full">
    <div className="w-full">
      <div className="relative pb-[56.25%]">
        <Image
          src={dish.image.original}
          alt={dish.name}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    </div>
      <div className="py-4 flex flex-col gap-3">
        <div className="flex justify-between items-center gap-1">
          <h2 className="font-bold text-white text-xl line-clamp-1 w-full">
            {dish.name}
          </h2>
          <div className="py-1 px-2 bg-[#161921] rounded-sm">
            <p className="text-white text-sm font-bold capitalize">
              {dish.kind}
            </p>
          </div>
        </div>
        <p className="text-base text-white font-bold">Origin: {dish.origin}</p>
        <p className="text-base text-white">Popularity: {dish.popularity}</p>
        <div className="flex flex-row gap-2 items-center">
          <Image
            src="./star.svg"
            alt="star"
            width={18}
            height={18}
            className="object-contain"
          />
          <p className="text-base font-bold text-[#FFAD49]">{dish.score}</p>
        </div>
      </div>
    </div>
  );
}

export default DishCard;
