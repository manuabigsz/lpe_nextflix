'use client';
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
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => setScrolling(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Navbar
            expand="lg"
            className={`navbar fixed-top py-3 ${scrolling ? 'shadow-sm' : ''}`}
            style={{ backgroundColor: scrolling ? '#141414' : 'transparent', transition: 'background-color 0.3s ease' }}
        >
            <Container>
                <Link className="navbar-brand d-flex align-items-center" href="/">
                    <img
                        src="https://agenciapnz.com/wp-content/uploads/Logo-Netflix-Symbol.png"
                        alt="Netflix Logo"
                        style={{ height: '40px' }}
                        className="me-2"
                    />
                    <span className="fw-bold text-white">NextFlix</span>
                </Link>

                <Navbar.Toggle aria-controls="navbar-menu" />
                <Navbar.Collapse id="navbar-menu">
                    {session && (
                        <Nav className="me-auto">
                            <Link className="nav-link text-white" href="/">Home</Link>
                            <NavDropdown title={<span className="text-white">Manutenções</span>} id="nav-dropdown" menuVariant="dark">
                                <Link className="dropdown-item" href="/private/categories">Categorias</Link>
                                <Link className="dropdown-item" href="/private/videos">Vídeos</Link>
                            </NavDropdown>
                            <Link className="nav-link text-white" href="/about">Sobre</Link>
                        </Nav>
                    )}

                    <Nav className="ms-auto align-items-center">
                        {session ? (
                            <>
                                <span className="text-white me-3">
                                    Olá, <strong>{session.user?.name || session.user?.email}</strong>
                                </span>
                                <Link className="btn btn-outline-light btn-sm me-2" href="/user">
                                    Meu Perfil
                                </Link>
                                <button
                                    onClick={() => signOut()}
                                    className="btn btn-danger btn-sm"
                                >
                                    Sair
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => router.push('/login')}
                                    className="btn btn-outline-light btn-sm me-2"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => router.push('/register')}
                                    className="btn btn-light btn-sm"
                                >
                                    Registrar
                                </button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;
