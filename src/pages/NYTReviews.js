import React, { useState, useEffect } from 'react';
import { fetchNYTReviews, fetchNYTTop10 } from '../api/nytAPI';
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
        <div className={styles.pageContainer}>
            <div className={styles.contentWrapper}>
                <section className={styles.searchSection}>
                    <h2 className={styles.pageTitle}>New York Times Book Reviews</h2>
                    <form onSubmit={handleSearch} className={styles.searchForm}>
                        <div className={styles.searchInputWrapper}>
                            <i className="fas fa-search"></i>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                placeholder="Search for a book..."
                                className={styles.searchInput}
                            />
                        </div>
                        <button type="submit" className={styles.searchButton}>Search</button>
                    </form>
                </section>
                
                <section className={styles.resultsSection}>
                    {loading && <div className={styles.loadingMessage}>Loading reviews...</div>}
                    {error && <div className={styles.errorMessage}>Error: {error}</div>}
                    
                    {reviews.length > 0 ? (
                        <div className={styles.reviewsContainer}>
                            <h3 className={styles.sectionTitle}>Search Results</h3>
                            <ul className={styles.reviewsList}>
                                {reviews.map((review, index) => (
                                    <li key={index} className={styles.reviewCard}>
                                        <h3 className={styles.bookTitle}>{review.book_title}</h3>
                                        <p className={styles.reviewer}>By: {review.byline.slice(3)}</p>
                                        <p className={styles.summary}>{review.summary}</p>
                                        <a 
                                            href={review.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className={styles.readMoreLink}
                                        >
                                            Read full review
                                            <i className="fas fa-external-link-alt"></i>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : !loading && searchTerm && (
                        <div className={styles.noResults}>
                            <p>No reviews found for "{searchTerm}".</p>
                            <p>Try searching for another book title or author.</p>
                        </div>
                    )}
                </section>

                <section className={styles.bestSellersSection}>
                    <h3 className={styles.sectionTitle}>Top 10 NYT Best Sellers</h3>
                    {top10.length > 0 ? (
                        <ul className={styles.bestSellersList}>
                            {top10.map((book, index) => (
                                <li key={index} className={styles.bestSellerCard}>
                                    <div className={styles.bestSellerRank}>{index + 1}</div>
                                    <div className={styles.bookImageContainer}>
                                        <img src={book.book_image} alt={book.title} className={styles.bookImage} />
                                    </div>
                                    <div className={styles.bookInfo}>
                                        <h4 className={styles.bookTitle}>{book.title}</h4>
                                        <p className={styles.author}>By: {book.author}</p>
                                        <p className={styles.description}>{book.description}</p>
                                        <div className={styles.bookMeta}>
                                            <span className={styles.weeksOnList}>
                                                <i className="fas fa-calendar-week"></i> {book.weeks_on_list} weeks on list
                                            </span>
                                            <span className={styles.isbn}>
                                                <i className="fas fa-barcode"></i> ISBN: {book.primary_isbn13}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className={styles.loadingBestSellers}>
                            <p>Loading best sellers...</p>
                        </div>
                    )}
                </section>
            </div>
            <ScrollToTopButton />
        </div>
    );
};

export default NYTReviews;
