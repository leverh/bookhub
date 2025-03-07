import React, { useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
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
        <div className={styles.pageContainer}>
          <div className={styles.contentWrapper}>
            <section className={styles.headerSection}>
              <h2 className={styles.pageTitle}>Search Books on OpenLibrary</h2>
              <div className={styles.descriptionContainer}>
                <p className={styles.descriptionText}>
                  <a href="https://openlibrary.org/" target="_blank" rel="noopener noreferrer">OpenLibrary.org</a> is a comprehensive online platform dedicated to promoting global literacy and access to knowledge. 
                  It provides users with a vast digital library of millions of books, 
                  including classics, contemporary works, and rare manuscripts, 
                  all available for free.
                </p>
                
                <p className={styles.descriptionText}>
                  <a href="https://openlibrary.org/" target="_blank" rel="noopener noreferrer">OpenLibrary.org</a> not only offers the 
                  opportunity to read and borrow books but also encourages collaborative 
                  contributions from users to create an open and ever-expanding 
                  repository of human knowledge. It's a valuable resource for readers, 
                  researchers, and educators alike, fostering a culture of learning and 
                  sharing in the digital age.
                </p>
      
                <p className={styles.descriptionText}>
                  Feel free to use the search function below to explore new books, ideas, 
                  as well as fellow bookworms on the <a href="https://openlibrary.org/" target="_blank" rel="noopener noreferrer">OpenLibrary.org</a>
                </p>
              </div>
            </section>
      
            <section className={styles.searchSection}>
              <form onSubmit={handleFormSubmit} className={styles.searchForm}>
                <div className={styles.inputWrapper}>
                  <i className="fas fa-search"></i>
                  <input 
                    type="text" 
                    className={styles.searchInput}
                    placeholder="Search for books..." 
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className={styles.searchButton} type="submit">Search</button>
              </form>
            </section>
      
            {error && <div className={styles.errorMessage}>{error}</div>}
            
            <section className={styles.resultsSection}>
              {searchInitiated && (
                <InfiniteScroll
                  dataLength={results.length}
                  next={() => handleSearch(false)}
                  hasMore={hasMore}
                  loader={<div className={styles.loadingMessage}>Loading more books...</div>}
                  endMessage={
                    <div className={styles.endMessage}>
                      {results.length > 0 ? "You've seen all available books for this search." : "No books found matching your search."}
                    </div>
                  }
                >
                  {results.length > 0 ? (
                    <ul className={styles.bookGrid}>
                      {results.map(book => (
                        <li key={book.key} className={styles.bookCard}>
                          <a 
                            href={`https://openlibrary.org${book.key}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={styles.bookLink}
                          >
                            <div className={styles.bookCoverContainer}>
                              {book.cover_i ? (
                                <img 
                                  src={`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} 
                                  alt={book.title} 
                                  className={styles.bookCover}
                                />
                              ) : (
                                <div className={styles.noCover}>
                                  <i className="fas fa-book"></i>
                                </div>
                              )}
                            </div>
                            <h3 className={styles.bookTitle}>{book.title}</h3>
                          </a>
                          <div className={styles.bookInfo}>
                            {book.author_name && (
                              <p className={styles.bookAuthor}>
                                <span>Author:</span> {book.author_name.join(', ')}
                              </p>
                            )}
                            {book.first_publish_year && (
                              <p className={styles.bookYear}>
                                <span>First Published:</span> {book.first_publish_year}
                              </p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : searchInitiated && !hasMore && (
                    <div className={styles.noResults}>
                      <i className="fas fa-search"></i>
                      <p>No books found matching your search term.</p>
                      <p>Try using different keywords or check your spelling.</p>
                    </div>
                  )}
                </InfiniteScroll>
              )}
            </section>
          </div>
          <ScrollToTopButton />
        </div>
      );
    };

export default OpenLibrarySearch;
