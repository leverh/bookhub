import React from "react";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { Button } from "react-bootstrap";
import styles from "../../styles/Profile.module.css";
import { useSetProfileData } from "../../contexts/ProfileDataContext";

const Profile = (props) => {
  const { profile, imageSize = 55 } = props;
  const { id, image, owner, following_id } = profile;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const { handleFollow, handleUnfollow } = useSetProfileData();

return (
  <div className="my-3 d-flex align-items-center justify-content-between">
    <Link className="align-self-center d-flex align-items-center" to={`/profiles/${id}`}>

      {/* Avatar */}
      <Avatar src={image} height={imageSize} />
    
      <div className={`mx-2 ${styles.WordBreak} flex-grow-1`}>
        <strong className={styles.username}>{owner}</strong>
      </div>
    </Link>

    <div>
        {currentUser && !is_owner && (
          <Button
          className={`${btnStyles.Button} ${
            following_id ? btnStyles.BlackOutline : btnStyles.Black
        } ${styles.fixedWidthButton} ${styles.stretchedTextButton}`}
            onClick={() => {
              if (following_id) {
                handleUnfollow(profile);
              } else {
                handleFollow(profile);
              }
            }}
          >
            {following_id ? "unfollow" : "follow"}
          </Button>
        )}
      </div>
    </div>
  );

};

export default Profile;