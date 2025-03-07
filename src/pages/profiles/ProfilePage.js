import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Asset from "../../components/Asset";
import styles from "../../styles/Profile.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import PopularProfiles from "./PopularProfiles";
import InfiniteScroll from "react-infinite-scroll-component";
import Review from "../posts/Review";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.png";
import { ProfileEditDropdown } from "../../components/MoreDropdown";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profileReviews, setProfileReviews] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const { id } = useParams();

  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();

  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profileReviews }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/posts/?owner__profile=${id}`),
          ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfileReviews(profileReviews);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  return (
    <div className={styles.profilePageContainer}>
      <div className={styles.mainContent}>
        <div className={styles.leftColumn}>
          <div className={styles.mobileOnly}>
            <PopularProfiles mobile />
          </div>
          
          <div className={styles.profileContainer}>
            {hasLoaded ? (
              <>
                {/* Profile Header Section */}
                <div className={styles.profileHeader}>
                  <div className={styles.profileImageContainer}>
                    <img
                      className={styles.profileImage}
                      src={profile?.image}
                      alt={`${profile?.owner}'s profile`}
                    />
                  </div>
                  
                  <div className={styles.profileInfo}>
                    <div className={styles.nameContainer}>
                      <h3 className={styles.profileName}>{profile?.owner}</h3>
                      {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
                    </div>
                    
                    <div className={styles.statsContainer}>
                      <div className={styles.statItem}>
                        <div className={styles.statCount}>{profile?.posts_count}</div>
                        <div className={styles.statLabel}>reviews</div>
                      </div>
                      <div className={styles.statItem}>
                        <div className={styles.statCount}>{profile?.followers_count}</div>
                        <div className={styles.statLabel}>followers</div>
                      </div>
                      <div className={styles.statItem}>
                        <div className={styles.statCount}>{profile?.following_count}</div>
                        <div className={styles.statLabel}>following</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.actionContainer}>
                    {currentUser &&
                      !is_owner &&
                      (profile?.following_id ? (
                        <button
                          className={`${styles.followButton} ${styles.unfollowButton}`}
                          onClick={() => handleUnfollow(profile)}
                        >
                          unfollow
                        </button>
                      ) : (
                        <button
                          className={styles.followButton}
                          onClick={() => handleFollow(profile)}
                        >
                          follow
                        </button>
                      ))}
                  </div>
                </div>
                
                {/* Profile Bio */}
                {profile?.content && (
                  <div className={styles.profileBio}>
                    {profile.content}
                  </div>
                )}
                
                {/* Profile Reviews */}
                <div className={styles.profileReviews}>
                  <div className={styles.reviewsHeader}>
                    <div className={styles.divider}></div>
                    <h4 className={styles.reviewsTitle}>{profile?.owner}'s reviews</h4>
                    <div className={styles.divider}></div>
                  </div>
                  
                  {profileReviews.results.length ? (
                    <InfiniteScroll
                      children={profileReviews.results.map((review) => (
                        <Review key={review.id} {...review} setReviews={setProfileReviews} />
                      ))}
                      dataLength={profileReviews.results.length}
                      loader={<Asset spinner />}
                      hasMore={!!profileReviews.next}
                      next={() => fetchMoreData(profileReviews, setProfileReviews)}
                    />
                  ) : (
                    <div className={styles.noResults}>
                      <img src={NoResults} alt="No results" className={styles.noResultsImage} />
                      <p className={styles.noResultsMessage}>
                        No results found, {profile?.owner} hasn't posted any review yet.
                      </p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className={styles.loaderContainer}>
                <Asset spinner />
              </div>
            )}
          </div>
        </div>
        
        <div className={styles.rightColumn}>
          <PopularProfiles />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;