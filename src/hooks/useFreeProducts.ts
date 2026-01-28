import { useState, useEffect } from 'react';
import { fetchFreeProducts, SheetFreeProduct } from '../utils/sheets';

export interface FreeProduct {
    id: string;
    title: string;
    link: string;
}

export function useFreeProducts() {
    const [freeProducts, setFreeProducts] = useState<FreeProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadFreeProducts() {
            try {
                setLoading(true);
                const data = await fetchFreeProducts();

                const transformed: FreeProduct[] = data.map((item: SheetFreeProduct, index: number) => ({
                    id: `free-${index + 1}`,
                    title: item.title,
                    link: item.cta_link
                }));

                setFreeProducts(transformed);
                setError(null);
            } catch (err) {
                console.error('Error loading free products:', err);
                setError('Failed to load free products');
            } finally {
                setLoading(false);
            }
        }

        loadFreeProducts();
    }, []);

    return { freeProducts, loading, error };
}
