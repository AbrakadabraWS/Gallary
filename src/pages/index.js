import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { getGallerysList } from '../lib/getGallerysList';
import { GallerysCards } from './components/GallerysCards/GallerysCards.js';
import { useAppContext } from '@/context/context';
import { useEffect } from 'react';

// const inter = Inter({ subsets: ['latin'] })

export default function Home({ gallerysList }) {
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    dispatch({ type: 'set_title' });
    dispatch(
      {
        type: 'set_NavBarGalleryMenu',
        value: { ...gallerysList }
      }
    );
  }, []);

  return (
    <>
      <main className={styles.main}>
        <h2>Главная</h2>
        <div className={styles.gallerys}>
          <GallerysCards gallerysList={gallerysList} />
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  let gallerysList = await getGallerysList();
  return { props: { gallerysList: gallerysList ? gallerysList : null } }
}
