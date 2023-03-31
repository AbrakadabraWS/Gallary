// 'use client';
import { useEffect, useState } from 'react';
import style from './GallerysCards.module.css';
import { Button, Card, CardGroup, Col, Row } from 'react-bootstrap';

export const GallerysCards = ({ gallerysList }) => {
    const [gallerysCards, setGallerysCards] = useState('Загрузка списка галерей...')
    const getGallerysCards = () => {
        const picturesFolders = Object.keys(gallerysList.picturesTree.folders)

        return (
            <Row xs={1} md={2} className={style.cardRow}>
                {
                    picturesFolders.map(folder => {
                        let cardInfo = gallerysList.picturesTree.folders[folder]?.cardInfo;
                        if (cardInfo) {
                            let path = `/photos/${folder}`;
                            return (
                                <Col key={folder} className={style.cardCol + ' px-2 py-2'}>
                                    <Card className={style.card}>
                                        <Card.Body className={style.cardBody}>
                                            <div className="mb-2">
                                                <Card.Title>{cardInfo.title}</Card.Title>
                                                <Card.Text>
                                                    {cardInfo.text}
                                                </Card.Text>
                                            </div>
                                            <div>
                                                <Button variant="primary" href={path}>Посмотреть галерею</Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                        }
                    })
                }
            </Row>

        );
    }

    useEffect(() => {
        setGallerysCards(getGallerysCards());
    }, [gallerysList]);

    return (
        <>
            {gallerysCards}
        </>
    );
}
