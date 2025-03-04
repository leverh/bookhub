import React, { useState } from "react";
import { Modal, Button, Navbar, Container, Nav } from "react-bootstrap";
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
      <Navbar
        expanded={expanded}
        className={styles.NavBar}
        expand="md" 
      >
        <Container>
          <NavLink to="/" className="nav-link">
            <Navbar.Brand>
              <img src={logo} alt="BookHub logo" className="log-img" height="35" />
            </Navbar.Brand>
          </NavLink>
          {currentUser && addReviewIcon}
          <Navbar.Toggle
            ref={ref}
            onClick={() => setExpanded(!expanded)}
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={`ml-auto text-left navbar-special ${styles.Nav}`}>
              <NavLink
                exact
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/"
              >
                <span className={styles.NavLinkContent}>
                  <i className="fas fa-home"></i>Home
                </span>
              </NavLink>
              <NavLink
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/openlibrary-search"
              >
                <span className={styles.NavLinkContent}>
                  <i className="fas fa-search"></i>OpenLibrary Search
                </span>
              </NavLink>

              <NavLink
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/nyt-reviews"
              >
                <span className={styles.NavLinkContent}>
                  <i className="fas fa-newspaper"></i>NYT Reviews
                </span>
              </NavLink>

              <NavLink
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/about-us"
              >
                <span className={styles.NavLinkContent}>
                  <i className="fas fa-info-circle"></i>About Us
                </span>
              </NavLink>

              {currentUser ? loggedInIcons : loggedOutIcons}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal show={showModal} onHide={() => setShowModal(false)} className={styles.logoutModal}>
        <Modal.Header closeButton>
          <Modal.Title className={styles.Title}>Logged Out</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.Body}>You have been successfully logged out!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  };
export default NavBar;
