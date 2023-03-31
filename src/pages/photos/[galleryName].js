import styles from '@/styles/photos/galleryName.module.css';
import { getGallerysList } from '../../lib/getGallerysList.js';
import { useRouter } from 'next/router.js';
import { useAppContext } from '@/context/context.js';
import { useEffect } from 'react';
import Base from '../components/Base/Base.js';
import { getPicturesList } from '@/lib/getPicturesList.js';


export default function GalleryName({ gallerysList, picturesList }) {
    const { state, dispatch } = useAppContext();

    const router = useRouter();
    const { galleryName } = router.query;

    useEffect(() => {
        dispatch({ type: "set_title", value: gallerysList.picturesTree.folders[galleryName].cardInfo.title });
        dispatch(
            {
                type: 'set_NavBarGalleryMenu',
                value: { ...gallerysList }
            }
        )
    }, [])

    return (
        <main className={styles.main}>
            <Base>
                {picturesList}
            </Base>
        </main>
    );
}

export async function getServerSideProps(context) {
    const galleryName = context.params.galleryName;
    let gallerysList = await getGallerysList();
    let picturesList = await getPicturesList(galleryName);
    return {
        props: {
            gallerysList: gallerysList ? gallerysList : null,
            picturesList: picturesList ? picturesList : null,
        }
    }
}
