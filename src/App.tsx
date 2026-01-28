import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import ProductsSection from './components/ProductsSection'
import FreebiesSection from './components/FreebiesSection'
import FAQSection from './components/FAQSection'
import TutorialSection from './components/TutorialSection'
import Footer from './components/Footer'

export default function App() {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <About />
                <ProductsSection />
                <FreebiesSection />
                <FAQSection />
                <TutorialSection />
            </main>
            <Footer />
        </>
    )
}
