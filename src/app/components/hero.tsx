import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="bg-white bg-opacity-60 p-8 rounded-lg">
      <div className="container mx-auto font-extrabold flex flex-col gap-4 items-center justify-center text-center">
        <Image src="/logo.png" alt="Company Logo" width={250} height={250} />
        <h1 className="text-4xl text-gray-700 font-bold mt-4">Own a Slice of Paradise in Kilifi</h1>
      </div>
    </section>
  );
};

export default HeroSection;
