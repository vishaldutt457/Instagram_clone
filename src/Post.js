import React, { useState, useEffect } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "./firebase";
import firebase from "firebase";

function Post({ postId, username, caption, imageUrl, user }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              comment: doc.data(),
            }))
          );
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  const deleteComment = (id) => {
    db.collection("posts").doc(postId).collection("comments").doc(id).delete();
  };

  const deletePost = () => {
    db.collection("posts").doc(postId).delete();
  };

  return (
    <div className="post">
      <div className="post_header">
        <div className="post_headerUser">
          <Avatar
            className="post_avatar"
            alt="RafehQazi"
            src="/static/images/avatar/1.jpg"
          />
          <h3>{username}</h3>
        </div>
        {username === user?.displayName ? (
          <button className="post_deletePost" onClick={deletePost}>
            x
          </button>
        ) : (
          <div></div>
        )}
      </div>

      <img className="post_image" src={imageUrl} alt="" />

      <h4 className="post_text">
        <strong>{username}</strong> {caption}
      </h4>

      <div className="post_comments">
        {comments.map(({ id, comment }) => (
          <div className="post_comment">
            {comment.username === user?.displayName ? (
              <button
                className="post_deleteComment"
                onClick={() => deleteComment(id)}
              >
                X
              </button>
            ) : (
              <div></div>
            )}
            <p>
              <strong>{comment.username}</strong> {comment.text}
            </p>
          </div>
        ))}
      </div>
      {user && (
        <form className="post_commentBox">
          <input
            type="text"
            className="post_input"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post_button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;