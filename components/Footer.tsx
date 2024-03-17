import Image from "next/image";

function Footer() {
  return (
    <footer className="sm:px-16 py-4 px-8 flex justify-between items-center gap-2 flex-wrap bg-[#161921]">
      <p className="text-base font-bold text-white">@2024 Sami Kudsi</p>
      <Image src="/logo.svg" alt="EpicAnimeVault logo" width={47} height={44} />
      <div className="flex items-center gap-6">
        <Image src="/tiktok.svg" alt="TikTok logo" width={19} height={19} />
        <Image src="/instagram.svg" alt="Instagram logo" width={19} height={19} />
        <Image src="/twitter.svg" alt="Twitter logo" width={19} height={19} />
      </div>
    </footer>
  );
}

export default Footer;
