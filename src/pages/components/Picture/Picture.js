'use client';
import React, { useCallback, useState } from 'react';
import style from './Picture.module.css'
import { Button, Carousel, Image, Modal } from 'react-bootstrap';

export const Picture = ({
    width,
    height,
    positionX,
    positionY,
    pictureIndex,
    pictureList,
    index
}) => {

    const [show, setShow] = useState(false);

    const handleClose = useCallback(() => {
        setShow(false);
    }, []);
    const handleShow = useCallback(() => {
        setShow(true);
    }, []);

    const [carouselIndex, setCarouselIndex] = useState(pictureIndex);

    const handleSelect = useCallback((selectedIndex, e) => {
        setCarouselIndex(selectedIndex);
    }, []);

    return (
        <>
            <div
                className={style.picture}
                style={{
                    width: width,
                    height: height,
                    top: positionX,
                    left: positionY
                }}
            >
                <div
                    className={style.pictureForm}
                    style={{
                        backgroundImage: `url(${pictureList.srcPreview}/${pictureList.files[pictureIndex]})`
                    }}
                    onClick={handleShow}
                >
                </div>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                fullscreen={true}
            >
                <Modal.Body>
                    <Carousel
                        className={style.carousel}
                        variant="dark"
                        activeIndex={carouselIndex}
                        onSelect={handleSelect}
                    >
                        {
                            pictureList.files.map((picture, index) => {
                                return (
                                    <Carousel.Item
                                        className={style.carouselItem}
                                        key={index}
                                    >
                                        <div
                                            className={style.caroucelImgBlock}
                                        >
                                            <Image
                                                src={`${pictureList.srcCompression}/${picture}`}
                                                className={style.caroucelImg}
                                            />
                                        </div>
                                        <Carousel.Caption />
                                    </Carousel.Item>
                                )
                            })
                        }

                    </Carousel>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


