import { useEffect } from "react";
import Post from "../post/Post";
import "./posts.css";
import lottieFile from "../../assets/pulse.json";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../Redux/postSlice";
import Lottie from "lottie-react";
export default function Posts() {
  const dispatch = useDispatch();
  const { allPosts } = useSelector((state) => state.post);
  console.log(allPosts);
  useEffect(() => {
    dispatch(getPosts());
    console.log(allPosts);
  }, []);
  return (
    <div className="posts">
      {typeof allPosts?.response === "object" ? (
        allPosts.response.length > 0 ? (
          allPosts.response.map((e, i) => {
            return (
              <Post
                key={i}
                body={e.body}
                title={e.title}
                src={e.image}
                dateData={e.date}
                username={e.username}
              />
            );
          })
        ) : (
          <h1>No Posts yet :(</h1>
        )
      ) : (
        <Lottie animationData={lottieFile} loop id="loading" />
      )}
    </div>
  );
}
