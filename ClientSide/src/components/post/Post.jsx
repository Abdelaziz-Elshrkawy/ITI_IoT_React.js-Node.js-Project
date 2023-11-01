import './post.css';

export default function Post({ title, body, src, dateData, username }) {
    const date = dateData.split("T")[0];
    console.log(dateData)
    const time = dateData.split("T")[1].split(".")[0].split(':');
  const amPmCheck = time[0] > 12
    return (
<<<<<<< HEAD
      <div className="post">
        <img className="postImg" src={src} alt="pr" />
        <div className="postInfo">
          <span className="postTitle">{title}</span>
          <hr />
          <span className="postDate">{`Written by: ${username} - on: ${date} - ${
            amPmCheck ? time[0] - 12 : time[0]
          }:${time[1]} ${amPmCheck ? 'PM' : 'AM'}`}</span>
=======
        <div className="post">
            <img
                className="postImg"
                src="https://cdn.wallpapersafari.com/9/73/Vh4mRr.jpg"
                alt="pr"
            />
            <div className="postInfo">
                <div className="postCats">
                </div>
                <span className="postTitle">Moon Magic</span>
                <hr />
                <span className="postDate">1 hour ago</span>
            </div>
            <p className="postDesc">
            The moon, our celestial companion,has long been a source of fascination and intrigue.Its phases, from crescent to full, have painted the night sky with timeless beauty and symbolism,<br/>
            while its gravitational dance influences Earth's tides. Beyond myth and legend,scientific exploration has unveiled its rocky landscapes and ancient history.
            The moon stands as a testament to the vast mysteries of our universe,an ever-present source of inspiration. As we gaze up at its silvered face,
             we connect with a cosmic enigma that has been a guiding light for countless generations,igniting our imagination and nurturing our curiosity.
            </p>
>>>>>>> refs/remotes/origin/client
        </div>
        <p className="postDesc">{body}</p>
      </div>
    );
}
