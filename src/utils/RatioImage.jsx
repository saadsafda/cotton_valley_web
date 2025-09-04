import React, { useEffect, useRef } from 'react';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

const RatioImage = (props) => {
  const bgImg = useRef(null);

  useEffect(() => {
    const image = bgImg.current;
    if (image.classList.contains('bg-img')) {
      const parentElement = image.parentElement;
      let src = image.getAttribute('src');
      if (src && !src.startsWith('http')) {
        src = baseUrl + src;
      }
      parentElement.classList.add('bg-size');
      image.style.display = 'none';
      parentElement.setAttribute(
        'style',
        `
        background-image: url(${src});
        background-size:cover; 
        background-position: center;
        background-repeat: no-repeat;
        display: block;
        `,
      );
    }
  }, [props]);

  return <img ref={bgImg} {...props} />;
};
export default RatioImage;
