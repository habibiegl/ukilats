import { useState, useEffect } from 'react';
import { fetchTutorials } from '../utils/sheets';

export interface Tutorial {
    id: string;
    url: string;
    videoId: string;
    thumbnail: string;
}

export function useTutorials() {
    const [tutorials, setTutorials] = useState<Tutorial[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadTutorials() {
            try {
                setLoading(true);
                const data = await fetchTutorials();

                const transformed: Tutorial[] = data.map((item, index) => ({
                    id: `tutorial-${index + 1}`,
                    url: item.url,
                    videoId: item.videoId || '',
                    thumbnail: `https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`
                }));

                setTutorials(transformed);
                setError(null);
            } catch (err) {
                console.error('Error loading tutorials:', err);
                setError('Failed to load tutorials');
            } finally {
                setLoading(false);
            }
        }

        loadTutorials();
    }, []);

    return { tutorials, loading, error };
}
