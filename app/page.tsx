import DishCard from "@/components/DishCard";
import LoadMore from "../components/LoadMore";
import { data } from "./_data";

async function Home() {
  return (
    <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
      <h2 className="text-3xl text-white font-bold">Explore Middle Eastern Cuisine</h2>

      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data.map((item, index) => (
          <DishCard key={item.id} dish={item} index={index} />
        ))}
      </section>
      <LoadMore />
    </main>
  );
}

export default Home;
