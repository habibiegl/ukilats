import { useProducts } from '../hooks/useProducts'
import ProductCard from './ProductCard'
import './styles/ProductsSection.css'

export default function ProductsSection() {
    const { products, loading, error } = useProducts();

    return (
        <section id="products" className="products-section">
            <div className="products-container container">
                <div className="products-header">
                    <h2 className="products-title">Produk Unggulan</h2>
                    <p className="products-subtitle">
                        Tools dan layanan untuk meningkatkan produktivitas Anda.
                    </p>
                </div>

                {loading && (
                    <div className="products-loading">
                        <div className="loading-spinner"></div>
                        <p>Memuat produk...</p>
                    </div>
                )}

                {error && (
                    <div className="products-error">
                        <p>{error}</p>
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={() => window.location.reload()}
                        >
                            Refresh
                        </button>
                    </div>
                )}

                {!loading && !error && products.length === 0 && (
                    <div className="products-empty">
                        <p>Belum ada produk tersedia.</p>
                    </div>
                )}

                {!loading && !error && products.length > 0 && (
                    <div className="products-grid">
                        {products.map((product, index) => (
                            <ProductCard key={product.id} product={product} index={index} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
