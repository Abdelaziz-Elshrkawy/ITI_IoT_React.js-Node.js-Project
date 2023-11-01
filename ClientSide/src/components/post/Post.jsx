import './post.css';

export default function Post({ title, body, src, dateData, username }) {
    const date = dateData.split("T")[0];
    console.log(dateData)
    const time = dateData.split("T")[1].split(".")[0].split(':');
  const amPmCheck = time[0] > 12
    return (
      <div className="post">
        <img className="postImg" src={src} alt="pr" />
        <div className="postInfo">
          <span className="postTitle">{title}</span>
          <hr />
          <span className="postDate">{`Written by: ${username} - on: ${date} - ${
            amPmCheck ? time[0] - 12 : time[0]
          }:${time[1]} ${amPmCheck ? 'PM' : 'AM'}`}</span>
        </div>
        <p className="postDesc">{body}</p>
      </div>
    );
}
