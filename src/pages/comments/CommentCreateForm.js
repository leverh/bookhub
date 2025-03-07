import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/CommentCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosReq } from "../../api/axiosDefaults";

function CommentCreateForm(props) {
  const { post, setPost, setComments, profileImage, profile_id } = props;
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('content', content);
      formData.append('post', post);
      const { data } = await axiosReq.post("/comments/", formData);
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      props.updateCommentCount();
      setPost((prevPost) => ({
        ...prevPost,
        comments_count: prevPost.comments_count + 1,
      }));
      setContent("");
    } catch (err) {
      // console.log(err);
    }
  };
  

  return (
    <form className={styles.commentForm} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <div className={styles.inputGroup}>
          <Link to={`/profiles/${profile_id}`} className={styles.avatarLink}>
            <Avatar src={profileImage} />
          </Link>
          <textarea
            className={styles.commentInput}
            placeholder="Write a comment..."
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </div>
      </div>
      <button
        className={styles.postButton}
        disabled={!content.trim()}
        type="submit"
      >
        Post
      </button>
    </form>
  );
}

export default CommentCreateForm;
