import { useState } from 'react'
import { Product } from '../hooks/useProducts'
import ProductModal from './ProductModal'
import './styles/ProductCard.css'

interface ProductCardProps {
    product: Product
    index?: number
}

// Generate WhatsApp message URL with product name and price
function generateWhatsAppLink(baseLink: string, productTitle: string, price?: string): string {
    const phoneMatch = baseLink.match(/wa\.me\/(\d+)/);
    if (phoneMatch) {
        const phone = phoneMatch[1];
        const priceText = price ? ` (Rp ${price})` : '';
        const message = encodeURIComponent(`Halo, saya tertarik dengan produk "${productTitle}"${priceText}. Bisa info lebih lanjut?`);
        return `https://wa.me/${phone}?text=${message}`;
    }
    return baseLink;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const whatsAppLink = generateWhatsAppLink(product.ctaLink, product.title, product.price);

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
                        <a
                            href={whatsAppLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                        >
                            {product.ctaText}
                        </a>
                    </div>
                </div>
            </div>

            {/* Detail Modal */}
            <ProductModal
                product={product}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                whatsAppLink={whatsAppLink}
            />
        </>
    )
}
