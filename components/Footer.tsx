import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="sm:px-16 py-4 px-8 flex justify-between items-center gap-2 flex-wrap bg-[#161921]">
      <p className="text-base font-bold text-white">@2024 Sami Kudsi</p>
      <Image src="/logo.svg" alt="Cuisine logo" width={47} height={44} />
      <div className="flex items-center gap-6">
        <a href="https://www.linkedin.com/in/sami-kudsi-0b1010164/" target="_blank" rel="noopener noreferrer">
          <Image src="/bi_linkedin.svg" alt="LinkedIn logo" width={24} height={24} />
        </a>
        <a href="https://github.com/skudsi490" target="_blank" rel="noopener noreferrer">
          <Image src="/fa_github.svg" alt="GitHub logo" width={24} height={24} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
