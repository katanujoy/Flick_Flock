import { useState } from "react";
import "../styles/RecommendModal.css";

function RecommendModal({ onClose, onSubmit }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    onSubmit(text);
    setText("");
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="recommend-modal">
        <h3>Why do you recommend this?</h3>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your reason..."
        />
        <div className="modal-buttons">
          <button onClick={handleSubmit}>Submit</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default RecommendModal;
