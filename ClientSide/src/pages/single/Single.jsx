import { useEffect, useState } from "react";
import TopBar from "../../components/Topbar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlepost/SinglePost";
import "./single.css";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../Redux/userSlice";
import { getPosts, getUserPosts } from "../../Redux/postSlice";
import { Link, useNavigate } from "react-router-dom";
import PopUp from "../../components/PopUp/PopUp";

export default function Single() {
  const { userPosts } = useSelector((state) => state.post);
  const [trigger,setTrigger] = useState(true)
  console.log(userPosts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUserPosts());
    console.log('triggered')
  }, [trigger]);
  return (
    <>
      <TopBar />
      <div className="single">
        {typeof userPosts?.response === "object" ? (
          userPosts?.response?.length > 0 ? (
            userPosts.response.map((e, i) => {
              console.log(e)
              return (
                <SinglePost
                  key={i}
                  id={e.id}
                  body={e.body}
                  title={e.title}
                  src={e.image}
                  setTrigger={setTrigger}
                  trigger={trigger}
                />
              );
            })
          ) : (
            <>
              <p>No Posts For you Yet </p>
              <Link to="/">Back to Home</Link>
            </>
          )
        ) : null}
      </div>
    </>
  );
}
