// 'use client';
import { useEffect, useState } from 'react';
import { NavDropdown } from 'react-bootstrap';

export const NavButtonGallerys = ({ expand, gallerysList }) => {
    const [gallerysButtonsList, setGallerysButtonsList] = useState('Загрузка списка галерей...')

    const getGallerysButtonsList = () => {
        if (!gallerysList?.picturesTree?.folders) {
            return;
        }
        const picturesFolders = Object.keys(gallerysList.picturesTree.folders)

        return (
            <NavDropdown
                title="Галереи"
                id={`offcanvasNavbarDropdown-expand-${expand}`}
            >
                {
                    picturesFolders.map(folder => {
                        let cardInfo = gallerysList.picturesTree.folders[folder]?.cardInfo;
                        if (cardInfo) {
                            let path = `/photos/${folder}`;
                            return (
                                <NavDropdown.Item key={folder} href={path}>{cardInfo.title}</NavDropdown.Item>
                            );
                        }
                    })
                }
            </NavDropdown>
        )
    }

    useEffect(() => {
        setGallerysButtonsList(getGallerysButtonsList());
    }, [gallerysList]);

    return (
        <>
            {gallerysButtonsList}
        </>
    );
}
