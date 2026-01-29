import { useState } from 'react'
import { faqData } from '../data/faq'
import './styles/FAQSection.css'

export default function FAQSection() {
    const [openId, setOpenId] = useState<string | null>(null)

    const toggleFAQ = (id: string) => {
        setOpenId(openId === id ? null : id)
    }

    return (
        <section id="faq" className="faq-section">
            <div className="faq-container container">
                <div className="faq-header">
                    <h2 className="faq-title">Pertanyaan Umum</h2>
                    <p className="faq-subtitle">
                        Temukan jawaban untuk pertanyaan yang sering diajukan.
                    </p>
                </div>

                <div className="faq-list">
                    {faqData.map((item) => (
                        <div
                            key={item.id}
                            className={`faq-item ${openId === item.id ? 'faq-item-open' : ''}`}
                        >
                            <button
                                className="faq-question"
                                onClick={() => toggleFAQ(item.id)}
                                aria-expanded={openId === item.id}
                            >
                                <span className="faq-question-text">{item.question}</span>
                                <span className="faq-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 5v14M5 12h14" />
                                    </svg>
                                </span>
                            </button>
                            <div className="faq-answer">
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
