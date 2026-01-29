import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Product } from '../hooks/useProducts'
import './styles/ProductModal.css'

interface ProductModalProps {
    product: Product
    isOpen: boolean
    onClose: () => void
    onBuy: () => void
}

// Parse price string to number
function parsePrice(priceStr: string): number {
    return parseInt(priceStr.replace(/\D/g, '')) || 0;
}

// Format number to price string
function formatPrice(num: number): string {
    return num.toLocaleString('id-ID');
}

export default function ProductModal({ product, isOpen, onClose, onBuy }: ProductModalProps) {
    const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
    const navigate = useNavigate();

    // Reset selection when modal opens
    useEffect(() => {
        if (isOpen) {
            setSelectedPackage(null);
        }
    }, [isOpen]);

    // Close on ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    // Calculate prices
    const basePrice = parsePrice(product.price || '0');
    const packagePrice = selectedPackage !== null && product.packages
        ? parsePrice(product.packages[selectedPackage].price)
        : 0;
    const totalPrice = basePrice + packagePrice;

    // Get package name for checkout
    const selectedPackageName = selectedPackage !== null && product.packages
        ? product.packages[selectedPackage].name
        : '';

    // Handle buy with package
    const handleBuyWithPackage = () => {
        onClose();

        // Build checkout URL with package info
        const params = new URLSearchParams({
            id: product.id,
            title: encodeURIComponent(product.title + (selectedPackageName ? ` + ${selectedPackageName}` : '')),
            price: formatPrice(totalPrice),
            download: encodeURIComponent(product.downloadLink),
            image: product.image ? encodeURIComponent(product.image) : ''
        });
        navigate(`/checkout?${params.toString()}`);
    };

    // Determine if this product has packages
    const hasPackages = product.packages && product.packages.length > 0;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button className="modal-close" onClick={onClose}>×</button>

                {/* Modal Header with Image */}
                <div className="modal-header">
                    {product.image && (
                        <img
                            src={product.image}
                            alt={product.title}
                            className="modal-image"
                        />
                    )}
                    <div className="modal-badges">
                        {product.badge && (
                            <span className="modal-badge">{product.badge}</span>
                        )}
                    </div>
                </div>

                {/* Modal Body */}
                <div className="modal-body">
                    <h2 className="modal-title">{product.title}</h2>

                    {/* Important Notice */}
                    <div className="modal-notice">
                        <div className="notice-icon">ℹ</div>
                        <div className="notice-content">
                            <strong>Deskripsi:</strong>
                            <p>{product.description}</p>
                        </div>
                    </div>

                    {/* Features */}
                    {product.features && product.features.length > 0 && (
                        <div className="modal-features">
                            <h3 className="features-title">⭐ Fitur Premium</h3>
                            <div className="features-box">
                                {product.features.map((feature, idx) => (
                                    <div key={idx} className="feature-item">
                                        <svg className="feature-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Packages - Radio Selection */}
                    {hasPackages && (
                        <div className="modal-packages">
                            <h3 className="packages-title">Pilih Paket Langganan:</h3>
                            <div className="packages-list">
                                {product.packages!.map((pkg, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        className={`package-option ${pkg.isSpecial ? 'package-special' : ''} ${selectedPackage === idx ? 'package-selected' : ''}`}
                                        onClick={() => setSelectedPackage(idx)}
                                    >
                                        <div className="package-radio">
                                            <div className={`radio-circle ${selectedPackage === idx ? 'radio-checked' : ''}`}></div>
                                        </div>
                                        <span className="package-name">{pkg.name}</span>
                                        {pkg.isSpecial && <span className="package-tag">SPECIAL</span>}
                                        <span className="package-price">{pkg.price}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Price & CTA */}
                    <div className="modal-footer">
                        <div className="modal-price">
                            {product.originalPrice && (
                                <span className="price-original">Rp {product.originalPrice}</span>
                            )}
                            {hasPackages && selectedPackage !== null ? (
                                <div className="price-breakdown">
                                    <span className="price-base">Aplikasi: Rp {product.price}</span>
                                    <span className="price-package">+ Langganan: Rp {formatPrice(packagePrice)}</span>
                                    <span className="price-total">Total: Rp {formatPrice(totalPrice)}</span>
                                </div>
                            ) : (
                                <span className="price-current">Rp {product.price}</span>
                            )}
                        </div>

                        {hasPackages ? (
                            <button
                                onClick={handleBuyWithPackage}
                                className="btn btn-primary btn-lg"
                                disabled={selectedPackage === null}
                            >
                                {selectedPackage === null ? 'Pilih Paket Dulu' : `Langganan - Rp ${formatPrice(totalPrice)}`} →
                            </button>
                        ) : (
                            <button
                                onClick={() => { onClose(); onBuy(); }}
                                className="btn btn-primary btn-lg"
                            >
                                {product.ctaText} →
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
