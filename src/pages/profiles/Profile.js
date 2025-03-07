import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Profile.module.css";
import { useSetProfileData } from "../../contexts/ProfileDataContext";

const Profile = (props) => {
  const { profile, imageSize = 55 } = props;
  const { id, image, owner, following_id } = profile;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const { handleFollow, handleUnfollow } = useSetProfileData();

  return (
    <div className={styles.profileItem}>
      <Link className={styles.profileLink} to={`/profiles/${id}`}>
        <Avatar src={image} height={imageSize} />
        <div className={styles.usernameContainer}>
          <strong className={styles.username}>{owner}</strong>
        </div>
      </Link>
      <div className={styles.buttonContainer}>
        {currentUser && !is_owner && (
          <button
            className={`${styles.followButton} ${following_id ? styles.unfollowButton : ''}`}
            onClick={() => {
              if (following_id) {
                handleUnfollow(profile);
              } else {
                handleFollow(profile);
              }
            }}
          >
            {following_id ? "unfollow" : "follow"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;