import React, { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Comment.module.css";
import CommentEditForm from "./CommentEditForm";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";

const Comment = (props) => {
  const { id, profile_id, profile_image, owner, updated_at, content, setComments } = props;
  const [showEditForm, setShowEditForm] = useState(false);

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosReq.delete(`/comments/${id}/`);
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
      props.decrementCommentCount();
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div className={styles.comment}>
      <Link to={`/profiles/${profile_id}`} className={styles.avatarLink}>
        <Avatar src={profile_image} />
      </Link>
      
      <div className={styles.commentBody}>
        <div className={styles.commentContainer}>
          <div className={styles.commentContent}>
            <span className={styles.owner}>{owner}</span>
            <span className={styles.date}>{updated_at}</span>
            
            {showEditForm ? (
              <CommentEditForm
                id={id}
                content={content}
                setComments={setComments}
                setShowEditForm={setShowEditForm}
              />
            ) : (
              <p className={styles.commentText}>{content}</p>
            )}
          </div>
          
          {is_owner && !showEditForm && (
            <MoreDropdown
              className={styles.moreDropdown}
              handleEdit={() => setShowEditForm(true)}
              handleDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};


export default Comment;
