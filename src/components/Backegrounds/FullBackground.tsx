import React from 'react';
import Image from 'next/image';
import styles from './FullBackground.module.css'; // Import CSS file for styling if needed

const imgSrc = '/img/course/unilever_background.png';

const FullBackground = () => {
  return (
      <Image 
	  className={styles.fullBackground}
        alt='test'
        src={imgSrc}
        layout='fill' // Make Image component cover its parent container
        objectFit='cover' // Ensure the image covers the entire space
      />
  );
};

export default FullBackground;
