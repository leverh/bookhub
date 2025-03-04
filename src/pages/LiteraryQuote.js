import React, { useState, useEffect } from 'react';
import styles from '../styles/LiteraryQuote.module.css';

function LiteraryQuote() {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    fetch('https://api.quotable.io/random')
      .then(response => response.json())
      .then(data => {
        setQuote(data);
      })
      .catch(err => {
        console.error('Error fetching quote:', err);
      });
  }, []);

  return (
    <div className={styles.quoteContainer}>
      {quote ? (
        <>
          <h3>Literary quote for daily inspiration:</h3>
          <p>"{quote.content}"</p>
          <p>- {quote.author}</p>
        </>
      ) : (
        <p>Loading quote...</p>
      )}
      <div className={`${styles['arrow-divider']}`}></div>
    </div>
  );
}

export default LiteraryQuote;
