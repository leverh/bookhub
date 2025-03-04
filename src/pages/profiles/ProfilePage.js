import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button, Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import PopularProfiles from "./PopularProfiles";
import InfiniteScroll from "react-infinite-scroll-component";
import Review from "../posts/Review";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.png";
import { ProfileEditDropdown } from "../../components/MoreDropdown";
import btnStyles from "../../styles/Button.module.css";
import profileStyles from '../../styles/ProfilePage.module.css';


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

  const mainProfile = (
    <>
      
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
        <Image
        className={profileStyles.ProfileImage}
        src={profile?.image}
/>

        </Col>
        <Col lg={6}>
  <div className="d-flex align-items-center">
    <h3 className="m-2">{profile?.owner}</h3>
    {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
  </div>
            <Row className={`justify-content-center no-gutters ${profileStyles.counterContainer}`}>

            <Col xs={3} className="my-2">
              <div className={profileStyles.postsCount}>
              {profile?.posts_count}</div>
              <div className={profileStyles.postsLabel}>reviews</div>
            </Col>
            <Col xs={3} className="my-2">
              <div className={profileStyles.followersCount}>
                {profile?.followers_count}</div>
              <div className={profileStyles.followersLabel}>followers</div>
            </Col>
            <Col xs={3} className="my-2">
              <div className={profileStyles.followingCount}>
                {profile?.following_count}</div>
              <div className={profileStyles.followingLabel}>following</div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-lg-right">
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button
                className={btnStyles.Button}
                onClick={() => handleUnfollow(profile)}
              >
                unfollow
              </Button>
            ) : (
              <Button
                className={btnStyles.Button}
                onClick={() => handleFollow(profile)}
              >
                follow
              </Button>
            ))}
        </Col>
        {profile?.content && <Col className={`${profileStyles.content} p-3`}>{profile.content}</Col>}

      </Row>
    </>
  );
  
  const mainProfileReviews = (
    <>
      <hr />
      <p className="text-center">{profile?.owner}'s reviews</p>
      <hr />
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
        <Asset
          src={NoResults}
          message={`No results found, ${profile?.owner} hasn't posted any review yet.`}
        />
      )}
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              <div className={profileStyles.flexContainer}>
              {mainProfileReviews}
              </div>
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ProfilePage;
