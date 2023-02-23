'use client';
import style from './Preloader.module.css';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import preloaderImage from './Preloader.png';

export const Preloader = () => {
    const [opacity, setOpacity] = useState(style.preloader);

    const changeOpacity = useCallback(() => {
        setOpacity(`${style.preloader} ${style.hidden}`);

    }, [setOpacity]);

    useEffect(() => {
        setTimeout(changeOpacity, 1000);
    }, [changeOpacity]);

    return (
        <div className={opacity}>
            <Image
                src={preloaderImage}
                className={style.preloaderImg}
                alt="logo"
                priority
            />
        </div>
    );
}
