import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import ProductsSection from './components/ProductsSection'
import FreebiesSection from './components/FreebiesSection'
import FAQSection from './components/FAQSection'
import TutorialSection from './components/TutorialSection'
import Footer from './components/Footer'
import CheckoutPage from './pages/CheckoutPage'
import SuccessPage from './pages/SuccessPage'
import PendingPage from './pages/PendingPage'
import DownloadPage from './pages/DownloadPage'

// Home page component
function HomePage() {
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

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/pending" element={<PendingPage />} />
            <Route path="/download" element={<DownloadPage />} />
        </Routes>
    )
}
