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
// import BookOfTheWeek from "../../components/BookOfTheWeek";
// import { fetchBookOfTheWeek } from "../../api/bookAPI";
import LiteraryQuote from '../../pages/LiteraryQuote';
import ScrollToTopButton from '../../components/ScrollToTopButton';
import { demoReviews } from "../../data/demoData";

function ReviewsPage({ message, filter = "" }) {
  // Start with demo data
  const [reviews, setReviews] = useState(demoReviews);
  const [usingDemoData, setUsingDemoData] = useState(true);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      console.log("About to fetch, starting with demo data");
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        console.log("API response:", data);
        
        if (data.results && data.results.length > 0) {
          const firstReview = data.results[0];
          const isComplete = firstReview.title && 
                           firstReview.author_name && 
                           firstReview.content && 
                           firstReview.owner && 
                           firstReview.profile_image;
          
          console.log("First review:", firstReview);
          console.log("Is complete:", isComplete);
          
          if (isComplete) {
            console.log("Got good API data, replacing demo data");
            setReviews(data);
            setUsingDemoData(false);
          } else {
            console.log("API data incomplete, keeping demo data");
            const filteredDemoData = {
              ...demoReviews,
              results: demoReviews.results.filter(review => 
                query === "" || 
                review.title.toLowerCase().includes(query.toLowerCase()) ||
                review.author_name.toLowerCase().includes(query.toLowerCase()) ||
                review.content.toLowerCase().includes(query.toLowerCase())
              )
            };
            setReviews(filteredDemoData);
            setUsingDemoData(true);
          }
        } else {
          console.log("API data incomplete, keeping demo data");
          const filteredDemoData = {
            ...demoReviews,
            results: demoReviews.results.filter(review => 
              query === "" || 
              review.title.toLowerCase().includes(query.toLowerCase()) ||
              review.author_name.toLowerCase().includes(query.toLowerCase()) ||
              review.content.toLowerCase().includes(query.toLowerCase())
            )
          };
          setReviews(filteredDemoData);
          setUsingDemoData(true);
        }
      } catch (err) {
        console.log("API failed, keeping demo data");
        const filteredDemoData = {
          ...demoReviews,
          results: demoReviews.results.filter(review => 
            query === "" || 
            review.title.toLowerCase().includes(query.toLowerCase()) ||
            review.author_name.toLowerCase().includes(query.toLowerCase()) ||
            review.content.toLowerCase().includes(query.toLowerCase())
          )
        };
        setReviews(filteredDemoData);
        setUsingDemoData(true);
      }
    };

    if (query !== "" && usingDemoData) {
      const filteredDemoData = {
        ...demoReviews,
        results: demoReviews.results.filter(review => 
          review.title.toLowerCase().includes(query.toLowerCase()) ||
          review.author_name.toLowerCase().includes(query.toLowerCase()) ||
          review.content.toLowerCase().includes(query.toLowerCase())
        )
      };
      setReviews(filteredDemoData);
    } else if (query === "" && usingDemoData) {
      setReviews(demoReviews);
    }

    const timer = setTimeout(() => {
      fetchReviews();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, usingDemoData]); 
  return (
    <div className={styles.pageContainer}>
      <div className={styles.mainContent}>
        <div className={styles.leftColumn}>
          <div className={styles.mobileOnly}>
            <PopularProfiles mobile />
          </div>
          
          <div className={styles.searchContainer}>
            <form
              className={styles.searchForm}
              onSubmit={(event) => event.preventDefault()}
            >
              <div className={styles.searchInputWrapper}>
                <i className={`fas fa-search ${styles.searchIcon}`} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  type="text"
                  placeholder="Search reviews"
                  className={styles.searchInput}
                />
              </div>
            </form>
          </div>

          <LiteraryQuote />
          
          <div className={styles.reviewsContainer}>
            {reviews.results.length ? (
              usingDemoData ? (

                reviews.results.map((review) => (
                  <Review key={review.id} {...review} setReviews={setReviews} />
                ))
              ) : (

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
              )
            ) : (
              <div className={`${appStyles.Content} ${styles.noResults}`}>
                <Asset src={NoResults} message={message} />
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