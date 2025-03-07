import React, { useEffect, useState } from "react";
import Review from "./Review";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import styles from "../../styles/ReviewsPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
// import BookOfTheWeek from "../../components/BookOfTheWeek"; // Commented out
// import { fetchBookOfTheWeek } from "../../api/bookAPI"; // Commented out
import LiteraryQuote from '../../pages/LiteraryQuote';
import ScrollToTopButton from '../../components/ScrollToTopButton'


function ReviewsPage({ message, filter = "" }) {
  const [reviews, setReviews] = useState({ results: [], next: null });
  // const [bookOfTheWeek, setBookOfTheWeek] = useState(null); // Commented out
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        setReviews(data);
        setHasLoaded(true);
      } catch (err) {
        // console.error('Error fetching data:', err);
      }
    };

    /*
    const getBookOfTheWeek = async () => {
      try {
        const data = await fetchBookOfTheWeek();
        setBookOfTheWeek(data);
      } catch (error) {
        console.error("Error fetching Book of the Week:", error);
      }
    };
    */

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchReviews();
      // getBookOfTheWeek();  // Commented out
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.mainContent}>
        <div className={styles.leftColumn}>
          <div className={styles.mobileOnly}>
            <PopularProfiles mobile />
          </div>
          
          <div className={styles.searchContainer}>
            <i className={`fas fa-search ${styles.searchIcon}`} />
            <form 
              className={styles.searchBar}
              onSubmit={(event) => event.preventDefault()}
            >
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="text"
                placeholder="Search reviews"
                className={styles.searchInput}
              />
            </form>
          </div>

          <LiteraryQuote />
          
          <div className={styles.reviewsContainer}>
            {hasLoaded ? (
              <>
                {reviews.results.length ? (
                  <InfiniteScroll
                    dataLength={reviews.results.length}
                    next={() => fetchMoreData(reviews, setReviews)}
                    hasMore={!!reviews.next}
                    loader={<Asset spinner />}
                  >
                    {reviews.results.map((review) => (
                      <Review key={review.id} {...review} setReviews={setReviews} />
                    ))}
                  </InfiniteScroll>
                ) : (
                  <div className={`${appStyles.Content} ${styles.noResults}`}>
                    <Asset src={NoResults} message={message} />
                  </div>
                )}
              </>
            ) : (
              <div className={`${appStyles.Content} ${styles.loadingContainer}`}>
                <Asset spinner />
              </div>
            )}
          </div>
        </div>
        
        <div className={styles.rightColumn}>
          <PopularProfiles />
        </div>
      </div>
      
      <ScrollToTopButton />
    </div>
  );
}

export default ReviewsPage;