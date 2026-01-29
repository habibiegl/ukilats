import './styles/Footer.css'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="footer-container container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <div className="footer-brand-logo">
                            <span className="footer-logo">Ukilats</span>
                            <span className="footer-dot"></span>
                        </div>
                        <p className="footer-copyright">
                            © {currentYear} Ukilats AI. All rights reserved.
                        </p>
                    </div>
                    <nav className="footer-nav">
                        <a href="mailto:nagaberkarat@gmail.com" className="footer-link">Kontak</a>
                    </nav>
                </div>
                <div className="footer-love">
                    <span>Made with</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <span>by Ukilats Team</span>
                </div>
            </div>
        </footer>
    )
}
