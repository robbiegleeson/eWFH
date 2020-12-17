import React, { useEffect, useState } from 'react';

const easeOutQuad = t => t * ( 2 - t );
const frameDuration = 1000 / 60;

const Counter = ({ children, duration = 1200 }) => {
  const countTo = children;
  const [ count, setCount ] = useState( 0 );

  useEffect( () => {
    let frame = 0;
    const totalFrames = Math.round( duration / frameDuration );
    const counter = setInterval( () => {
      frame++;
      const progress = easeOutQuad( frame / totalFrames );
      setCount( countTo * progress );
      if ( frame === totalFrames ) {
        clearInterval( counter );
      }
    }, frameDuration );
  }, [children] );

  return String(count.toFixed(2));
};

export default Counter;
