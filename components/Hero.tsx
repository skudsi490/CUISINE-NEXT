import Image from "next/image";

function Hero() {
  return (
    <header className="bg-hero bg-center bg-cover bg-no-repeat sm:p-16 py-16 px-8 flex justify-center lg:items-center max-lg:flex-col w-full sm:gap-16 gap-0">
      <div className="flex-1 flex flex-col gap-10">
        <Image
          src="./logo.svg"
          alt="logo"
          style={{ width: "101px", height: "96px", objectFit: "contain" }}
        />
        <h1 className="...">Explore The <span className="purple-gradient">Magic</span> of The Middle East</h1>

      </div>
      <div className="lg:flex-1 relative w-full h-[50vh] justify-center">
      <Image src="/anime.png" alt="anime" style={{ width: '100%', height: '50vh', objectFit: 'contain' }} />
      </div>
    </header>
  );
}

export default Hero;
