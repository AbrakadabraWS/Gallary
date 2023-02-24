'use client';
import React, { useState } from 'react';
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

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [carouselIndex, setCarouselIndex] = useState(pictureIndex);

    const handleSelect = (selectedIndex, e) => {
        setCarouselIndex(selectedIndex);
    };
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
                        backgroundImage: `url(${pictureList[pictureIndex].src})`
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
                            pictureList.map((picture, index) => {
                                return (
                                    <Carousel.Item
                                        className={style.carouselItem}
                                        key={index}
                                    >
                                        <div
                                            className={style.caroucelImgBlock}
                                        >
                                            <Image
                                                src={`${picture.src}`}
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


