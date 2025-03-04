import React, { useState } from 'react';
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import ReviewCreateForm from "./pages/posts/ReviewCreateForm";
import ReviewPage from "./pages/posts/ReviewPage";
import ReviewsPage from "./pages/posts/ReviewsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import ReviewEditForm from "./pages/posts/ReviewEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import OpenLibrarySearch from './pages/OpenLibrarySearch';
import NYTReviews from './pages/NYTReviews';
import FloatingFooterButton from "./components/FloatingFooterButton"
import FooterModal from './components/FooterModal';
import AboutUs from './pages/AboutUs';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {  // toggle modal visibility
    setShowModal(!showModal);
  };

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <ReviewsPage message="No results found. Adjust the search keyword." />
            )}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              <ReviewsPage
                message="No results found. Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/liked"
            render={() => (
              <ReviewsPage
                message="No results found. Adjust the search keyword or like a review."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/reviews/create" render={() => <ReviewCreateForm />} />
          <Route exact path="/reviews/:id" render={() => <ReviewPage />} />
          <Route exact path="/reviews/edit/:id" render={() => <ReviewEditForm />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route exact path="/profiles/:id/edit/username" render={() => <UsernameForm />}/>
          <Route exact path="/profiles/:id/edit/password" render={() => <UserPasswordForm />}/>
          <Route exact path="/profiles/:id/edit" render={() => <ProfileEditForm />}/>
          {/* <Route exact path="/test-logged-out" render={() => <p>Test: Logged Out</p>} />
          <Route exact path="/test-logged-in" render={() => <p>Test: Logged In</p>} /> */}
          <Route exact path="/openlibrary-search" component={OpenLibrarySearch} />
          <Route exact path="/nyt-reviews" component={NYTReviews} />
          <Route exact path="/about-us" component={AboutUs} />

          <Route component={NotFoundPage} />
        </Switch>
      </Container>
      <FloatingFooterButton onClick={toggleModal} /> 
      <FooterModal show={showModal} handleClose={toggleModal} />
    </div>
  );
}

export default App;
