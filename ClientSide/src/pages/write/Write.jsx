import TopBar from "../../components/Topbar/TopBar";
import "./write.css";
import Lottie from "lottie-react";
import lottieFile from "../../assets/animation_log6eie9.json";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../Redux/postSlice";
import { useNavigate } from "react-router-dom";

export default function Write() {
  const [postImage, setPostImage] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [formValidationStat, setFormValidationStat] = useState({});
  const dispatch = useDispatch();
  const { newPostResponse } = useSelector((stat) => stat.post.newPost);
  const navigate = useNavigate();


  const handleFile = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setPostImage(reader.result);
    };
  };
  const validateForm = () => {
    let isValid = true;
    const newFormValidationStat = {};
    if (title.length === 0) {
      newFormValidationStat.title = "Title is required";
      isValid = false;
    } 
    if (body.length === 0) {
      newFormValidationStat.body = "Empty body is not allowed";
      isValid = false;
    } 
    if (postImage === null) {
      newFormValidationStat.postImage =
        "you must add image to represent your post";
      isValid = false;
    }
    setFormValidationStat(newFormValidationStat);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("current_token");
    const userId = JSON.parse(localStorage.getItem("current_user"))?.user?._id;
    if (typeof token !== null && typeof userId !== null && validateForm()) {
      const data = { title, body, userId, postImage };
      dispatch(addPost({ token, data }));
    }
  };

  const checkNewPostResponse = () => {
    if (newPostResponse?.response === "jwt expired") {
      localStorage.clear();
      navigate("/");
      window.location.reload();
    }
    if (newPostResponse?.response === "Success") {
      setFormValidationStat({ success: "Your Post have been Published" });
      setTitle("");
      setBody("");
      setPostImage(null);
      setTimeout(() => {
        setFormValidationStat({});
      }, 2000);
    }
  };
  useEffect(() => {
    checkNewPostResponse();
    console.log(newPostResponse?.response);
  }, [newPostResponse]);
  return (
    <>
      <TopBar />
      <div className="write">
        <Lottie animationData={lottieFile} id="lottie" />
        <form className="writeForm" onSubmit={handleSubmit}>
          <div className="writeFormGroup" id="image-cont">
            <label htmlFor="fileInput">
              <i className="writeIcon fas fa-plus"></i>
            </label>
            <span id="uploaded">{postImage ? "Uploaded ✔" : null}</span>
            <input
              type="file"
              id="fileInput"
              accept=".jpg,.jpeg,.png,.gif"
              style={{ display: "none" }}
              onChange={handleFile}
            />
          </div>
          <div className="writeFormGroup" id="write-post">
            <input
              type="text"
              placeholder="Title"
              className="writeInput"
              autoFocus={true}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Tell your story...."
              type="text"
              className="writeInput writeText"
              id="post-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </div>
          <div id="btn-cont">
            <button className="writeSubmit">Publish</button>
          </div>
        </form>
        <div id="status-cont">
          <span id="success">{formValidationStat.success}</span>
          <span className="error">{formValidationStat.title}</span>
          <span className="error">{formValidationStat.body}</span>
          <span className="error">{formValidationStat.postImage}</span>
        </div>
      </div>
    </>
  );
}
