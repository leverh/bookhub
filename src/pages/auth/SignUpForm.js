import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import { useRedirect } from "../../hooks/useRedirect";
import axios from "axios";
import { fetchCSRFToken } from "../../api/axiosDefaults"; // Import the function

const SignUpForm = () => {
  useRedirect("loggedIn");
  
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState({});
  const history = useHistory();

  // Fetch CSRF token when component mounts
  useEffect(() => {
    fetchCSRFToken();
  }, []);

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make sure to include withCredentials and content-type
      await axios.post("/dj-rest-auth/registration/", signUpData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      setShowSuccessModal(true);  
      setTimeout(() => {
        history.push("/signin");
      }, 2000);
    } catch (err) {
      console.error("Registration error:", err.response?.data);
      setErrors(err.response?.data);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <div className={styles.formCol}>
          <div className={styles.formContent}>
            <h1 className={styles.formHeader}>Join BookHub</h1>

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
                <label className={styles.srOnly} htmlFor="password1">
                  Password
                </label>
                <input
                  id="password1"
                  type="password"
                  placeholder="Password"
                  name="password1"
                  className={styles.formInput}
                  value={password1}
                  onChange={handleChange}
                />
              </div>
              
              {errors.password1?.map((message, idx) => (
                <div key={idx} className={styles.alert}>
                  {message}
                </div>
              ))}

              <div className={styles.formGroup}>
                <label className={styles.srOnly} htmlFor="password2">
                  Confirm password
                </label>
                <input
                  id="password2"
                  type="password"
                  placeholder="Confirm password"
                  name="password2"
                  className={styles.formInput}
                  value={password2}
                  onChange={handleChange}
                />
              </div>
              
              {errors.password2?.map((message, idx) => (
                <div key={idx} className={styles.alert}>
                  {message}
                </div>
              ))}

              <button
                className={styles.submitButton}
                type="submit"
              >
                Become a Member
              </button>
              
              {errors.non_field_errors?.map((message, idx) => (
                <div key={idx} className={styles.alert}>
                  {message}
                </div>
              ))}
            </form>
          </div>

          <div className={styles.linkContainer}>
            <Link className={styles.link} to="/signin">
              Already have an account? <span>Sign in</span>
            </Link>
          </div>
        </div>
        
        <div className={styles.imageCol}>
          <img
            className={styles.formImage}
            src={"https://res.cloudinary.com/dybqzflbo/image/upload/v1693318480/maarten-van-den-heuvel-0SYJS6nfR10-unsplash_wyunqy.jpg"}
            alt="Sign up page background"
          />
        </div>
      </div>
      
      {showSuccessModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Sign Up Successful</h2>
            </div>
            <div className={styles.modalBody}>
              You have successfully registered! Redirecting to the sign-in page...
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;