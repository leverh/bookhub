import { useState, useEffect } from 'react';
import { fetchNYTOverviewLists, fetchNYTTop10 } from '../api/nytAPI';
import styles from '../styles/NYTReviews.module.css';
import ScrollToTopButton from '../components/ScrollToTopButton';

const NYTReviews = () => {
    const [top10, setTop10] = useState([]);
    const [lists, setLists] = useState([]);
    const [visibleCount, setVisibleCount] = useState(3);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const books = await fetchNYTTop10();
                setTop10(books);
            } catch (err) {
                setError('Failed to fetch top 10 books.');
            }

            try {
                const overview = await fetchNYTOverviewLists();
                setLists(overview);
            } catch (err) {
                setError('Failed to fetch bestseller lists.');
            }
        };

        fetchData();
    }, []);

    const showMoreLists = () => {
        setVisibleCount(prev => prev + 3);
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.contentWrapper}>
                <section className={styles.headerSection}>
                    <h2 className={styles.pageTitle}>New York Times Best Sellers</h2>
                    {error && <div className={styles.errorMessage}>Error: {error}</div>}
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

                <section className={styles.bestSellersSection}>
                    <h3 className={styles.sectionTitle}>All NYT Bestseller Lists</h3>
                    {lists.slice(0, visibleCount).map(list => (
                        <div key={list.list_id} className={styles.listCategory}>
                            <h4 className={styles.sectionTitle}>{list.display_name}</h4>
                            <ul className={styles.bestSellersList}>
                                {list.books.map((book, index) => (
                                    <li key={book.primary_isbn13} className={styles.bestSellerCard}>
                                        <div className={styles.bookImageContainer}>
                                            <img src={book.book_image} alt={book.title} className={styles.bookImage} />
                                        </div>
                                        <div className={styles.bookInfo}>
                                            <h4 className={styles.bookTitle}>{book.title}</h4>
                                            <p className={styles.author}>By: {book.author}</p>
                                            <p className={styles.description}>{book.description}</p>
                                            <div className={styles.bookMeta}>
                                                <span className={styles.isbn}>
                                                    <i className="fas fa-barcode"></i> ISBN: {book.primary_isbn13}
                                                </span>
                                            </div>
                                            <a
                                                href={book.amazon_product_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.readMoreLink}
                                            >
                                                Buy on Amazon
                                            </a>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {visibleCount < lists.length && (
                        <div className={styles.loadMoreContainer}>
                            <button onClick={showMoreLists} className={styles.loadMoreButton}>
                                Load More Lists
                            </button>
                        </div>
                    )}
                </section>
            </div>
            <ScrollToTopButton />
        </div>
    );
};

export default NYTReviews;
