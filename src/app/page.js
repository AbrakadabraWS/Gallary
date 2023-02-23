
'use client';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from './page.module.css';
import { Preloader } from '../components/Preloader/Preloader';
import { Collage } from '@/components/Collage/Collage';
import { useEffect, useRef, useState } from 'react';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const mainRef = useRef();

  useEffect(() => {
    setHeight(mainRef.current.clientHeight);
    setWidth(mainRef.current.clientWidth);
  }, [setHeight, setWidth]);

  return (
    <main
      ref={mainRef}
      className={styles.main}
    >
      <Preloader />
      <Collage height={height} width={width} />
    </main>
  )
}
