import React from "react";
import Image from "next/image";

interface ProductCardProps {
  name: string;
  image: string;
  location: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  image,
  location,
  price,
}) => {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg bg-beige/70 border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col ">
      {/* Image container */}
      <div className="relative w-full h-64">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      {/* Text content */}
      <div className="p-6  flex flex-col space-y-3">
        <h3 className="text-lg font-semibold text-dark">{name}</h3>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Price:</span> {price}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Location:</span> {location}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
