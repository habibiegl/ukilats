import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Product } from '../hooks/useProducts'
import ProductModal from './ProductModal'
import './styles/ProductCard.css'

interface ProductCardProps {
    product: Product
    index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    // Check if product has packages (subscription required)
    const hasPackages = product.packages && product.packages.length > 0;

    // Navigate to checkout with product info (for products without packages)
    const handleBuy = () => {
        const params = new URLSearchParams({
            id: product.id,
            title: encodeURIComponent(product.title),
            price: product.price || '0',
            download: encodeURIComponent(product.downloadLink),
            image: product.image ? encodeURIComponent(product.image) : ''
        });
        navigate(`/checkout?${params.toString()}`);
    };

    // Handle CTA click - open modal if has packages, else go to checkout
    const handleCtaClick = () => {
        if (hasPackages) {
            // Products with packages must select subscription first
            setIsModalOpen(true);
        } else {
            // Products without packages go directly to checkout
            handleBuy();
        }
    };

    return (
        <>
            <div className={`product-card card card-glow stagger-${(index % 6) + 1}`}>
                {/* Image with Badge */}
                <div className="product-card-visual">
                    {product.badge && (
                        <span className="product-badge badge-neon">{product.badge}</span>
                    )}
                    {product.image && (
                        <img
                            src={product.image}
                            alt={product.title}
                            className="product-image"
                            loading="lazy"
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                            }}
                        />
                    )}
                </div>

                {/* Simple Content */}
                <div className="product-card-content">
                    <h3 className="product-title">{product.title}</h3>
                    <p className="product-description">{product.description}</p>
                </div>

                {/* Footer with Price and Buttons */}
                <div className="product-card-footer">
                    {/* Price */}
                    <div className="product-price-row">
                        {product.originalPrice && (
                            <span className="product-original-price">Rp {product.originalPrice}</span>
                        )}
                        {product.price && (
                            <span className="product-price">Rp {product.price}</span>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="product-buttons">
                        <button
                            className="btn btn-secondary"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Detail
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleCtaClick}
                        >
                            {product.ctaText}
                        </button>
                    </div>
                </div>
            </div>

            {/* Detail Modal */}
            <ProductModal
                product={product}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onBuy={handleBuy}
            />
        </>
    )
}
