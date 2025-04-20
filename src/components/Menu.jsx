'use client'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';
import { useState, useEffect } from 'react';

function Menu() {
    const [scrolling, setScrolling] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setScrolling(true);
        } else {
            setScrolling(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Navbar
            expand="lg"
            className={`navbar ${scrolling ? 'scrolled' : ''}`}
            style={{ backgroundColor: scrolling ? '#141414' : 'transparent' }}
        >
            <Container>
                <Link className="navbar-brand" href={`/`}>
                    <img
                        src="https://agenciapnz.com/wp-content/uploads/Logo-Netflix-Symbol.png"
                        alt="Netflix Logo"
                        style={{ height: '40px' }}
                    />
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link text-white" href={`/`}>
                            Home
                        </Link>
                        <NavDropdown
                            title={<span className="text-white">Manutenções</span>}
                            id="basic-nav-dropdown"
                            menuVariant="dark" // deixa o menu escuro
                        >
                            <Link className="dropdown-item" href={`/private/categories`}>
                                <span className="text-white">Categorias</span>
                            </Link>
                            <Link className="dropdown-item" href={`/private/video`}>
                                <span className="text-white">Vídeos</span>
                            </Link>
                        </NavDropdown>
                        <Link className="nav-link text-white" href={`/about`}>
                            Sobre
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;
