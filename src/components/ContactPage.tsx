import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mail, MessageSquare, ArrowRight, ArrowLeft,
    Linkedin, Instagram,
    CheckCircle, AlertCircle, Loader,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import WhatsAppIcon from './WhatsAppIcon';
import './ContactSection.css';

const FORMSPREE_URL = 'https://formspree.io/f/mrearnlr';

type Status = 'idle' | 'sending' | 'success' | 'error';

const ContactPage: React.FC = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', project: '', message: '' });
    const [status, setStatus] = useState<Status>('idle');

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        try {
            const res = await fetch(FORMSPREE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                setStatus('success');
                setForm({ name: '', email: '', project: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <div className="contact-page-wrapper">
            <header className="header contact-header">
                <div className="logo-wrapper" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    <Logo size={32} />
                </div>
                <button className="back-btn" onClick={() => navigate('/')}>
                    <ArrowLeft size={18} /> BACK TO HOME
                </button>
            </header>

            <section className="contact-section full-page">
                <div className="contact-container">
                    <div className="section-header-simple">
                        <span className="section-label">GET IN TOUCH</span>
                        <h2>Let's build something exceptional.</h2>
                        <p>We're currently accepting new projects for Q3 2026. Reach out to start the conversation.</p>
                    </div>

                    <div className="contact-grid">
                        {/* Left — Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="contact-info"
                        >
                            <div className="info-item">
                                <div className="info-icon"><Mail size={24} /></div>
                                <div className="info-text">
                                    <h4>Email Us</h4>
                                    <a href="mailto:creatorflow.in@gmail.com">creatorflow.in@gmail.com</a>
                                </div>
                            </div>

                            <div className="info-item">
                                <div className="info-icon"><MessageSquare size={24} /></div>
                                <div className="info-text">
                                    <h4>Social Presence</h4>
                                    <div className="social-icons">
                                        <a href="https://www.instagram.com/creatorflow.co.in" target="_blank" rel="noopener noreferrer" className="social-link"><Instagram size={20} /></a>
                                        <a href="https://linkedin.com/in/yourhandle" target="_blank" rel="noopener noreferrer" className="social-link"><Linkedin size={20} /></a>
                                        <a href="https://wa.me/919810093572" target="_blank" rel="noopener noreferrer" className="social-link"><WhatsAppIcon size={20} /></a>
                                    </div>
                                </div>
                            </div>

                            <div className="availability-card glass">
                                <div className="status-indicator">
                                    <span className="pulse"></span>
                                    ONLINE
                                </div>
                                <p>Average response time: &lt; 2 hours</p>
                            </div>
                        </motion.div>

                        {/* Right — Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="contact-form-container glass"
                        >
                            <AnimatePresence mode="wait">

                                {/* Success screen */}
                                {status === 'success' ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="form-feedback form-feedback--success"
                                    >
                                        <CheckCircle size={48} />
                                        <h3>Message Sent!</h3>
                                        <p>Thanks for reaching out. We'll get back to you within 2 hours.</p>
                                        <button className="btn-outline" onClick={() => setStatus('idle')}>
                                            Send Another
                                        </button>
                                    </motion.div>
                                ) : (

                                    /* Form */
                                    <motion.form
                                        key="form"
                                        className="contact-form"
                                        onSubmit={handleSubmit}
                                        initial={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label htmlFor="cp-name">FULL NAME</label>
                                                <input
                                                    id="cp-name" name="name" type="text"
                                                    placeholder="John Doe"
                                                    value={form.name} onChange={handleChange} required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="cp-email">EMAIL ADDRESS</label>
                                                <input
                                                    id="cp-email" name="email" type="email"
                                                    placeholder="john@example.com"
                                                    value={form.email} onChange={handleChange} required
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="cp-project">PROJECT TYPE</label>
                                            <select
                                                id="cp-project" name="project"
                                                value={form.project} onChange={handleChange} required
                                            >
                                                <option value="">Select an option</option>
                                                <option value="New Website">New Website</option>
                                                <option value="Website Redesign">Website Redesign</option>
                                                <option value="Landing Page">Landing Page</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="cp-message">TELL US ABOUT YOUR PROJECT</label>
                                            <textarea
                                                id="cp-message" name="message"
                                                placeholder="Describe your vision..."
                                                rows={5}
                                                value={form.message} onChange={handleChange} required
                                            />
                                        </div>

                                        {/* Error banner */}
                                        <AnimatePresence>
                                            {status === 'error' && (
                                                <motion.div
                                                    className="form-error-banner"
                                                    initial={{ opacity: 0, y: -8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0 }}
                                                >
                                                    <AlertCircle size={16} />
                                                    Something went wrong. Please try again or email us directly.
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <button type="submit" className="btn-primary w-full" disabled={status === 'sending'}>
                                            {status === 'sending'
                                                ? <><Loader size={18} className="spin" /> SENDING…</>
                                                : <>SEND MESSAGE <ArrowRight size={18} /></>
                                            }
                                        </button>
                                    </motion.form>
                                )}

                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
