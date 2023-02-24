'use client';
import Image from 'next/image';
import styles from './404.module.css';
import errorImg from '../../public/404.png';


export default function Error() {

    return (
        <div className={styles.main}>
            <Image
                src={errorImg}
                // className={}
                alt="Homer error 404"
                priority
            />
        </div>
    )
}

