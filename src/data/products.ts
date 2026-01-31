export interface Product {
    id: string;
    title: string;
    description: string;
    price?: string;
    originalPrice?: string;
    discount?: string;
    badge?: string;
    image?: string;
    ctaText: string;
    ctaLink: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
    features?: string[];
    packages?: {
        name: string;
        price: string;
        link: string;
        features?: string[];
        isSpecial?: boolean;
    }[];
}

export const products: Product[] = [
    {
        id: 'gemini-pro',
        title: 'Gemini AI PRO 1 Tahun',
        description: 'Penyimpanan 2TB, akses Gemini 2.5 Pro & Veo 3.1, dan integrasi Google Workspace. Akun Resmi & Garansi.',
        badge: 'BEST SELLER',
        ctaText: 'Beli',
        ctaLink: 'https://api.whatsapp.com/send?phone=6285701176337&text=Halo%20Admin%20Ukilats%2C%20saya%20mau%20pesan%20Gemini%20AI%20PRO%201%20Tahun.',
        features: [
            '2 TB Penyimpanan (Foto, Drive, Gmail)',
            'Akses Gemini 2.5 Pro & Veo 3.1',
            '1.000 Poin AI Bulanan',
            'Integrasi Gmail, Dokumen, Video'
        ],
        packages: [
            { name: '1 Email + Free Email', price: 'Rp 150rb', link: 'https://api.whatsapp.com/send?phone=6285701176337&text=Halo%20Ukilats,%20saya%20mau%20beli%20Gemini%20AI%20PRO%20(Paket%20Khusus%20-%201%20Email%20%2B%20Free%20Email)%20seharga%20Rp150.000', isSpecial: true },
            { name: 'Paket Basic (1 Email)', price: 'Rp 150rb', link: 'https://api.whatsapp.com/send?phone=6285701176337&text=Halo%20Ukilats,%20saya%20mau%20beli%20Gemini%20AI%20PRO%20(Paket%20Basic%20-%201%20Email)%20seharga%20Rp150.000' },
            { name: 'Paket Business (2 Email)', price: 'Rp 250rb', link: 'https://api.whatsapp.com/send?phone=6285701176337&text=Halo%20Ukilats,%20saya%20mau%20beli%20Gemini%20AI%20PRO%20(Paket%20Business%20-%202%20Email)%20seharga%20Rp250.000' },
            { name: 'Paket Corporate (3 Email)', price: 'Rp 450rb', link: 'https://api.whatsapp.com/send?phone=6285701176337&text=Halo%20Ukilats,%20saya%20mau%20beli%20Gemini%20AI%20PRO%20(Paket%20Corporate%20-%203%20Email)%20seharga%20Rp450.000' }
        ]
    },
    {
        id: 'landing-page',
        title: 'Jasa Landing Page PRODIG',
        description: 'Ubah pengunjung menjadi pembeli dengan desain landing page konversi tinggi. Desain premium & copywriting yang menjual.',
        badge: 'POPULAR',
        ctaText: 'Konsultasi',
        ctaLink: 'https://t.me/ukilats',
        features: [
            'Desain Premium & Eksklusif',
            'Copywriting Hypnotic Selling',
            'Loading Cepat & SEO Friendly',
            'Mobile Responsive (HP & Tablet)'
        ],
        packages: [
            { name: 'Paket Basic', price: 'Rp 100rb', link: 'https://t.me/ukilats', features: ['1 Template Premium', '5 Katalog Produk', '3x Revisi Minor'] },
            { name: 'Paket Business', price: 'Rp 250rb', link: 'https://t.me/ukilats', features: ['1 Template Premium', '10 Katalog Produk', '3x Revisi Minor'] },
            { name: 'Paket Corporate', price: 'Rp 450rb', link: 'https://t.me/ukilats', features: ['1 Template Premium', '20 Katalog Produk', '3x Revisi Minor'] }
        ]
    },
    {
        id: 'lp-ai',
        title: 'Bikin LP Pakai FULL AI',
        description: 'Tanpa coding. Buat landing page profesional for LYNK ID dalam hitungan menit menggunakan AI.',
        ctaText: 'Akses',
        ctaLink: 'https://lynk.id/ukilats/n98747830n8q',
        features: [
            'Template siap pakai',
            'Panduan step-by-step',
            'Hasil profesional',
            'Tanpa coding'
        ]
    },
    {
        id: 'gemini-ultra',
        title: 'Gemini AI Ultra',
        description: 'Bikin video AI sampai muntah! Credit 45000 untuk kebutuhan generasi video dan gambar AI tanpa batas.',
        badge: 'NEW',
        ctaText: 'Pesan',
        ctaLink: 'https://api.whatsapp.com/send?phone=6285701176337&text=Hallo%20kaka%2C%20saya%20mau%20tanya%20gemini%20ultra%20dengan%20credit%2045000'
    },
    {
        id: 'prompt-generator',
        title: 'Generator Prompt Sat Set!',
        description: 'Buat prompt visual lengkap, sinematik, dan terstruktur dengan 12 elemen detail. Hasil maksimal!',
        ctaText: 'Beli Tool',
        ctaLink: 'http://lynk.id/ukilats/ex3ejegv0n3m',
        features: [
            '12 Elemen Detail',
            'Prompt Sinematik',
            'Visual Lengkap',
            'Hasil Terstruktur'
        ]
    },
    {
        id: 'prompt-frame',
        title: 'Belajar Prompt FRAME',
        description: 'Strategi jitu menyusun prompt presisi agar AI mengerti konteks Anda. Framework yang terbukti efektif.',
        ctaText: 'Download',
        ctaLink: 'http://lynk.id/ukilats/772w2mln1zwx/checkout'
    },
    {
        id: 'prompt-thumbnail',
        title: 'PROMPT Youtube Thumbnails',
        description: 'Bikin design thumbnail cuman klik klik doang. Hasil profesional dalam hitungan menit!',
        ctaText: 'Beli Prompt',
        ctaLink: 'https://ukilats.netlify.app/'
    },
    {
        id: 'chatgpt-go',
        title: 'Chat GPT Plus GO 1 Tahun',
        description: 'Jasa setting Chat GPT GO Tahun dengan harga lebih murah. Akses premium dengan biaya terjangkau.',
        ctaText: 'Beli',
        ctaLink: 'https://api.whatsapp.com/send?phone=6285701176337&text=Saya%20mau%20Chat%20GPT%20GO%201%20Tahun%2C%20apa%20saja%20ketentuannya%20%3F'
    },
    {
        id: 'lynk-makeover',
        title: 'Sulap Lynk.id "Burik" Jadi Web Profesional!',
        description: 'Tinggalkan tampilan amatir yang bikin ragu. Ubah Lynk.id kamu jadi landing page elegan yang membangun kepercayaan.',
        badge: 'EXCLUSIVE',
        ctaText: 'Detail',
        ctaLink: 'https://lynkit.netlify.app/',
        secondaryCtaText: 'Beli',
        secondaryCtaLink: 'https://lynk.id/ukilats/q059890l6lqv/checkout'
    }
];
