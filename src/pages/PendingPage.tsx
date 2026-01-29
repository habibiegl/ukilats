import { useNavigate } from 'react-router-dom';
import './styles/PendingPage.css';

export default function PendingPage() {
    const navigate = useNavigate();

    return (
        <div className="pending-page">
            <div className="pending-container container">
                <div className="pending-card card">
                    <div className="pending-icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                    </div>

                    <h1 className="pending-title">Menunggu Pembayaran</h1>
                    <p className="pending-message">
                        Silakan selesaikan pembayaran Anda. Setelah pembayaran dikonfirmasi,
                        link download akan otomatis tersedia.
                    </p>

                    <div className="pending-info">
                        <p>
                            📧 Konfirmasi akan dikirim ke email Anda<br />
                            💬 Butuh bantuan? Hubungi kami via WhatsApp
                        </p>
                    </div>

                    <a
                        href="https://wa.me/6281252225088"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                    >
                        Hubungi via WhatsApp
                    </a>

                    <button onClick={() => navigate('/')} className="pending-home-btn">
                        Kembali ke Beranda
                    </button>
                </div>
            </div>
        </div>
    );
}
