'use client';
import Image from 'next/image';
import style from './Picture.module.css'

export const Picture = ({
    width,
    height,
    positionX,
    positionY,
    pictureSrc,
    index
}) => {


    return (
        <div
            className={style.picture}
            style={{
                width: width,
                height: height,
                top: positionX,
                left: positionY
            }}
        >
            <div className={style.pictureForm}>
                <Image
                    src={pictureSrc}
                    className={style.image}
                    alt={index}
                    priority
                />
            </div>
        </div>
    )
}
