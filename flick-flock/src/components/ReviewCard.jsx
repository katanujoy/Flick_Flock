import { useState } from "react";
import { useApi } from "../contexts/globalendpoints";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../styles/Movies.css";

function ReviewCard({ review, onDelete, onEdit }) {
  const api = useApi();
  const [editing, setEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(review.recommended_reason);

  const handleDelete = async () => {
    try {
      await api.deleteRecommendation(review.id);
      onDelete(review.id);
    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  };

  const handleEdit = async () => {
    try {
      const updated = await api.updateRecommendation(review.id, {
        recommended_reason: updatedText,
      });
      onEdit(updated);
      setEditing(false);
    } catch (err) {
      console.error("Edit failed:", err.message);
    }
  };

  return (
    <div className="review-card">
      <div className="review-top-row">
        {editing ? (
          <textarea
            className="review-edit-box"
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
          />
        ) : (
          <p className="review-content">“{review.recommended_reason}”</p>
        )}
        <div className="review-icons">
          {editing ? (
            <button onClick={handleEdit} title="Save" className="icon-btn">
              💾
            </button>
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
        <span>{new Date(review.created_at).toLocaleString()}</span>
      </div>
    </div>
  );
}

export default ReviewCard;
