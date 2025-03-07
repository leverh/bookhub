import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";

function SignInForm() {
  const setCurrentUser = useSetCurrentUser();
  useRedirect("loggedIn");
  
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData;
  
  const [errors, setErrors] = useState({});
  const history = useHistory();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      history.goBack();
    } catch (err) {
      setErrors(err.response?.data);
    }
  };
  
  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };
  
  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <div className={styles.formCol}>
          <div className={styles.formContent}>
            <h1 className={styles.formHeader}>BookHub Member Login</h1>
            
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.srOnly} htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Username"
                  name="username"
                  className={styles.formInput}
                  value={username}
                  onChange={handleChange}
                />
              </div>
              
              {errors.username?.map((message, idx) => (
                <div key={idx} className={styles.alert}>
                  {message}
                </div>
              ))}
              
              <div className={styles.formGroup}>
                <label className={styles.srOnly} htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  className={styles.formInput}
                  value={password}
                  onChange={handleChange}
                />
              </div>
              
              {errors.password?.map((message, idx) => (
                <div key={idx} className={styles.alert}>
                  {message}
                </div>
              ))}
              
              <button
                className={styles.submitButton}
                type="submit"
              >
                Login
              </button>
              
              {errors.non_field_errors?.map((message, idx) => (
                <div key={idx} className={styles.alert}>
                  {message}
                </div>
              ))}
            </form>
          </div>
          
          <div className={styles.linkContainer}>
            <Link className={styles.link} to="/signup">
              New to BookHub? <span>Create an account!</span>
            </Link>
          </div>
        </div>
        
        <div className={styles.imageCol}>
          <img
            className={styles.formImage}
            src={"https://res.cloudinary.com/dybqzflbo/image/upload/v1693341591/clay-banks-w_qTfiPbjbg-unsplash_iqsnpw.jpg"}
            alt="Sign in page background"
          />
        </div>
      </div>
    </div>
  );
}

export default SignInForm;