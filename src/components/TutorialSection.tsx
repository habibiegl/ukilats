import { useTutorials } from '../hooks/useTutorials'
import './styles/TutorialSection.css'

export default function TutorialSection() {
    const { tutorials, loading, error } = useTutorials();

    // Don't render if no tutorials
    if (!loading && tutorials.length === 0) {
        return null;
    }

    // Get the first tutorial (main feature)
    const mainTutorial = tutorials[0];

    return (
        <section className="tutorial-section">
            <div className="tutorial-container container">
                <div className="tutorial-header">
                    <h3 className="tutorial-label">Tutorial Terbaru</h3>
                    <p className="tutorial-description">
                        Tonton panduan lengkapnya langsung di sini.
                    </p>
                </div>

                {loading ? (
                    <div className="tutorial-loading">
                        <div className="loading-spinner"></div>
                        <p>Memuat tutorial...</p>
                    </div>
                ) : error ? (
                    <div className="tutorial-error">
                        <p>Gagal memuat tutorial. Coba refresh halaman.</p>
                    </div>
                ) : mainTutorial && (
                    <div className="tutorial-card card card-glow">
                        <div className="tutorial-video">
                            <a
                                href={mainTutorial.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="tutorial-video-link"
                            >
                                <div
                                    className="tutorial-video-placeholder"
                                    style={{
                                        backgroundImage: `url(${mainTutorial.thumbnail})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                >
                                    <div className="tutorial-play-btn">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                                            <polygon points="5 3 19 12 5 21 5 3" />
                                        </svg>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="tutorial-content">
                            <h4 className="tutorial-title">Tutorial YouTube Terbaru</h4>
                            <p className="tutorial-desc">
                                Klik untuk menonton tutorial lengkap di YouTube.
                                Temukan tips dan panduan untuk memaksimalkan produktivitas kamu!
                            </p>
                            <a
                                href={mainTutorial.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                </svg>
                                Buka di YouTube
                            </a>
                        </div>
                    </div>
                )}

                {/* Additional tutorials */}
                {tutorials.length > 1 && (
                    <div className="tutorial-grid">
                        {tutorials.slice(1).map((tutorial) => (
                            <a
                                key={tutorial.id}
                                href={tutorial.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="tutorial-mini-card card"
                            >
                                <div
                                    className="tutorial-mini-thumb"
                                    style={{
                                        backgroundImage: `url(${tutorial.thumbnail})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                >
                                    <div className="tutorial-mini-play">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <polygon points="5 3 19 12 5 21 5 3" />
                                        </svg>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
