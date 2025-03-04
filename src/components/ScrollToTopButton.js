import React, { useState, useEffect } from 'react';
import styles from '../styles/ScrollUpButton.module.css';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show the button when the page is scrolled up to a given distance
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the window's scroll position to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility); // Cleanup the event listener on component unmount
    }, []);

    return (
        <div className={styles.scrollButtonContainer}>
            {isVisible && 
                <div onClick={scrollToTop} className={styles.scrollButton}>
                    ↑
                </div>
            }
        </div>
    );
}

export default ScrollToTopButton;
