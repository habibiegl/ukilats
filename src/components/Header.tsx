import { useState } from 'react'
import './styles/Header.css'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    return (
        <header className="header">
            <div className="header-container container">
                <a href="#" className="logo">
                    <span className="logo-text">Ukilats</span>
                    <span className="logo-dot"></span>
                </a>

                <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
                    <a href="#products" className="nav-link" onClick={closeMenu}>Produk</a>
                    <a href="#freebies" className="nav-link" onClick={closeMenu}>Gratis</a>
                    <a href="#faq" className="nav-link" onClick={closeMenu}>FAQ</a>
                </nav>

                <div className="header-actions">
                    <a
                        href="https://wa.me/6281252225088"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm"
                    >
                        Kontak
                    </a>

                    <button
                        className={`hamburger ${isMenuOpen ? 'hamburger-active' : ''}`}
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <span className="hamburger-line"></span>
                        <span className="hamburger-line"></span>
                        <span className="hamburger-line"></span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`mobile-overlay ${isMenuOpen ? 'mobile-overlay-active' : ''}`}
                onClick={closeMenu}
            />
        </header>
    )
}
