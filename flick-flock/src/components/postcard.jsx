import { FaEdit, FaTrash } from "react-icons/fa";

function PostCard({ post, onEdit, onDelete }) {
  const handleEdit = () => onEdit?.(post);
  const handleDelete = () => onDelete?.(post.id);

  return (
    <div className="bg-white shadow p-3 rounded mb-3">
      <div className="flex justify-between">
        <p className="text-gray-800 font-medium">{post.content}</p>
        <div className="flex space-x-2">
          <FaEdit
            className="text-blue-500 hover:text-blue-700 cursor-pointer"
            onClick={handleEdit}
          />
          <FaTrash
            className="text-red-500 hover:text-red-700 cursor-pointer"
            onClick={handleDelete}
          />
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-1">
        Posted by User #{post.user_id} on {new Date(post.created_at).toLocaleDateString()}
      </p>
    </div>
  );
}

export default PostCard;
