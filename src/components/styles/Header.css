.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: rgba(5, 5, 5, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    /* Always visible - no transform or hide behavior */
}

.header.scrolled {
    background: rgba(5, 5, 5, 0.95);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
}

.header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 72px;
    padding-left: var(--space-4);
    padding-right: var(--space-4);
}

.logo {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    transition: transform var(--transition-base);
    z-index: 101;
}

.logo:hover {
    transform: scale(1.05);
}

.logo-text {
    font-size: var(--font-size-2xl);
    font-weight: 800;
    color: #FFFFFF;
    letter-spacing: -0.03em;
}

.logo-dot {
    width: 8px;
    height: 8px;
    background-color: #22C55E;
    border-radius: 50%;
    flex-shrink: 0;
}

/* Navigation */
.nav {
    display: none;
    align-items: center;
    gap: var(--space-8);
}

.nav-link {
    position: relative;
    font-size: var(--font-size-sm);
    font-weight: 500;
    color: var(--color-text-muted);
    transition: color var(--transition-base);
    padding: var(--space-2) 0;
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: #22C55E;
    transition: width var(--transition-base);
}

.nav-link:hover {
    color: var(--color-text-primary);
}

.nav-link:hover::after {
    width: 100%;
}

/* Header Actions */
.header-actions {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    z-index: 101;
}

/* Hamburger Menu */
.hamburger {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 32px;
    height: 32px;
    padding: 4px;
    cursor: pointer;
    background: transparent;
    border: none;
    z-index: 101;
}

.hamburger-line {
    display: block;
    width: 100%;
    height: 2px;
    background: var(--color-text-primary);
    border-radius: 2px;
    transition: all var(--transition-base);
    transform-origin: center;
}

.hamburger-active .hamburger-line:nth-child(1) {
    transform: rotate(45deg) translateY(5px);
}

.hamburger-active .hamburger-line:nth-child(2) {
    opacity: 0;
    transform: scaleX(0);
}

.hamburger-active .hamburger-line:nth-child(3) {
    transform: rotate(-45deg) translateY(-5px);
}

/* Mobile Overlay */
.mobile-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    opacity: 0;
    visibility: hidden;
    transition: all var(--transition-base);
    z-index: 99;
}

.mobile-overlay-active {
    opacity: 1;
    visibility: visible;
}

/* Tablet and up */
@media (min-width: 768px) {
    .nav {
        display: flex;
    }

    .hamburger {
        display: none;
    }

    .mobile-overlay {
        display: none;
    }
}

/* Mobile Navigation */
@media (max-width: 767px) {
    .nav {
        position: fixed;
        top: 72px;
        left: 0;
        right: 0;
        background: rgba(10, 10, 10, 0.98);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        flex-direction: column;
        align-items: stretch;
        padding: var(--space-6);
        gap: 0;
        border-bottom: 1px solid var(--color-border);
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all var(--transition-base);
        z-index: 100;
    }

    .nav-open {
        display: flex;
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
    }

    .nav-link {
        padding: var(--space-4);
        font-size: var(--font-size-lg);
        border-bottom: 1px solid var(--color-border);
        text-align: center;
    }

    .nav-link:last-child {
        border-bottom: none;
    }

    .nav-link::after {
        display: none;
    }

    .nav-link:hover {
        color: #22C55E;
        background: rgba(34, 197, 94, 0.05);
    }
}
