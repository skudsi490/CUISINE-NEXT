import Image from "next/image";

function LoadMore() {
  return (
    <>
      <section className="flex justify-center items-center w-full">
        <div>
        <Image
          src="./spinner.svg"
          alt="Loading..."
          style={{ width: '56px', height: '56px', objectFit: 'contain' }}
        />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
