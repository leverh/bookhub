import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser, useSetCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/Profile.module.css";

const ProfileEditForm = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const history = useHistory();
  const imageFile = useRef();

  const [profileData, setProfileData] = useState({
    name: "",
    content: "",
    image: "",
  });
  const { name, content, image } = profileData;

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const { name, content, image } = data;
          setProfileData({ name, content, image });
        } catch (err) {
          // console.log(err);
          history.push("/");
        }
      } else {
        history.push("/");
      }
    };

    handleMount();
  }, [currentUser, history, id]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("content", content);

    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
      }));
      history.goBack();
    } catch (err) {
      // console.log(err);
      setErrors(err.response?.data);
    }
  };

  // Content fields that appear on both mobile and desktop
  const textFields = (
    <>
      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="content">My Story</label>
        <textarea
          id="content"
          className={styles.formControl}
          value={content}
          onChange={handleChange}
          name="content"
          rows={7}
        />
      </div>
      
      {errors?.content?.map((message, idx) => (
        <div className={styles.alert} key={idx}>
          {message}
        </div>
      ))}
      
      <div className={styles.buttonGroup}>
        <button
          className={styles.cancelButton}
          onClick={() => history.goBack()}
          type="button"
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
    </>
  );

  return (
    <form className={styles.editForm} onSubmit={handleSubmit}>
      <div className={styles.formContainer}>
        {/* Image Column */}
        <div className={styles.imageColumn}>
          <div className={styles.imageSection}>
            <div className={styles.formGroup}>
              {image && (
                <figure className={styles.imagePreview}>
                  <img src={image} alt="Profile preview" className={styles.previewImage} />
                </figure>
              )}
              
              {errors?.image?.map((message, idx) => (
                <div className={styles.alert} key={idx}>
                  {message}
                </div>
              ))}
              
              <div className={styles.uploadContainer}>
                <label
                  className={styles.uploadButton}
                  htmlFor="image-upload"
                >
                  Change the image
                </label>
                
                <input
                  id="image-upload"
                  className={styles.fileInput}
                  ref={imageFile}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files.length) {
                      setProfileData({
                        ...profileData,
                        image: URL.createObjectURL(e.target.files[0]),
                      });
                    }
                  }}
                />
              </div>
            </div>
            
            {/* Text fields for mobile view */}
            <div className={styles.mobileFormFields}>
              {textFields}
            </div>
          </div>
        </div>
        
        {/* Content Column - only visible on desktop */}
        <div className={styles.contentColumn}>
          <div className={styles.contentSection}>
            {textFields}
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProfileEditForm;