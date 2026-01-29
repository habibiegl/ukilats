export interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

export const faqData: FAQItem[] = [
    {
        id: 'faq-1',
        question: 'Produk apa saja yang dijual di Ukilats?',
        answer: 'Ukilats menyediakan berbagai produk digital untuk kreator konten, seperti: UkiVeo (AI Video Generator untuk Gemini Business), UkiFlow (AI Video & Gambar Generator untuk Google Flow), serta template prompt, asset PNG, dan resource gratis lainnya untuk mempercepat workflow kamu.'
    },
    {
        id: 'faq-2',
        question: 'Bagaimana cara membeli produk di Ukilats?',
        answer: 'Cukup klik tombol "Beli" pada produk yang kamu inginkan, kamu akan langsung diarahkan ke WhatsApp untuk berkomunikasi dengan admin. Pembayaran bisa dilakukan via transfer bank atau e-wallet.'
    },
    {
        id: 'faq-3',
        question: 'Apa itu UkiVeo dan UkiFlow?',
        answer: 'UkiVeo adalah ekstensi Chrome untuk otomatisasi pembuatan video di Gemini Business. UkiFlow adalah ekstensi serupa untuk platform Google Flow. Keduanya membantu kamu membuat konten video dan gambar lebih cepat dengan bantuan AI.'
    },
    {
        id: 'faq-4',
        question: 'Apakah ada garansi untuk produk digital?',
        answer: 'Ya! Semua produk digital mendapat support penuh. Jika ada kendala atau pertanyaan seputar cara penggunaan, kamu bisa langsung hubungi admin via WhatsApp untuk bantuan.'
    },
    {
        id: 'faq-5',
        question: 'Apakah produk gratis benar-benar gratis?',
        answer: 'Benar! Produk di section "Gratis Untuk Kamu" bisa langsung kamu download tanpa biaya apapun. Kami menyediakan resource gratis seperti template prompt, asset, dan data riset untuk membantu workflow kreator.'
    },
    {
        id: 'faq-6',
        question: 'Bagaimana cara menghubungi Ukilats?',
        answer: 'Kamu bisa menghubungi kami via WhatsApp dengan klik tombol Beli atau contact link di sosial media. Follow Instagram dan TikTok kami untuk update produk terbaru dan tips seputar AI untuk kreator.'
    }
];
