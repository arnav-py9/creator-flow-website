import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './HookSection.css';

const words = [
    { text: "Emotion", highlight: 2 },     // 'o'
    { text: "Curiosity", highlight: 4 },   // 'o'
    { text: "Fear", highlight: 1 },        // 'e'
    { text: "Identity", highlight: 3 },    // 'n'
    { text: "Controversy", highlight: 5 }, // 'o'
    { text: "Desire", highlight: 2 }       // 's'
];

const HookSection: React.FC = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 2500);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="hook-section">
            <div className="inner-box">
                {/* corner marks */}
                <div className="corner corner-tl"></div>
                <div className="corner corner-tr"></div>
                <div className="corner corner-bl"></div>
                <div className="corner corner-br"></div>

                {/* Heading */}
                <p className="hook-heading">
                    We don't just build websites.<br />
                    We design every detail to trigger...
                </p>

                {/* Cycling word */}
                <div className="word-display">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={words[index].text}
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -40, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="cycling-word"
                        >
                            {words[index].text.split('').map((char, i) => (
                                <span key={i} className={i === words[index].highlight ? "highlight" : ""}>
                                    {char}
                                </span>
                            ))}
                        </motion.span>
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
};

export default HookSection;
