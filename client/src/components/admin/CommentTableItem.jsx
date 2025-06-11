import React, { useEffect } from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const CommentTableItem = ({ comment, fetchComment }) => {
  const { blog, createdAt, _id } = comment;
  const commentDate = new Date(createdAt);
  const { axios } = useAppContext();

  const approvedComment = async () => {
    try {
      const { data } = await axios.post("/api/admin/approve-comment", {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchComment();
      } else {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteComment = async () => {
    const confirm = window.confirm("Are you sure to delete this comment 💀");
    if (!confirm) {
      return;
    }

    try {
      const { data } = await axios.post("/api/admin/delete-comment", {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchComment();
      } else {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchComment();
  }, []);

  return (
    <>
      <tr className="border border-y-2">
        <td className="px-6 py-4 text-gray-600">
          <b>Blog :</b> {blog.title}
          <br />
          <br />
          <b>Name :</b> {comment.name}
          <br />
          <b>Comment :</b> {comment.content}
          <br />
        </td>
        <td className="px-6 py-4 text-gray-600 max-sm:hidden">
          {commentDate.toLocaleDateString()}
        </td>
        <td className="px-6 py-4 text-gray-600">
          <div className="flex gap-4">
            {!comment.isApproved ? (
              <img
                onClick={approvedComment}
                className="w-5 hover:scale-110 transition-all cursor-pointer"
                src={assets.tick_icon}
                alt=""
              />
            ) : (
              <p className="text-xs border p-0.5 px-1 border-green-100 bg-green-100 rounded-lg">
                Approved
              </p>
            )}
            <img
              onClick={deleteComment}
              className="w-5 hover:scale-110 transition-all cursor-pointer"
              src={assets.bin_icon}
              alt=""
            />
          </div>
        </td>
      </tr>
    </>
  );
};

export default CommentTableItem;
