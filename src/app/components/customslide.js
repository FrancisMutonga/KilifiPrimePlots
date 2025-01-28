// components/CustomSlide.js
import Image from 'next/image';

const CustomSlide = ({ src, alt }) => (
  <div>
    <Image
      src={src}
      alt={alt}
      layout="responsive"
      width={1200}
      height={500}
      objectFit="cover"
    />
  </div>
);

export default CustomSlide;
