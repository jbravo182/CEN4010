
import React from "react";
import CommentComponent from "./CommentComponent";

export default function CommentList(props) {
  return (
    <div className="commentList">
      <h5 className="text-muted mb-4">
        <span>{props.comments.length}</span>{" "}
        Comment{props.comments.length !== 1 ? "s" : ""}
      </h5>

      {props.comments.length === 0 && !props.loading ? (
        <div style={{width: '350px'}} className="alert text-center alert-info">
          Be the first to comment
        </div>
      ) : null}

      {props.comments.map((comment, index) => (
        <CommentComponent key={index} comment={comment} />
      ))}
    </div>
  );
}