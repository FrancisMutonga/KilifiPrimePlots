// components/ImageCarousel.js
"use client";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CustomSlide from './customslide';

const ImageCarousel = () => {
  const images = [
    { src: '/slide1.jpg', alt: 'Image 1' },
    { src: '/slide2.jpg', alt: 'Image 2' },
    { src: '/slide3.jpg', alt: 'Image 3' },
    { src: '/slide4.jpg', alt: 'Image 4' },
  ];

  return (
    <Carousel showThumbs={false} autoPlay infiniteLoop className="mt-4">
      {images.map((image, index) => (
        <CustomSlide key={index} src={image.src} alt={image.alt} />
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
