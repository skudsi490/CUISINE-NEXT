import Image from 'next/image';
import Link from 'next/link';

function Hero() {
  return (
    <header className="bg-hero bg-center bg-cover bg-no-repeat sm:p-16 py-16 px-8 flex justify-center lg:items-center max-lg:flex-col w-full sm:gap-16 gap-0">
      <div className="flex-1 flex flex-col gap-10">
        {/* Use Link without <a> tag */}
        <Link href="/">
    
            <Image src="/logo.svg" alt="logo" width={201} height={196} priority />
  
        </Link>
        <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight text-center shadow-lg">
          Explore The{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Magic
          </span>{" "}
          of The Best Cuisines
        </h1>
      </div>
      <div className="lg:flex-1 relative w-full h-[50vh]">
        <Image src="/anime.png" alt="anime" layout='fill' objectFit='cover' priority />
      </div>
    </header>
  );
}

export default Hero;
  