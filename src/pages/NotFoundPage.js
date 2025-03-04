import React from 'react';
import styles from '../styles/NotFoundPage.module.css'; 
import { Link } from 'react-router-dom'; 

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <img src="https://res.cloudinary.com/dmtxhbwvw/image/upload/v1695460746/Monster_404_Error-pana_kyzavb.png" alt="Not Found" className={styles.image} />
      <h1 className={styles.title}>404 - Page Not Found</h1>
      <p className={styles.description}>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
      <Link to="/" className={styles.homeLink}>Go Back to Home</Link>
    </div>
  );
}

export default NotFoundPage;
