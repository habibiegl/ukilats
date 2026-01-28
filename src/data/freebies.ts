export interface Freebie {
    id: string;
    title: string;
    description?: string;
    link: string;
    isPaid?: boolean;
}

export const freebies: Freebie[] = [
    {
        id: 'web-ai-100',
        title: '100 WEB AI BERMANFAAT! FREE Download',
        description: 'Kumpulan 100 website AI terbaik untuk produktivitas',
        link: 'https://docs.google.com/spreadsheets/d/1sj08z_IgCFGIurP_a6P4vYK-ze3bvs4p/edit?usp=drive_link&ouid=115002813135036461287&rtpof=true&sd=true'
    },
    {
        id: 'template-analisis',
        title: 'Template Prompt Analisis Peluang Usaha Digital',
        description: 'Template siap pakai untuk analisis bisnis',
        link: 'http://lynk.id/ukilats/0oz000ynevwe/checkout'
    },
    {
        id: 'image-ai-100',
        title: '100 Image AI untuk Iklan',
        description: 'Koleksi gambar AI berkualitas tinggi untuk iklan',
        link: 'https://drive.google.com/drive/folders/1qBRKaJyPFlYmdx8bUHfMGhNTc6wV58tF?usp=drive_link'
    },
    {
        id: 'prompt-muka',
        title: 'Prompt Ganti Muka & Baju di Nano Banana',
        description: 'Promo Berbayar Terbatas',
        link: 'http://lynk.id/ukilats/2v4wjxxjp55p/checkout',
        isPaid: true
    },
    {
        id: 'writing-style',
        title: 'Writing Style Guide PERSONALISASI CHAT GPT',
        description: 'Promo Berbayar Terbatas',
        link: 'http://lynk.id/ukilats/g6j0eq55l7kz/checkout',
        isPaid: true
    }
];
