import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import './styles/DownloadFallback.css';

export default function DownloadFallback() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    useEffect(() => {
        // Log for debugging
        console.log('Download fallback page loaded, token:', token);
    }, [token]);

    return (
        <div className="download-fallback">
            <div className="fallback-container">
                <div className="icon">⚠️</div>
                <h1>Link Download Berubah</h1>
                <p>
                    Sistem download kami telah diperbarui. Link lama tidak dapat digunakan lagi.
                </p>
                <p className="subtitle">
                    Silakan hubungi admin untuk mendapatkan link download baru.
                </p>

                <div className="actions">
                    <a
                        href="https://t.me/ukilats"
                        className="btn btn-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        💬 Hubungi Admin via Telegram
                    </a>
                    <button onClick={() => navigate('/')} className="btn btn-secondary">
                        Kembali ke Home
                    </button>
                </div>
            </div>
        </div>
    );
}
