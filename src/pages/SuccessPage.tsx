import { useSearchParams, useNavigate } from 'react-router-dom';
import './styles/SuccessPage.css';

export default function SuccessPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const orderId = searchParams.get('order') || '';
    const downloadLink = searchParams.get('download') || '';
    const productName = searchParams.get('product') || 'Produk Digital';

    return (
        <div className="success-page">
            <div className="success-container container">
                <div className="success-card card">
                    <div className="success-icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                    </div>

                    <h1 className="success-title">Pembayaran Berhasil!</h1>
                    <p className="success-message">
                        Terima kasih telah membeli <strong>{decodeURIComponent(productName)}</strong>
                    </p>

                    {orderId && (
                        <p className="success-order">
                            Order ID: <code>{orderId}</code>
                        </p>
                    )}

                    <div className="success-download">
                        <h3>Download Produk</h3>
                        <p>Klik tombol di bawah untuk mengunduh produk Anda:</p>
                        <a
                            href={decodeURIComponent(downloadLink)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-lg"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Download Sekarang
                        </a>
                    </div>

                    <div className="success-info">
                        <p>
                            📧 Link download juga dikirim ke email Anda<br />
                            💬 Butuh bantuan? Hubungi kami via WhatsApp
                        </p>
                    </div>

                    <button onClick={() => navigate('/')} className="success-home-btn">
                        Kembali ke Beranda
                    </button>
                </div>
            </div>
        </div>
    );
}
