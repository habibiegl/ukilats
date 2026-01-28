import { useFreeProducts } from '../hooks/useFreeProducts'
import './styles/FreebiesSection.css'

export default function FreebiesSection() {
    const { freeProducts, loading, error } = useFreeProducts();

    // Don't render section if no products and not loading
    if (!loading && freeProducts.length === 0) {
        return null;
    }

    return (
        <section id="freebies" className="freebies-section">
            <div className="freebies-container container">
                <div className="freebies-header">
                    <h2 className="freebies-title">Gratis Untuk Kamu!</h2>
                    <p className="freebies-subtitle">
                        Download resource gratis berkualitas tinggi.
                    </p>
                </div>

                {loading ? (
                    <div className="freebies-loading">
                        <div className="loading-spinner"></div>
                        <p>Memuat produk gratis...</p>
                    </div>
                ) : error ? (
                    <div className="freebies-error">
                        <p>Gagal memuat produk. Coba refresh halaman.</p>
                    </div>
                ) : (
                    <div className="freebies-grid">
                        {freeProducts.map((freebie) => (
                            <a
                                key={freebie.id}
                                href={freebie.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="freebie-card card"
                            >
                                <div className="freebie-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="7 10 12 15 17 10" />
                                        <line x1="12" x2="12" y1="15" y2="3" />
                                    </svg>
                                </div>
                                <div className="freebie-content">
                                    <h4 className="freebie-title">{freebie.title}</h4>
                                </div>
                                <div className="freebie-arrow">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14" />
                                        <path d="m12 5 7 7-7 7" />
                                    </svg>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
