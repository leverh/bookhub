import React from 'react';
import styles from '../styles/AboutUs.module.css';
import ScrollToTopButton from '../components/ScrollToTopButton';

const currentYear = new Date().getFullYear();

const AboutUs = () => {
  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.mainContent}>
          <section className={styles.heroSection}>
            <h2 className={styles.mainHeading}>About BookHub</h2>
            <div className={styles.divider}></div>
            <p className={styles.intro}>
              Welcome to BookHub, the ultimate platform for book enthusiasts around the world. At
              BookHub, we believe that books have the power to change lives, spark conversations, and
              bring people together.
            </p>
          </section>
          
          <section className={styles.missionSection}>
            <h3 className={styles.sectionHeading}>Our Mission</h3>
            <div className={styles.divider}></div>
            <p>
              Our mission is to create a digital space where users can share their thoughts on books,
              discover new titles, and connect with a community of like-minded readers. Whether you're
              searching for your next read, writing a review, or simply browsing through the latest New
              York Times Best Sellers, BookHub has something for everyone.
            </p>
          </section>
          
          <section className={styles.featuresSection}>
            <h3 className={styles.sectionHeading}>Features</h3>
            <div className={styles.divider}></div>
            <ul className={styles.featuresList}>
              <li><span className={styles.featureHighlight}>Book Reviews:</span> Share your thoughts on the books you've read and discover reviews from other members.</li>
              <li><span className={styles.featureHighlight}>NYT Best Sellers:</span> Stay updated with the latest top 10 books from the New York Times Best Sellers list.</li>
              <li><span className={styles.featureHighlight}>User Profiles:</span> Create your own profile, follow other users, and build your reading community.</li>
              <li><span className={styles.featureHighlight}>Open Library Search:</span> Dive deep into the vast collections of <a href='https://openlibrary.org/' target='_blank' rel="noopener noreferrer">OpenLibrary</a> and find any book you're looking for.</li>
            </ul>
          </section>
          
          <div className={styles.divider}></div>
          
          <section className={styles.communitySection}>
            <h4 className={styles.tagline}>Become a part of our growing community and embark on a literary journey like no other. Dive deep into the world of books and let your voice be heard.</h4>
            <h5 className={styles.missionStatement}>Our community supports, believes, and strives to make the world a better place!</h5>
            
            <div className={styles.beliefStatement}>
              <img src='https://res.cloudinary.com/dybqzflbo/image/upload/v1694433173/GoodNightWhitePride_bldkoj_hucnfi.gif' alt='Good night white pride banner'></img>
              <img src='https://res.cloudinary.com/dybqzflbo/image/upload/v1694433142/Refugees_welcome.svg_jjyot2_ryxgdr.png' alt='Refugees welcome banner'></img>
              <img src='https://res.cloudinary.com/dybqzflbo/image/upload/v1694433142/Intersex-inclusive_pride_flag.svg_cpvqhu_d5hk3q.png' alt='Intersex inclusive pride flag'></img>
              <img src='https://res.cloudinary.com/dybqzflbo/image/upload/v1694433142/Antifa_logo.svg_egzlhj_dwtuwx.png' alt='Anti-fascist action flag'></img>
            </div>
          </section>
          
          <section className={styles.contactSection}>
            <h3 className={styles.sectionHeading}>Contact Us</h3>
            <div className={styles.divider}></div>
            <p>Email us at: <a href="mailto:BookHub@gmail.com">BookHub@gmail.com</a></p>
            
            <h3 className={styles.sectionHeading}>Stay Connected</h3>
            <div className={styles.socialLinks}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fa fa-facebook-official" aria-hidden="true"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fa fa-twitter-square" aria-hidden="true"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </a>
            </div>
            
            <div className={styles.quickLinks}>
              <a href="/terms">Terms of Service</a>
              <a href="/privacy">Privacy Policy</a>
            </div>
          </section>
        </div>
        
        <div className={styles.copyright}>
          &copy; {currentYear} <a href='https://pixelsummit.dev/' target="_blank" rel="noopener noreferrer">PixelSummit</a>. All rights reserved.
        </div>
        
        <ScrollToTopButton />
      </div>
    </>
  );
}

export default AboutUs;