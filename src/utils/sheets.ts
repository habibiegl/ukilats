// Google Sheets Integration Configuration
// Spreadsheet ID: 1RVviOYKu6M5tZcnf9a57nec5VRD4UDVbpIa5c0RH3kY

const SPREADSHEET_ID = '1RVviOYKu6M5tZcnf9a57nec5VRD4UDVbpIa5c0RH3kY';

// Sheet names
const SHEETS = {
    PRODUCTS: 'products',
    FEATURES: 'product_features',
    PACKAGES: 'product_packages',
    FREE_PRODUCTS: 'free_product',
    TUTORIALS: 'tutorial'
};

// Build CSV export URL for each sheet
function getSheetUrl(sheetName: string): string {
    return `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
}

// Convert Google Drive view link to direct image link
function convertDriveLink(url: string): string {
    if (!url) return '';

    // Pattern 1: https://drive.google.com/file/d/FILE_ID/view
    const viewMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (viewMatch) {
        return `https://drive.google.com/uc?export=view&id=${viewMatch[1]}`;
    }

    // Pattern 2: https://drive.google.com/open?id=FILE_ID
    const openMatch = url.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/);
    if (openMatch) {
        return `https://drive.google.com/uc?export=view&id=${openMatch[1]}`;
    }

    // Pattern 3: Already direct link or other URL
    return url;
}

// Parse CSV text to array of objects
function parseCSV(csv: string): Record<string, string>[] {
    const lines = csv.split('\n');
    if (lines.length < 2) return [];

    // Parse headers (remove quotes)
    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());

    const results: Record<string, string>[] = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Handle quoted values with commas inside
        const values: string[] = [];
        let current = '';
        let inQuotes = false;

        for (const char of line) {
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                values.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        values.push(current.trim());

        const row: Record<string, string> = {};
        headers.forEach((header, index) => {
            row[header] = values[index] || '';
        });
        results.push(row);
    }

    return results;
}

// Fetch data from a specific sheet
async function fetchSheet(sheetName: string): Promise<Record<string, string>[]> {
    try {
        const response = await fetch(getSheetUrl(sheetName));
        if (!response.ok) {
            throw new Error(`Failed to fetch ${sheetName}: ${response.status}`);
        }
        const csv = await response.text();
        return parseCSV(csv);
    } catch (error) {
        console.error(`Error fetching ${sheetName}:`, error);
        return [];
    }
}

// Types for our data
export interface SheetProduct {
    id: string;
    title: string;
    description: string;
    image_url: string;
    badge: string;
    price: string;
    original_price: string;
    cta_text: string;
    download_link: string;
    secondary_cta_text: string;
    secondary_cta_link: string;
    is_active: string;
}

export interface SheetFeature {
    product_id: string;
    feature: string;
    order: string;
}

export interface SheetPackage {
    product_id: string;
    name: string;
    price: string;
    link: string;
    is_special: string;
    order: string;
}

// Fetch all products data
export async function fetchProducts(): Promise<SheetProduct[]> {
    const data = await fetchSheet(SHEETS.PRODUCTS);
    return data.filter(row => row.is_active?.toUpperCase() === 'TRUE') as unknown as SheetProduct[];
}

// Fetch all features
export async function fetchFeatures(): Promise<SheetFeature[]> {
    return await fetchSheet(SHEETS.FEATURES) as unknown as SheetFeature[];
}

// Fetch all packages
export async function fetchPackages(): Promise<SheetPackage[]> {
    return await fetchSheet(SHEETS.PACKAGES) as unknown as SheetPackage[];
}

// Combined fetch - get products with their features and packages
export async function fetchAllProductData() {
    const [products, features, packages] = await Promise.all([
        fetchProducts(),
        fetchFeatures(),
        fetchPackages()
    ]);

    // Map features and packages to each product
    return products.map(product => ({
        ...product,
        image_url: convertDriveLink(product.image_url),
        features: features
            .filter(f => f.product_id === product.id)
            .sort((a, b) => parseInt(a.order || '0') - parseInt(b.order || '0'))
            .map(f => f.feature),
        packages: packages
            .filter(p => p.product_id === product.id)
            .sort((a, b) => parseInt(a.order || '0') - parseInt(b.order || '0'))
            .map(p => ({
                name: p.name,
                price: p.price,
                link: p.link,
                isSpecial: p.is_special?.toUpperCase() === 'TRUE'
            }))
    }))
}

// Free product type (for freebies section)
export interface SheetFreeProduct {
    title: string;
    cta_link: string;
}

// Ensure URL has https:// prefix
function ensureHttps(url: string): string {
    if (!url) return '#';
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    return `https://${url}`;
}

// Fetch free products
export async function fetchFreeProducts(): Promise<SheetFreeProduct[]> {
    const data = await fetchSheet(SHEETS.FREE_PRODUCTS);
    return data.map(row => ({
        title: row.tittle || row.title || '',
        cta_link: ensureHttps(row.cta_link)
    })).filter(p => p.title);
}

// Tutorial type
export interface SheetTutorial {
    url: string;
}

// Extract YouTube video ID from URL
function extractYouTubeId(url: string): string | null {
    if (!url) return null;
    // Pattern: youtube.com/watch?v=ID or youtu.be/ID
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/
    ];
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return null;
}

// Fetch tutorials
export async function fetchTutorials(): Promise<{ url: string; videoId: string | null }[]> {
    const data = await fetchSheet(SHEETS.TUTORIALS);
    return data
        .map(row => ({
            url: row.url || '',
            videoId: extractYouTubeId(row.url || '')
        }))
        .filter(t => t.url && t.videoId);
}

export { SPREADSHEET_ID, SHEETS };
