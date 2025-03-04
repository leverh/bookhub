import React, { useState, useEffect } from 'react';
import { fetchNYTReviews, fetchNYTTop10 } from '../api/nytAPI';
import btnStyles from "../styles/Button.module.css";
import styles from '../styles/NYTReviews.module.css'
import ScrollToTopButton from '../components/ScrollToTopButton'

const NYTReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [top10, setTop10] = useState([]);  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); 

    useEffect(() => {
        const fetchTop10Books = async () => {
            try {
                const books = await fetchNYTTop10();
                setTop10(books);
            } catch (err) {
                setError('Failed to fetch top 10 books.');
            }
        };

        fetchTop10Books();  // Fetch top 10 books on component mount
    }, []);

    const getReviews = async () => {  
        try {
            setLoading(true);
            const reviewsData = await fetchNYTReviews(searchTerm);

            setReviews(reviewsData);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch reviews.');
            setLoading(false);
        }
    };

    const handleSearch = (event) => {
        event.preventDefault(); 
        getReviews();
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>New York Times Book Reviews</h2>
            <form onSubmit={handleSearch} className={styles.searchBox}>
                <input 
                    type="text" 
                    value={searchTerm} 
                    onChange={e => setSearchTerm(e.target.value)} 
                    placeholder="Search for a book..."
                    className={styles.searchInput}
                />
                <button type="submit" className={`${btnStyles.Button} ${styles.searchButton}`}>Search</button>
            </form>
            {loading && <p>Loading reviews...</p>}
            {error && <p>Error: {error}</p>}
            
            {reviews.length === 0 && !loading && <p>No reviews found.</p>}
            
            <ul className={styles.list}>
                {reviews.map((review, index) => (
                    <li key={index} className={styles.listItem}>
                        <h3 className={styles.itemHeader}>{review.book_title}</h3>
                        <p>By: {review.byline.slice(3)}</p>
                        <p>{review.summary}</p>
                        <a href={review.url} target="_blank" rel="noopener noreferrer">Read full review</a>
                    </li>
                ))}
            </ul>
    
            {/* Display top 10 books */}
            <h3 className={styles.itemHeader}>Top 10 NYT Best Sellers</h3>
            <ul className={styles.top10List}>
                {top10.map((book, index) => (
                    <li key={index} className={styles.top10Item}>
                        <img src={book.book_image} alt={book.title} className={styles.bookImage} />
                        <h4 className={styles.top10Header}>{book.title}</h4>
                        <p className={styles.author}>By: {book.author}</p>
                        <p className={styles.description}>Plot: {book.description}</p>
                        <p className={styles.weeksOnList}>Weeks on List: {book.weeks_on_list}</p>
                        <p className={styles.isbn}>ISBN: {book.primary_isbn13}</p>
                    </li>
                ))}
            </ul>
            <ScrollToTopButton />
        </div>
    );
}

export default NYTReviews;
