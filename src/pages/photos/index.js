import Head from 'next/head';
import styles from '@/styles/photos/index.module.css';
import { getGallerysList } from '../../lib/getGallerysList.js';
import { GallerysCards } from '../components/GallerysCards/GallerysCards.js';
import { useAppContext } from '@/context/context.js';
import { useEffect } from 'react';


export default function Photos({ gallerysList }) {
    const { state, dispatch } = useAppContext();

    useEffect(() => {
        dispatch({ type: "set_title", value: 'Галерея' });
        dispatch(
            {
                type: 'set_NavBarGalleryMenu',
                value: { ...gallerysList }
            }
        )
    }, [])
    return (
        <>
            <main className={styles.main}>
                <p>Галереи</p>
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
