// components/BackgroundRandom.js
import React, { useEffect } from 'react';
import Image from 'next/image';

const shapes = [
  "/img/course/logo.png",
  "/img/course/logo.png",
  "/img/course/logo.png",
  "/img/course/unfound.png",
  "/img/course/shapes/shape-1.png",
  "/img/course/shapes/shape-2.png",
  "/img/course/shapes/shape-3.png",
  "/img/course/shapes/shape-4.png",
  "/img/course/shapes/shape-5.png",
  "/img/course/shapes/shape-6.png",
  // Add more shapes as needed
];


export default function BackgroundRandom() {
  useEffect(() => {
    const handleMouseMove = (event) => {
      const shapes = document.querySelectorAll('.shape');
      shapes.forEach((shape) => {
        const { clientX, clientY } = event;
        const x = (clientX - window.innerWidth / 2) / 40; // Adjust the divisor for more or less movement
        const y = (clientY - window.innerHeight / 2) / 40; // Adjust the divisor for more or less movement
        shape.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-[-10]">
      {shapes.map((shape, index) => (
        <Image
          key={index}
          src={shape}
          alt={`Shape ${index + 1}`}
          width={50}
          height={50}
          className="shape absolute animate-wiggle animate-infinite"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
}
