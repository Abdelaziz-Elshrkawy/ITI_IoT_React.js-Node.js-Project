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
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { newPostResponse } = useSelector((stat) => stat.post.newPost);
  const navigate = useNavigate()

  const handleFile = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    console.log(e.target.files[0]);
    reader.onload = () => {
      setPostImage(reader.result);
    };
  };

 const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("current_token");
    const userId = JSON.parse(localStorage.getItem("current_user")).user._id;
    const newErrors = {};
    if (title) {
    }
    if (typeof token !== null && typeof userId !== null) {
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
  }
  useEffect(() => {
    checkNewPostResponse();
    console.log(newPostResponse?.response);
  }, [newPostResponse]);
  return (
    <>
      <TopBar />
      <div className="write">
        <Lottie animationData={lottieFile} id="lottie" />
        <form className="witeForm" onSubmit={handleSubmit}>
          <div className="writeFormGroup">
            <label htmlFor="fileInput">
              <i className="writeIcon fas fa-plus"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              accept=".jpg,.jpeg,.png,.gif"
              style={{ display: "none" }}
              onChange={handleFile}
            />
            <input
              type="text"
              placeholder="Title"
              className="writeInput"
              autoFocus={true}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="writeFormGroup">
            <textarea
              placeholder="Tell your story...."
              typeof="text"
              className="writeInput writeText"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </div>
          <button className="writeSubmit">Publish</button>
        </form>
      </div>
    </>
  );
}
