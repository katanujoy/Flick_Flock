// import "../styles/Movies.css";

// function ReviewCard({ review }) {
//   return (
//     <div className="review-card">
//       <p className="review-content">“{review.content}”</p>
//       <div className="review-meta">
//         <span>User ID: {review.user_id}</span>
//         <span>⭐ {review.rating}/10</span>
//         <span>{review.created_at}</span>
//       </div>
//     </div>
//   );
// }

// export default ReviewCard;

import { useState } from "react";
import { useApi } from "../contexts/globalendpoints";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../styles/Movies.css";

function ReviewCard({ review, onDelete, onEdit }) {
  const api = useApi();
  const [editing, setEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(review.content);

  const handleDelete = () => {
    api.deleteRecommendation(review.id)
      .then(res => res.ok && onDelete(review.id));
  };

  const handleEdit = () => {
    api.updateRecommendation(review.id, { content: updatedContent })
      .then(res => res.ok && res.json())
      .then(updated => {
        onEdit(updated);
        setEditing(false);
      });
  };

  return (
    <div className="review-card">
      <div className="review-top-row">
        {editing ? (
          <textarea
            className="review-edit-box"
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
          />
        ) : (
          <p className="review-content">“{review.content}”</p>
        )}

        <div className="review-icons">
          {editing ? (
            <button onClick={handleEdit} title="Save" className="icon-btn">💾</button>
          ) : (
            <button onClick={() => setEditing(true)} title="Edit" className="icon-btn">
              <FaEdit />
            </button>
          )}
          <button onClick={handleDelete} title="Delete" className="icon-btn">
            <FaTrash />
          </button>
        </div>
      </div>

      <div className="review-meta">
        <span>User ID: {review.user_id}</span>
        <span>⭐ {review.rating}/10</span>
        <span>{new Date(review.created_at).toLocaleString()}</span>
      </div>
    </div>
  );
}

export default ReviewCard;