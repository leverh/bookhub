import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser, useSetCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/Profile.module.css";

const UsernameForm = () => {
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  useEffect(() => {
    if (currentUser?.profile_id?.toString() === id) {
      setUsername(currentUser.username);
    } else {
      history.push("/");
    }
  }, [currentUser, history, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put("/dj-rest-auth/user/", { username });
      setCurrentUser((prevUser) => ({ ...prevUser, username }));
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
              <label className={styles.formLabel} htmlFor="username">
                Change username
              </label>
              <input
                id="username"
                className={styles.formControl}
                placeholder="Username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            
            {errors?.username?.map((message, idx) => (
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
                className={styles.saveButton}
                type="submit"
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

export default UsernameForm;