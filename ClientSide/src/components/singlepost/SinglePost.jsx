import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./singlePost.css";
import { deletePost, editPost, getUserPosts } from "../../Redux/postSlice";

export default function SinglePost({
  id,
  title,
  body,
  src,
  trigger,
  setTrigger,
}) {
  const [editBody, setEditBody] = useState(body);
  const [editTitle, setEditTitle] = useState(title);
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const { editResponse } = useSelector((state) => state.post);
  const handleEdit = () => {
    const data = {
      title: editTitle,
      body: editBody,
    };
    dispatch(editPost({ postId: id, data }));
    dispatch(getUserPosts());
    setTrigger(!trigger);
  };
  const handleDelete = () => {
    dispatch(deletePost(id));
    dispatch(getUserPosts());
    setTrigger(!trigger);
  };
  useEffect(() => {
    console.log(editResponse);
  }, []);
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img className="singlePostImg" src={src} alt="post-image" />
        <h1 className={edit ? "hidden" : "singlePostTitle"}>{editTitle}</h1>
        <div id="edit-title-cont">
          <input
            type="text"
            name="edit"
            className={edit ? "edit-title-input" : "hidden"}
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
        </div>

        <div className="singlePostEdit">
          <i
            className={edit ? "hidden" : "singlePostIcon far fa-edit"}
            onClick={() => {
              setEdit(!edit);
            }}
          ></i>
          <i
            className={edit ? "hidden" : "singlePostIcon far fa-trash-alt"}
            onClick={handleDelete}
          ></i>
          <button
            className={edit ? "edit-btn" : "hidden"}
            onClick={() => {
              handleEdit();
              setEdit(!edit);
            }}
          >
            save
          </button>
        </div>
        <div className="singlePostInfo">
          {/*                     <span className="singlePostAuthor">
                        Author : <b>AAM</b>
                    </span> */}
        </div>
        <p className={edit ? "hidden" : "singlePostDesc"}>{editBody}</p>
        <div id="edit-body-cont">
          <textarea
            type="text"
            name="edit"
            className={edit ? "edit-body-input" : "hidden"}
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
