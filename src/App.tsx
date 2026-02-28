import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, Link } from 'react-router-dom';
import {
  Zap,
  ArrowRight,
  Monitor,
  Layout,
  Linkedin,
  Instagram,
  Globe,
  ChevronDown,
} from 'lucide-react';
import WhatsAppIcon from './components/WhatsAppIcon';
import './App.css';
import Logo from './components/Logo';
import HookSection from './components/HookSection';
import ContactPage from './components/ContactPage';

// ─── Currency config (PPP-adjusted prices) ───────────────────────────────────
interface CurrencyConfig {
  symbol: string;
  name: string;
  flag: string;
  prices: [string, string, string]; // [Starter, Growth, Premium]
}

const CURRENCIES: Record<string, CurrencyConfig> = {
  USD: { symbol: '$', name: 'US Dollar', flag: '🇺🇸', prices: ['$299', '$599', '$999'] },
  EUR: { symbol: '€', name: 'Euro', flag: '🇪🇺', prices: ['€279', '$549', '€919'] },
  GBP: { symbol: '£', name: 'British Pound', flag: '🇬🇧', prices: ['£249', '£499', '£849'] },
  AUD: { symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺', prices: ['A$449', 'A$899', 'A$1,499'] },
  CAD: { symbol: 'C$', name: 'Canadian Dollar', flag: '🇨🇦', prices: ['C$399', 'C$799', 'C$1,349'] },
  INR: { symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳', prices: ['₹9,999', '₹19,999', '₹34,999'] },
  PKR: { symbol: '₨', name: 'Pakistani Rupee', flag: '🇵🇰', prices: ['₨84,999', '₨1,69,999', '₨2,79,999'] },
  BDT: { symbol: '৳', name: 'Bangladeshi Taka', flag: '🇧🇩', prices: ['৳34,999', '৳69,999', '৳1,14,999'] },
  AED: { symbol: 'د.إ', name: 'UAE Dirham', flag: '🇦🇪', prices: ['د.إ1,099', 'د.إ2,199', 'د.إ3,669'] },
  SGD: { symbol: 'S$', name: 'Singapore Dollar', flag: '🇸🇬', prices: ['S$399', 'S$799', 'S$1,349'] },
  MYR: { symbol: 'RM', name: 'Malaysian Ringgit', flag: '🇲🇾', prices: ['RM1,399', 'RM2,799', 'RM4,699'] },
  PHP: { symbol: '₱', name: 'Philippine Peso', flag: '🇵🇭', prices: ['₱16,999', '₱33,999', '₱56,999'] },
  NGN: { symbol: '₦', name: 'Nigerian Naira', flag: '🇳🇬', prices: ['₦4,49,999', '₦8,99,999', '₦14,99,999'] },
  BRL: { symbol: 'R$', name: 'Brazilian Real', flag: '🇧🇷', prices: ['R$1,499', 'R$2,999', 'R$4,999'] },
  ZAR: { symbol: 'R', name: 'South African Rand', flag: '🇿🇦', prices: ['R5,499', 'R10,999', 'R18,499'] },
};

// Country code → currency code map
const COUNTRY_TO_CURRENCY: Record<string, string> = {
  US: 'USD', CA: 'CAD', AU: 'AUD', NZ: 'USD',
  GB: 'GBP', IE: 'EUR', DE: 'EUR', FR: 'EUR', IT: 'EUR', ES: 'EUR',
  NL: 'EUR', BE: 'EUR', AT: 'EUR', PT: 'EUR', FI: 'EUR', GR: 'EUR',
  IN: 'INR', PK: 'PKR', BD: 'BDT', LK: 'INR',
  AE: 'AED', SA: 'AED', QA: 'AED', KW: 'AED', BH: 'AED', OM: 'AED',
  SG: 'SGD', MY: 'MYR', PH: 'PHP', ID: 'USD', TH: 'USD', VN: 'USD',
  NG: 'NGN', GH: 'USD', KE: 'USD', ZA: 'ZAR', EG: 'USD',
  BR: 'BRL', MX: 'USD', AR: 'USD', CO: 'USD', CL: 'USD',
  CN: 'USD', JP: 'USD', KR: 'USD',
};

// ─── Nav ─────────────────────────────────────────────────────────────────────
const Nav = () => (
  <header className="header">
    <div className="logo-wrapper">
      <Link to="/"><Logo size={32} /></Link>
    </div>
    <nav>
      <a href="/#services">Our Services</a>
      <a href="/#methodology">Process</a>
      <a href="/#pricing">Pricing</a>
      <a href="/#portfolio">Portfolio</a>
    </nav>
    <Link to="/contact" className="btn-primary">Work with CreatorFlow</Link>
  </header>
);

// ─── Pricing Section ──────────────────────────────────────────────────────────
const PricingSection = () => {
  const [currencyCode, setCurrencyCode] = useState('USD');
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const detect = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        const country = data.country_code as string;
        setDetectedCountry(country);
        const currency = COUNTRY_TO_CURRENCY[country] ?? 'USD';
        setCurrencyCode(currency);
      } catch {
        // Silently fall back to USD
      } finally {
        setLoading(false);
      }
    };
    detect();
  }, []);

  const currency = CURRENCIES[currencyCode];
  const plans = [
    {
      name: 'Starter',
      price: currency.prices[0],
      desc: 'Perfect for individuals and creators starting out online.',
      features: [
        '3–5 page website',
        'Mobile responsive design',
        'Contact form',
        'Basic SEO setup',
        '1 revision round',
      ],
      featured: false,
      cta: 'Get Started',
    },
    {
      name: 'Growth',
      price: currency.prices[1],
      desc: 'Ideal for small businesses ready to make a real impression.',
      features: [
        'Up to 8 pages',
        'Custom design & animations',
        'Contact form + integrations',
        'Full SEO optimization',
        '2 revision rounds',
        'Social media links & setup',
      ],
      featured: true,
      cta: 'Most Popular',
    },
    {
      name: 'Premium',
      price: currency.prices[2],
      desc: 'For brands that want a fully custom, high-impact digital presence.',
      features: [
        'Unlimited pages',
        'Advanced animations & interactions',
        'CMS integration',
        'Full SEO + performance audit',
        'Unlimited revisions',
        'Priority support',
      ],
      featured: false,
      cta: 'Go Premium',
    },
  ];

  return (
    <section id="pricing" className="pricing">
      <div className="section-header-simple">
        <span className="section-label">PRICING</span>
        <h2>Simple, Transparent Pricing.</h2>
        <p>No hidden fees. No surprises. Just clean websites at clear prices.</p>

        {/* Currency switcher */}
        <div className="currency-row">
          {!loading && detectedCountry && (
            <span className="currency-detected">
              <Globe size={13} />
              Auto-detected: {CURRENCIES[currencyCode]?.flag} {detectedCountry}
            </span>
          )}
          <div className="currency-switcher">
            <button
              className="currency-btn"
              onClick={() => setDropdownOpen(o => !o)}
            >
              <span>{currency.flag} {currencyCode}</span>
              <ChevronDown size={14} className={dropdownOpen ? 'rotated' : ''} />
            </button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.ul
                  className="currency-dropdown"
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                >
                  {Object.entries(CURRENCIES).map(([code, cfg]) => (
                    <li
                      key={code}
                      className={code === currencyCode ? 'active' : ''}
                      onClick={() => { setCurrencyCode(code); setDropdownOpen(false); }}
                    >
                      <span>{cfg.flag}</span>
                      <span className="cur-code">{code}</span>
                      <span className="cur-name">{cfg.name}</span>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="pricing-grid">
        {plans.map((plan, i) => (
          <motion.div
            key={`${currencyCode}-${i}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className={`pricing-card glass${plan.featured ? ' pricing-card--featured' : ''}`}
          >
            {plan.featured && <div className="pricing-badge">MOST POPULAR</div>}
            <div className="pricing-header">
              <span className="pricing-name">{plan.name}</span>
              <motion.div
                key={plan.price}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="pricing-price"
              >
                {loading ? '—' : plan.price}
              </motion.div>
              <p className="pricing-desc">{plan.desc}</p>
            </div>
            <ul className="pricing-features">
              {plan.features.map((f, fi) => (
                <li key={fi}><span className="check">✓</span> {f}</li>
              ))}
            </ul>
            <a href="/contact" className={plan.featured ? 'btn-primary' : 'btn-outline'}>
              {plan.cta}
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// ─── Home Page ────────────────────────────────────────────────────────────────
const HomePage = () => (
  <div className="app-container">
    <Nav />
    <main>
      {/* HERO */}
      <section className="hero">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-content"
        >
          <h1>
            <span className="highlight">Exceptional</span> Websites<span className="highlight">,</span> <br />
            Thoughtfully Built<span className="highlight">.</span>
          </h1>
          <div className="hero-tag">Websites • Landing Pages • Redesigns</div>
          <div className="hero-btns">
            <a href="#portfolio" className="btn-primary">View Our Work</a>
          </div>
        </motion.div>
      </section>

      <HookSection />

      {/* SERVICES */}
      <section id="services" className="what-we-build">
        <div className="section-header-simple">
          <span className="section-label">SERVICES</span>
          <h2>What We Build</h2>
          <p>Tailored digital solutions designed to drive growth and engagement.</p>
        </div>
        <div className="what-we-build-grid">
          {[
            { title: 'Creator Websites', desc: 'Personal brand sites', icon: <Zap size={24} /> },
            { title: 'Business Websites', desc: 'Professional company sites', icon: <Layout size={24} /> },
            { title: 'Landing Pages', desc: 'For products and services', icon: <Monitor size={24} /> },
            { title: 'Redesigns', desc: 'Improve old websites', icon: <ArrowRight size={24} /> },
          ].map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="service-simple-card glass"
            >
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="portfolio-list-section">
        <div className="section-header-simple">
          <span className="section-label">PORTFOLIO</span>
          <h2>Selected Work</h2>
          <p>Websites built for brands and content creators.</p>
        </div>
        <div className="work-list">
          {[
            { name: 'Enlead Digital', link: 'https://enlead.figma.site/' },
            { name: 'ViewMovement', link: 'https://viewmovement.com' },
            { name: 'ScaleBrandsLab', link: 'https://www.scalebrandslab.com/' },
            { name: 'FinTrack', link: 'https://fintrack.scalebrandslab.com/' },
          ].map((work, i) => (
            <motion.a
              key={i}
              href={work.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="work-item"
            >
              <span className="work-name">{work.name}</span>
              <span className="visit-link">Visit Website <ArrowRight size={16} /></span>
            </motion.a>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section id="methodology" className="methodology">
        <div className="section-header-simple">
          <span className="section-label">THE PROCESS</span>
          <h2>How It Works.</h2>
          <p>From first conversation to a live website — a simple, transparent process designed around you.</p>
        </div>
        <div className="method-content">
          <div className="steps">
            {[
              { id: '01', name: 'VISION', title: 'Share Your Vision', desc: 'Tell us about your website, your goals, and what you want to build. We take the time to understand your idea before getting started.' },
              { id: '02', name: 'BUILD', title: 'Design & Build', desc: 'We design and develop a clean, modern website tailored to your needs, ensuring it looks professional across all devices.' },
              { id: '03', name: 'LAUNCH', title: 'Launch Your Website', desc: 'Once everything is ready, your website goes live and is ready to be shared with the world.' },
            ].map((step, i) => (
              <div key={i} className="step-item">
                <div className="step-number">
                  <span className="num">{step.id}</span>
                  <span className="dash"></span>
                  <span className="name">{step.name}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING (geo-aware) */}
      <PricingSection />

      {/* TESTIMONIAL */}
      <section className="testimonial">
        <div className="quote-icon">"</div>
        <blockquote>
          "Creator Flow didn't just redesign our site;
          they reimagined how we communicate
          our value to the world's most discerning
          clients. The ROI was immediate."
        </blockquote>
        <div className="author">
          <img src="https://i.pravatar.cc/150?u=julian" alt="Julian Sterling" />
          <div className="author-info">
            <h4>Julian Sterling</h4>
            <p>CEO, UNITED GLOBAL</p>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner">
        <div className="cta-content">
          <div className="cta-text">
            <h2>Ready to Elevate?</h2>
            <p>We take on only 2 projects per quarter to ensure absolute perfection. Inquire now to secure your position for Q2.</p>
            <Link to="/contact" className="btn-secondary">BOOK YOUR DESIGN CALL</Link>
          </div>
          <div className="cta-graphic">
            <svg viewBox="0 0 200 100" className="infinity-svg">
              <path
                d="M50,50 C50,20 80,20 100,50 C120,80 150,80 150,50 C150,20 120,20 100,50 C80,80 50,80 50,50"
                fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="15"
              />
            </svg>
          </div>
        </div>
      </section>
    </main>

    {/* FOOTER */}
    <footer className="main-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="logo-wrapper"><Logo size={32} /></div>
          <p>A creative future agency for the world's most ambitious brands.</p>
          <div className="social-links">
            <a href="https://www.instagram.com/creatorflow.co.in" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="https://linkedin.com/in/yourhandle" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="https://wa.me/919810093572" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <WhatsAppIcon size={18} />
            </a>
          </div>
        </div>
        <div className="footer-nav">
          <div className="footer-col">
            <h4>QUICK LINKS</h4>
            <a href="/#services">Services</a>
            <a href="/#methodology">Process</a>
            <a href="/#pricing">Pricing</a>
            <a href="/#portfolio">Portfolio</a>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 CREATORFLOW AGENCY. ALL RIGHTS RESERVED.</p>
        <div className="legal">
          <a href="#">PRIVACY POLICY</a>
          <a href="#">TERMS OF SERVICE</a>
        </div>
      </div>
    </footer>
  </div>
);

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}

export default App;
