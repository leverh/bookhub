import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/Profile.module.css";

const UserPasswordForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const currentUser = useCurrentUser();
  
  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });
  const { new_password1, new_password2 } = userData;
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };
  
  useEffect(() => {
    if (currentUser?.profile_id?.toString() !== id) {
      // redirect user if they are not the owner of this profile
      history.push("/");
    }
  }, [currentUser, history, id]);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.post("/dj-rest-auth/password/change/", userData);
      history.goBack();
    } catch (err) {
      // console.log(err);
      setErrors(err.response?.data);
    }
  };
  
  return (
    <div className={styles.formPageContainer}>
      <div className={styles.formWrapper}>
        <div className={styles.formContent}>
          <form onSubmit={handleSubmit} className={styles.simpleForm}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="new_password1">
                New password
              </label>
              <input
                id="new_password1"
                className={styles.formControl}
                placeholder="New password"
                type="password"
                value={new_password1}
                onChange={handleChange}
                name="new_password1"
              />
            </div>
            
            {errors?.new_password1?.map((message, idx) => (
              <div key={idx} className={styles.alert}>
                {message}
              </div>
            ))}
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="new_password2">
                Confirm password
              </label>
              <input
                id="new_password2"
                className={styles.formControl}
                placeholder="Confirm new password"
                type="password"
                value={new_password2}
                onChange={handleChange}
                name="new_password2"
              />
            </div>
            
            {errors?.new_password2?.map((message, idx) => (
              <div key={idx} className={styles.alert}>
                {message}
              </div>
            ))}
            
            <div className={styles.buttonGroup}>
              <button
                className={styles.cancelButton}
                type="button"
                onClick={() => history.goBack()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.saveButton}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserPasswordForm;