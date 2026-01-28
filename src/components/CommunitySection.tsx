import './styles/CommunitySection.css'

export default function CommunitySection() {
    return (
        <section id="community" className="community-section">
            <div className="community-container container">
                <div className="community-grid">
                    <div className="community-card card card-glow">
                        <div className="community-icon">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                <path d="M6 12v5c3 3 9 3 12 0v-5" />
                            </svg>
                        </div>
                        <h3 className="community-title">Belajar Bikin Landing Page FREE Pakai AI</h3>
                        <p className="community-description">
                            Ikuti kelas gratis dan belajar membuat landing page profesional menggunakan AI.
                        </p>
                        <a
                            href="https://chat.whatsapp.com/FnpoHeN4VIBDgfCjbleQv0?mode=hqrt2"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-lg"
                        >
                            Join Class Now!
                        </a>
                    </div>

                    <div className="community-card card card-glow">
                        <div className="community-icon">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                        <h3 className="community-title">Ukilats AI Community</h3>
                        <p className="community-description">
                            Gabung komunitas interaktif untuk belajar, sharing, dan networking seputar Artificial Intelligence.
                        </p>
                        <a
                            href="https://chat.whatsapp.com/LvL7v8jQ0K43hZcr7gZVN6?mode=hqrt2"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-lg"
                        >
                            Join Community
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
