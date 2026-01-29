import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './styles/CheckoutPage.css';

// Midtrans Client Key
const MIDTRANS_CLIENT_KEY = 'Mid-client-XdW-Na_j9aeEHnxZ';

interface ProductInfo {
    id: string;
    title: string;
    price: string;
    downloadLink: string;
    image?: string;
}

declare global {
    interface Window {
        snap: {
            pay: (token: string, options: {
                onSuccess: (result: unknown) => void;
                onPending: (result: unknown) => void;
                onError: (result: unknown) => void;
                onClose: () => void;
            }) => void;
        };
    }
}

export default function CheckoutPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState<ProductInfo | null>(null);
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Load Midtrans Snap script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://app.midtrans.com/snap/snap.js';
        script.setAttribute('data-client-key', MIDTRANS_CLIENT_KEY);
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // Parse product info from URL params
    useEffect(() => {
        const productId = searchParams.get('id');
        const productTitle = searchParams.get('title');
        const productPrice = searchParams.get('price');
        const downloadLink = searchParams.get('download');
        const productImage = searchParams.get('image');

        if (productId && productTitle && productPrice && downloadLink) {
            setProduct({
                id: productId,
                title: decodeURIComponent(productTitle),
                price: productPrice,
                downloadLink: decodeURIComponent(downloadLink),
                image: productImage ? decodeURIComponent(productImage) : undefined
            });
        }
    }, [searchParams]);

    // Format price to number
    const getPriceNumber = (priceStr: string): number => {
        return parseInt(priceStr.replace(/\D/g, '')) || 0;
    };

    // Generate unique order ID
    const generateOrderId = (): string => {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        return `UKI-${timestamp}-${random}`;
    };

    // Handle payment
    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!product) return;

        setIsLoading(true);
        setError(null);

        try {
            const orderId = generateOrderId();
            const grossAmount = getPriceNumber(product.price);

            // Call our API to create transaction
            const response = await fetch('/api/create-transaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    orderId,
                    grossAmount,
                    productName: product.title,
                    customerName,
                    customerEmail,
                    customerPhone
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Gagal membuat transaksi');
            }

            // Open Midtrans Snap popup
            window.snap.pay(data.token, {
                onSuccess: () => {
                    // Redirect to success page with download link
                    navigate(`/success?order=${orderId}&download=${encodeURIComponent(product.downloadLink)}&product=${encodeURIComponent(product.title)}`);
                },
                onPending: () => {
                    navigate(`/pending?order=${orderId}`);
                },
                onError: () => {
                    setError('Pembayaran gagal. Silakan coba lagi.');
                    setIsLoading(false);
                },
                onClose: () => {
                    setIsLoading(false);
                }
            });

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
            setIsLoading(false);
        }
    };

    if (!product) {
        return (
            <div className="checkout-page">
                <div className="checkout-container container">
                    <div className="checkout-error">
                        <h2>Produk tidak ditemukan</h2>
                        <p>Silakan kembali ke halaman produk</p>
                        <button onClick={() => navigate('/')} className="btn btn-primary">
                            Kembali ke Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <div className="checkout-container container">
                <div className="checkout-header">
                    <button onClick={() => navigate('/')} className="checkout-back">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Kembali
                    </button>
                    <h1 className="checkout-title">Checkout</h1>
                </div>

                <div className="checkout-content">
                    {/* Product Summary */}
                    <div className="checkout-product card">
                        <h3>Ringkasan Pesanan</h3>
                        <div className="checkout-product-info">
                            {product.image && (
                                <img src={product.image} alt={product.title} className="checkout-product-image" />
                            )}
                            <div className="checkout-product-details">
                                <h4>{product.title}</h4>
                                <p className="checkout-product-price">Rp {product.price}</p>
                            </div>
                        </div>
                    </div>

                    {/* Customer Form */}
                    <form onSubmit={handlePayment} className="checkout-form card">
                        <h3>Data Pembeli</h3>

                        <div className="form-group">
                            <label htmlFor="name">Nama Lengkap</label>
                            <input
                                type="text"
                                id="name"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                placeholder="Masukkan nama lengkap"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Nomor WhatsApp</label>
                            <input
                                type="tel"
                                id="phone"
                                value={customerPhone}
                                onChange={(e) => setCustomerPhone(e.target.value)}
                                placeholder="Contoh: 081234567890"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={customerEmail}
                                onChange={(e) => setCustomerEmail(e.target.value)}
                                placeholder="email@contoh.com"
                                required
                            />
                        </div>

                        {error && (
                            <div className="checkout-error-message">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary btn-lg checkout-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Memproses...' : `Bayar Rp ${product.price}`}
                        </button>

                        <p className="checkout-secure">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            Pembayaran aman dengan Midtrans
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
