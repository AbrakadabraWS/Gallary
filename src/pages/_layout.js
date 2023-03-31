import Image from "next/image";
import { useAppContext } from "@/context/context";
import { useEffect, useState } from "react";
import { Container, Nav, NavDropdown, Navbar, Offcanvas } from "react-bootstrap";
import Head from "next/head";
import { NavButtonGallerys } from "./components/NavButtonGallerys/NavButtonGallerys";

export default function Layout({ children }) {
    const expand = 'xl';
    const { state, dispatch } = useAppContext();
    const [title, setTitle] = useState(state.title);
    const [navTitle, setNavTitle] = useState(state.navTitle);
    const [navGallerys, setNavGallerys] = useState();


    useEffect(() => {
        if (state) {
            setTitle(state.title);
            setNavTitle(state.navTitle);
            setNavGallerys(state.navBarGalleryMenu);
        }
    }, [state]);

    useEffect(() => {

    }, [navTitle]);
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={'by Kuchin E.V. ' + new Date().getFullYear()} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.svg" />
            </Head>

            <Navbar key={expand} bg="dark" variant="dark" expand={expand}>
                <Container fluid>
                    <Navbar.Brand href="/">
                        <Image
                            src="/favicon.svg"
                            width={30}
                            height={30}
                            alt="Домой"
                        />
                        Gallery
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                {navTitle}
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href="/">На главную</Nav.Link>
                                <NavButtonGallerys expand={expand} gallerysList={navGallerys} />
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
            {children}
        </>
    );
}
