import { useEffect } from "react";
import Post from "../post/Post";
import "./posts.css";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../Redux/postSlice";
export default function Posts() {
  const dispatch = useDispatch();
  const {posts, loading} = useSelector((state) => state.post);
  console.log(posts);
  useEffect(() => {
    dispatch(getPosts());
  }, []);
  return (
    <div className="posts">
      {!loading ? (
        posts.response.length > 0 ? (
          posts.response.map((e, i) => {
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
        "Loading....."
      )}
    </div>
  );
}
