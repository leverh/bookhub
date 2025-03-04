import React, { useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import appStyles from '../App.module.css';
import btnStyles from "../styles/Button.module.css";
import styles from '../styles/OpenLibrarySearch.module.css'
import ScrollToTopButton from '../components/ScrollToTopButton'

const OpenLibrarySearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [offset, setOffset] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);
    const [searchInitiated, setSearchInitiated] = useState(false);

    const handleSearch = (newSearch = false) => {
        if (newSearch) {
            setResults([]);
            setOffset(0);
            setSearchInitiated(true);
        }

        fetch(`https://openlibrary.org/search.json?q=${searchTerm}&page=${offset}`)
            .then(response => response.json())
            .then(data => {
                if (data.docs.length === 0) {
                    setHasMore(false);
                } else {
                    setResults(prevResults => [...prevResults, ...data.docs]);
                    setOffset(prevOffset => prevOffset + 1);
                    setHasMore(true);
                }
                setError(null);
            })
            .catch(err => {
                setError('Failed to fetch results. Please try again later.');
                setResults([]);
            });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleSearch(true);
    };

    return (
        <div className={`${styles.searchContainer} ${appStyles.containerClass}`}>
            <h2 className={styles.searchHeader}>Search Books on OpenLibrary</h2>
            <p className={styles.descriptionText}><a href="https://openlibrary.org/" target='_blank' rel="noopener noreferrer">OpenLibrary.org </a> 
            is a comprehensive online platform dedicated to promoting global literacy and access to knowledge. 
            It provides users with a vast digital library of millions of books, 
            including classics, contemporary works, and rare manuscripts, 
            all available for free.</p> 
            
            <p className={styles.descriptionText}><a href="https://openlibrary.org/" target='_blank' rel="noopener noreferrer">OpenLibrary.org </a> not only offers the 
            opportunity to read and borrow books but also encourages collaborative 
            contributions from users to create an open and ever-expanding 
            repository of human knowledge. It's a valuable resource for readers, 
            researchers, and educators alike, fostering a culture of learning and 
            sharing in the digital age. </p>

            <p className={styles.descriptionText}>Feel free to use the search function below to explore new books, ideas, 
            as well as fellow bookwors on the <a href="https://openlibrary.org/" target='_blank' rel="noopener noreferrer">OpenLibrary.org </a></p>
            <form onSubmit={handleFormSubmit}> 
                <input 
                    type="text" 
                    className={styles.searchInput}
                    placeholder="Search for books..." 
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <button className={`${btnStyles.Button} ${styles.searchButton}`} type="submit">Search</button>
            </form>
            {error && <p>{error}</p>}
            {searchInitiated && (
                <InfiniteScroll
                    dataLength={results.length}
                    next={() => handleSearch(false)}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                >
                    <ul className={styles.searchResults}>
                        {results.map(book => (
                            <li key={book.key}>
                                <a className={styles.flexLinkContainer} href={`https://openlibrary.org${book.key}`} target="_blank" rel="noopener noreferrer">

                                    <img src={book.cover_i ? `http://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg` : ''} alt={book.title} />
                                    <h3>{book.title}</h3>
                                </a>
                                <p>Author: {book.author_name && book.author_name.join(', ')}</p>
                                <p>First Published: {book.first_publish_year}</p>
                            </li>
                        ))}
                    </ul>
                </InfiniteScroll>
            )}
            <ScrollToTopButton />
        </div>
    );
}

export default OpenLibrarySearch;
