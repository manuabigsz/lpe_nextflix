'use client'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function Menu() {
    const [scrolling, setScrolling] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();

    const handleScroll = () => {
        setScrolling(window.scrollY > 50);
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
                        <Link className="nav-link text-white" href={`/`}>Home</Link>
                        <NavDropdown
                            title={<span className="text-white">Manutenções</span>}
                            id="basic-nav-dropdown"
                            menuVariant="dark"
                        >
                            <Link className="dropdown-item" href={`/private/categories`}>
                                <span className="text-white">Categorias</span>
                            </Link>
                            <Link className="dropdown-item" href={`/private/videos`}>
                                <span className="text-white">Vídeos</span>
                            </Link>
                        </NavDropdown>
                        <Link className="nav-link text-white" href={`/about`}>Sobre</Link>
                    </Nav>
                    <Nav className="ms-auto">
                        {session ? (
                            <>
                                <span className="navbar-text text-white me-3">
                                    Bem-vindo, {session.user?.name || session.user?.email}
                                </span>
                                <button onClick={() => signOut()} className="btn btn-outline-light btn-sm">
                                    Sair
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => router.push('/login')}
                                className="btn btn-outline-light btn-sm"
                            >
                                Login
                            </button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;
