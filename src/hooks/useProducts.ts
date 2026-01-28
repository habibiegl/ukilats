import { useState, useEffect } from 'react';
import { fetchAllProductData, type SheetProduct } from '../utils/sheets';

export interface Product {
    id: string;
    title: string;
    description: string;
    image?: string;
    badge?: string;
    price?: string;
    originalPrice?: string;
    ctaText: string;
    ctaLink: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
    features?: string[];
    packages?: {
        name: string;
        price: string;
        link: string;
        isSpecial?: boolean;
    }[];
}

// Ensure URL has https:// prefix
function ensureHttps(url: string): string {
    if (!url) return '#';
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    // Add https:// for URLs like wa.me/...
    return `https://${url}`;
}

// Transform sheet data to Product format
function transformProduct(sheetProduct: SheetProduct & { features: string[]; packages: { name: string; price: string; link: string; isSpecial: boolean }[] }): Product {
    return {
        id: sheetProduct.id,
        title: sheetProduct.title,
        description: sheetProduct.description,
        image: sheetProduct.image_url || undefined,
        badge: sheetProduct.badge || undefined,
        price: sheetProduct.price || undefined,
        originalPrice: sheetProduct.original_price || undefined,
        ctaText: sheetProduct.cta_text || 'Beli',
        ctaLink: ensureHttps(sheetProduct.cta_link),
        secondaryCtaText: sheetProduct.secondary_cta_text || undefined,
        secondaryCtaLink: sheetProduct.secondary_cta_link ? ensureHttps(sheetProduct.secondary_cta_link) : undefined,
        features: sheetProduct.features.length > 0 ? sheetProduct.features : undefined,
        packages: sheetProduct.packages.length > 0 ? sheetProduct.packages.map(p => ({
            ...p,
            link: ensureHttps(p.link)
        })) : undefined
    };
}

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadProducts() {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchAllProductData();
                const transformedProducts = data.map(transformProduct);
                setProducts(transformedProducts);
            } catch (err) {
                console.error('Failed to load products:', err);
                setError('Gagal memuat produk. Silakan refresh halaman.');
            } finally {
                setLoading(false);
            }
        }

        loadProducts();
    }, []);

    return { products, loading, error };
}
