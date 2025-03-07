import React, { useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/CommentCreateEditForm.module.css";

function CommentEditForm(props) {
  const { id, content, setShowEditForm, setComments } = props;
  const [formContent, setFormContent] = useState(content);

  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('content', formContent.trim());
      const { data } = await axiosReq.put(`/comments/${id}/`, formData);
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                content: formContent.trim(),
                updated_at: "now",
              }
            : comment;
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
      // console.log(err);
      // console.log(err.response.data);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className={styles.editForm}>
      <div className={styles.editFormGroup}>
        <textarea
          className={styles.editInput}
          value={formContent}
          onChange={handleChange}
          rows={2}
        />
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={styles.cancelButton}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          Cancel
        </button>
        <button
          className={styles.saveButton}
          disabled={!formContent.trim()}
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default CommentEditForm;
