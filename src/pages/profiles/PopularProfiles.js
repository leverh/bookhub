import React from "react";
import Asset from "../../components/Asset";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";
import styles from '../../styles/PopularProfiles.module.css';

const PopularProfiles = ({ mobile }) => {
  const { popularProfiles } = useProfileData();

  return (
    <div className={`${styles.popularProfilesContainer} ${mobile ? styles.mobileContainer : ""}`}>
      {popularProfiles && popularProfiles.results && popularProfiles.results.length ? (
        <>
          <h4 className={styles.popularUserHeader}>Our Users</h4>
          
          {mobile ? (
            <div className={styles.mobileProfilesGrid}>
              {popularProfiles.results.slice(0, 4).map((profile) => (
                <Profile key={profile.id} profile={profile} mobile />
              ))}
            </div>
          ) : (
            <div className={styles.profilesList}>
              {popularProfiles.results.map((profile) => (
                <Profile key={profile.id} profile={profile} />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className={styles.loaderContainer}>
          <Asset spinner />
        </div>
      )}
    </div>
  );
};

export default PopularProfiles;