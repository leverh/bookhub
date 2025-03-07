import React, { useState } from "react";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const [showModal, setShowModal] = useState(false);

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

    const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      setShowModal(true);
    } catch (err) {
      // console.log(err);
    }
  };

  const addReviewIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/reviews/create"
    >
      <span className={styles.NavLinkContent}>
        <i className="far fa-plus-square"></i>Add review
      </span>
    </NavLink>
  );

  const loggedInIcons = (
    <>
      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        <span className={styles.NavLinkContent}>
          <i className="fas fa-sign-out-alt"></i>Sign out
        </span>
      </NavLink>
      <NavLink
        className={`${styles.NavLink} ${styles.ProfileLink}`}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <span className={`{styles.NavLinkContent} ${styles.ProfileLink}`}>
          <Avatar className={styles.Avatar} src={currentUser?.profile_image} text="Profile" height={40} />
        </span>
      </NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        <span className={styles.NavLinkContent}>
          <i className="fas fa-sign-in-alt"></i>Sign in
        </span>
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <span className={styles.NavLinkContent}>
          <i className="fas fa-user-plus"></i>Sign up
        </span>
      </NavLink>
    </>
  );

  return (
    <>
      <nav className={styles.navBar} ref={ref}>
        <div className={styles.container}>
          <div className={styles.navLeft}>
            <NavLink to="/" className={styles.logoLink}>
              <img src={logo} alt="BookHub logo" className={styles.logo} />
            </NavLink>
            {currentUser && addReviewIcon}
          </div>
          
          <button 
            className={styles.menuToggle}
            onClick={() => setExpanded(!expanded)}
            aria-label="Toggle navigation menu"
          >
            <i className="fas fa-bars"></i>
          </button>
          
          <div className={`${styles.navMenu} ${expanded ? styles.expanded : ''}`}>
            <div className={styles.navLinks}>
              <NavLink
                exact
                className={styles.navLink}
                activeClassName={styles.active}
                to="/"
              >
                <span className={styles.navLinkContent}>
                  <i className="fas fa-home"></i>Home
                </span>
              </NavLink>
              
              <NavLink
                className={styles.navLink}
                activeClassName={styles.active}
                to="/openlibrary-search"
              >
                <span className={styles.navLinkContent}>
                  <i className="fas fa-search"></i>OpenLibrary Search
                </span>
              </NavLink>
  
              <NavLink
                className={styles.navLink}
                activeClassName={styles.active}
                to="/nyt-reviews"
              >
                <span className={styles.navLinkContent}>
                  <i className="fas fa-newspaper"></i>NYT Reviews
                </span>
              </NavLink>
  
              <NavLink
                className={styles.navLink}
                activeClassName={styles.active}
                to="/about-us"
              >
                <span className={styles.navLinkContent}>
                  <i className="fas fa-info-circle"></i>About Us
                </span>
              </NavLink>
  
              {currentUser ? loggedInIcons : loggedOutIcons}
            </div>
          </div>
        </div>
      </nav>
      
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Logged Out</h2>
              <button className={styles.modalClose} onClick={() => setShowModal(false)}>
                &times;
              </button>
            </div>
            <div className={styles.modalBody}>
              You have been successfully logged out!
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.modalButton} onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
