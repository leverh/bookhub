import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/BookOfTheWeek.module.css';

function BookOfTheWeek({ book }) {
  const [fetchedBook, setFetchedBook] = useState(null);

  useEffect(() => {
    // Fetch the book of the week from the backend
    if (!book) {
      fetchBookOfTheWeek().then(data => setFetchedBook(data));
    }
  }, [book]);

  const displayBook = book || fetchedBook;

  if (!displayBook) return null;  // Return null while waiting for data

  return (
    <div className={styles.bookOfTheWeekContainer}>
      <div className={`${styles['arrow-divider']}`}></div>
      <h2>A review we really liked:</h2>
      <h3>{displayBook.title}</h3>
      <p>By: {displayBook.author_name}</p>
      <div className={`${styles['arrow-divider']}`}></div>
    </div>
    
  );
}

// Function to fetch the book of the week from the backend
const fetchBookOfTheWeek = async () => {
  try {
    const response = await axios.get('https://bookhub-rdf-api-9aad7672239c.herokuapp.com/book-of-the-week/');
    return response.data;
  } catch (error) {
    console.error("Error fetching book of the week:", error);
    throw error;
  }
};

export default BookOfTheWeek;
