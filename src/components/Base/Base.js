
'use client';
import styles from './Base.module.css';
import { Preloader } from '../Preloader/Preloader';
import { Collage } from '@/components/Collage/Collage';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function Base({ children }) {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const mainRef = useRef();

  const updateSize = useCallback(() => {
    setHeight(mainRef.current.clientHeight);
    setWidth(mainRef.current.clientWidth);
  }, []);


  useEffect(() => {
    updateSize()

    window.addEventListener('resize', updateSize);
  }, [updateSize]);

  return (
    <div
      ref={mainRef}
      className={styles.base}
    >
      <Preloader />
      <Collage height={height} width={width} picturesList={children.picturesList} />
    </div>
  )
}
