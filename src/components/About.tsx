import './styles/About.css'

export default function About() {
    return (
        <section className="about">
            <div className="about-container container">
                <div className="about-card card">
                    <div className="about-image">
                        <img
                            src="https://i.imgur.com/rggkBYY.png"
                            alt="Ukilats"
                            className="about-avatar"
                        />
                    </div>
                    <div className="about-content">
                        <h3 className="about-title">Tentang Kreator</h3>
                        <p className="about-text">
                            Halo, aku <strong>Ukilats</strong>. Aku udah ngedesain sejak 2016, dan sekarang lagi fokus ngulik AI buat nyari cara kerja yang lebih efisien. Di website ini aku rilis produk digital untuk microstocker, youtuber, dan konten sosmed—biar kamu bisa bikin karya lebih cepat, tetap rapi, dan kelihatan profesional.
                        </p>
                        <div className="about-social">
                            <a href="https://instagram.com/habibiegl" target="_blank" rel="noopener noreferrer" className="about-social-btn">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                                </svg>
                                Instagram
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
