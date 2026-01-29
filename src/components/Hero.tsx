import './styles/Hero.css'

const socialLinks = [
    { name: 'Instagram', href: 'https://www.instagram.com/ukilats/', icon: 'instagram' },
    { name: 'Threads', href: 'https://www.threads.com/@habibiegl', icon: 'threads' },
    { name: 'TikTok', href: 'https://www.tiktok.com/@asolaja_13', icon: 'tiktok' },
    { name: 'Email', href: 'mailto:nagaberkarat@gmail.com', icon: 'email' }
]

export default function Hero() {
    return (
        <section className="hero">
            {/* Floating Particles */}
            <div className="hero-particles">
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
            </div>

            <div className="hero-container container">
                <div className="hero-badge badge">
                    <span className="hero-badge-dot"></span>
                    <span>Ukilats • Creator Produk AI</span>
                </div>

                <h1 className="hero-title">
                    Lebih Cepat. Lebih Pro.<br />
                    bersama <span className="text-gradient text-scratch">Ukilats</span>.
                </h1>

                <p className="hero-subtitle">
                    Solusi praktis untuk kreator yang butuh workflow cepat dan tampilan yang selalu konsisten.
                </p>

                <div className="hero-social">
                    {socialLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hero-social-link"
                            title={link.name}
                        >
                            <SocialIcon name={link.icon} />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}

function SocialIcon({ name }: { name: string }) {
    switch (name) {
        case 'instagram':
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
            )
        case 'threads':
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.067 0C5.813 0 1.75 4.066 1.75 10.318v3.364C1.75 19.934 5.813 24 12.067 24c6.253 0 10.183-4.066 10.183-10.318v-3.364C22.25 4.066 18.32 0 12.067 0zm5.456 14.073c-.235 2.587-1.909 4.405-4.847 4.788-.422.055-.85.082-1.282.082-1.825 0-3.418-.512-4.609-1.482-1.37-1.115-2.064-2.74-2.064-4.83 0-2.187.69-3.896 2.054-5.084 1.33-1.158 3.144-1.745 5.393-1.745.25 0 .503.008.76.024 2.025.126 3.543.77 4.642 1.968.99 1.08 1.525 2.487 1.544 4.064l-2.427.003c-.02-1.108-.34-1.963-.95-2.535-.66-.62-1.64-.93-2.915-.93-1.38 0-2.434.36-3.132 1.068-.72.729-1.085 1.84-1.085 3.304 0 1.44.356 2.531 1.06 3.243.682.69 1.695 1.04 3.014 1.04 1.18 0 2.1-.28 2.733-.834.572-.5.915-1.187 1.054-2.105l-3.69-.002v-2.087h6.183v.013c.003.048.004.097.004.146 0 .623-.053 1.237-.156 1.835l.004.001z" />
                </svg>
            )
        case 'tiktok':
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
            )
        case 'email':
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
            )
        default:
            return null
    }
}
