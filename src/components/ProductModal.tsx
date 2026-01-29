import { useEffect } from 'react'
import { Product } from '../hooks/useProducts'
import './styles/ProductModal.css'

interface ProductModalProps {
    product: Product
    isOpen: boolean
    onClose: () => void
    onBuy: () => void
}

export default function ProductModal({ product, isOpen, onClose, onBuy }: ProductModalProps) {
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

                    {/* Packages */}
                    {product.packages && product.packages.length > 0 && (
                        <div className="modal-packages">
                            <h3 className="packages-title">Pilih Paket Hemat:</h3>
                            <div className="packages-list">
                                {product.packages.map((pkg, idx) => (
                                    <a
                                        key={idx}
                                        href={pkg.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`package-option ${pkg.isSpecial ? 'package-special' : ''}`}
                                    >
                                        <div className="package-radio">
                                            <div className="radio-circle"></div>
                                        </div>
                                        <span className="package-name">{pkg.name}</span>
                                        {pkg.isSpecial && <span className="package-tag">SPECIAL</span>}
                                        <span className="package-price">{pkg.price}</span>
                                    </a>
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
                            {product.price && (
                                <span className="price-current">Rp {product.price}</span>
                            )}
                        </div>
                        <button
                            onClick={() => { onClose(); onBuy(); }}
                            className="btn btn-primary btn-lg"
                        >
                            {product.ctaText} →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
