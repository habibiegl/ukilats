import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './styles/DownloadPage.css';

// Apps Script URL - should be set after deployment
const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL || '';

interface TokenValidationResult {
    valid: boolean;
    download_link?: string;
    error?: string;
    expired?: boolean;
}

export default function DownloadPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [status, setStatus] = useState<'loading' | 'valid' | 'invalid' | 'expired' | 'error'>('loading');
    const [downloadLink, setDownloadLink] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [countdown, setCountdown] = useState<number>(5);

    const token = searchParams.get('token');

    useEffect(() => {
        if (!token) {
            setStatus('invalid');
            setErrorMessage('Token tidak ditemukan dalam URL');
            return;
        }

        validateToken(token);
    }, [token]);

    // Auto redirect countdown when valid
    useEffect(() => {
        if (status === 'valid' && countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (status === 'valid' && countdown === 0 && downloadLink) {
            window.location.href = downloadLink;
        }
    }, [status, countdown, downloadLink]);

    const validateToken = async (tokenValue: string) => {
        try {
            // If Apps Script URL not configured, show error
            if (!APPS_SCRIPT_URL) {
                console.error('APPS_SCRIPT_URL not configured');
                setStatus('error');
                setErrorMessage('Sistem sedang dalam konfigurasi. Silakan hubungi admin.');
                return;
            }

            console.log('Validating token:', tokenValue);
            console.log('Apps Script URL:', APPS_SCRIPT_URL);

            // Use fetch with redirect follow for Apps Script
            const response = await fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                redirect: 'follow',
                headers: {
                    'Content-Type': 'text/plain'  // Use text/plain to avoid CORS preflight
                },
                body: JSON.stringify({
                    action: 'validate-token',
                    token: tokenValue
                })
            });

            console.log('Response status:', response.status);
            const responseText = await response.text();
            console.log('Response text:', responseText);

            let result: TokenValidationResult;
            try {
                result = JSON.parse(responseText);
            } catch (e) {
                console.error('Failed to parse response:', e);
                setStatus('error');
                setErrorMessage('Respons server tidak valid. Silakan coba lagi.');
                return;
            }

            console.log('Parsed result:', result);

            if (result.valid && result.download_link) {
                setStatus('valid');
                setDownloadLink(result.download_link);
            } else if (result.expired) {
                setStatus('expired');
                setErrorMessage(result.error || 'Token telah kadaluarsa');
            } else {
                setStatus('invalid');
                setErrorMessage(result.error || 'Token tidak valid');
            }
        } catch (error) {
            console.error('Token validation error:', error);
            setStatus('error');
            setErrorMessage('Gagal memvalidasi token. Silakan coba lagi.');
        }
    };

    const handleManualDownload = () => {
        if (downloadLink) {
            window.location.href = downloadLink;
        }
    };

    return (
        <div className="download-page">
            <div className="download-container">
                {status === 'loading' && (
                    <div className="download-card">
                        <div className="download-icon loading">
                            <div className="spinner"></div>
                        </div>
                        <h1>Memvalidasi Token...</h1>
                        <p>Mohon tunggu sebentar</p>
                    </div>
                )}

                {status === 'valid' && (
                    <div className="download-card success">
                        <div className="download-icon success">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        </div>
                        <h1>Token Valid!</h1>
                        <p>Download akan dimulai dalam <strong>{countdown}</strong> detik...</p>
                        <button onClick={handleManualDownload} className="btn btn-primary btn-lg">
                            Download Sekarang
                        </button>
                    </div>
                )}

                {status === 'expired' && (
                    <div className="download-card expired">
                        <div className="download-icon expired">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                        </div>
                        <h1>Token Kadaluarsa</h1>
                        <p>{errorMessage}</p>
                        <p className="subtitle">Link download hanya valid selama 24 jam setelah pembelian.</p>
                        <a
                            href="https://t.me/ukilats"
                            className="btn btn-primary btn-lg"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            💬 Hubungi Admin
                        </a>
                    </div>
                )}

                {status === 'invalid' && (
                    <div className="download-card invalid">
                        <div className="download-icon invalid">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="15" y1="9" x2="9" y2="15" />
                                <line x1="9" y1="9" x2="15" y2="15" />
                            </svg>
                        </div>
                        <h1>Token Tidak Valid</h1>
                        <p>{errorMessage}</p>
                        <div className="download-actions">
                            <button onClick={() => navigate('/')} className="btn btn-secondary">
                                Kembali ke Home
                            </button>
                            <a
                                href="https://t.me/ukilats"
                                className="btn btn-primary"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                💬 Hubungi Admin
                            </a>
                        </div>
                    </div>
                )}

                {status === 'error' && (
                    <div className="download-card error">
                        <div className="download-icon error">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                        </div>
                        <h1>Terjadi Kesalahan</h1>
                        <p>{errorMessage}</p>
                        <div className="download-actions">
                            <button onClick={() => validateToken(token || '')} className="btn btn-secondary">
                                Coba Lagi
                            </button>
                            <a
                                href="https://t.me/ukilats"
                                className="btn btn-primary"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                💬 Hubungi Admin
                            </a>
                        </div>
                    </div>
                )}

                <div className="download-footer">
                    <a href="/" className="back-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Kembali ke Ukilats
                    </a>
                </div>
            </div>
        </div>
    );
}
