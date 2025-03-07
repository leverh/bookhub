import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Review from "./Review";
import Comment from "../comments/Comment";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import styles from "../../styles/ReviewPage.module.css";

function ReviewPage() {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: review }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        console.log(review)
        setReview({ results: [review] });
        setComments(comments);
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [id]);

  const updateCommentCount = () => {
    setReview((prevReview) => ({
      ...prevReview,
      results: [
        {
          ...prevReview.results[0],
          comments_count: prevReview.results[0].comments_count + 1,
        },
        ...prevReview.results.slice(1),
      ],
    }));
  };

  const decrementCommentCount = () => {
    setReview((prevReview) => ({
        ...prevReview,
        results: [
            {
                ...prevReview.results[0],
                comments_count: prevReview.results[0].comments_count - 1,
            },
            ...prevReview.results.slice(1),
        ],
    }));
};

  

return (
  <div className={styles.reviewPageContainer}>
    <div className={styles.mainContent}>
      <div className={styles.leftColumn}>
        <div className={styles.mobileProfilesWrapper}>
          <PopularProfiles mobile />
        </div>
        
        {review && <Review {...review.results[0]} setReview={setReview} reviewPage />}
        
        <div className={styles.commentsSection}>
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              post={id}
              setPost={setReview}
              setComments={setComments}
              updateCommentCount={updateCommentCount}
            />
          ) : comments.results.length ? (
            <h3 className={styles.commentsHeader}>Comments</h3>
          ) : null}
          
          {comments.results.length ? (
            <InfiniteScroll
              children={comments.results.map((comment) => (
                <Comment
                  key={comment.id}
                  {...comment}
                  setPost={setReview}
                  setComments={setComments}
                  decrementCommentCount={decrementCommentCount}
                />
              ))}
              dataLength={comments.results.length}
              loader={<Asset spinner />}
              hasMore={!!comments.next}
              next={() => fetchMoreData(comments, setComments)}
            />
          ) : currentUser ? (
            <p className={styles.noComments}>No comments yet, but you could be the first one to comment!</p>
          ) : (
            <p className={styles.noComments}>No comments yet!</p>
          )}
        </div>
      </div>
      
      <div className={styles.rightColumn}>
        <PopularProfiles />
      </div>
    </div>
  </div>
);}

export default ReviewPage;
