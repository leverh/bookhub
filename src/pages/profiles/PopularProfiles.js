import React from "react";
import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";
import styles from '../../styles/PopularProfiles.module.css';

const PopularProfiles = ({ mobile }) => {
  const { popularProfiles } = useProfileData();

  return (
    <Container
    className={`${appStyles.Content} ${mobile && "d-lg-none text-center mb-3"} ${styles.popularProfilesContainer}`}
>
      {popularProfiles.results.length ? (
        <>
          <h4 className={styles.popularUserHeader}>Our Users:</h4>
          {mobile ? (
            <div className={`${styles.profileContainer} ${mobile && styles.mobileProfileContainer}`}>
              {popularProfiles.results.slice(0, 4).map((profile) => (
                <Profile key={profile.id} profile={profile} mobile />
              ))}
            </div>
          ) : (
            popularProfiles.results.map((profile) => (
              <Profile className={styles.profileStyle} key={profile.id} profile={profile} />
            ))
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularProfiles;
