import './singlePost.css';

export default function SinglePost() {
    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                <img
                    className="singlePostImg"
                    src="https://rukminim1.flixcart.com/image/850/1000/k0zlsi80/poster/d/g/n/large-nature-wallpaper-cscs009-original-imafknyqwyewf238.jpeg?q=90"
                    alt="problem"
                />
                <h1 className="singlePostTitle">
                    Lorem ipsum dolor sit amet .
                    <div className="singlePostEdit">
                        <i className="singlePostIcon far fa-edit"></i>
                        <i className="singlePostIcon far fa-trash-alt"></i>
                    </div>
                </h1>
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        Author : <b>AAM</b>
                    </span>
                    <span className="singlePostDate">a hour ago</span>
                </div>
                <p className="singlePostDesc">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Dolore, eaque provident tenetur autem voluptate quidem
                    libero ex dicta non in maiores consequuntur eius, quibusdam
                    doloribus minus vero! Earum, nulla officia! Lorem ipsum
                    dolor, sit amet consectetur adipisicing elit. Dolore, eaque
                    provident tenetur autem voluptate quidem libero ex dicta non
                    in maiores consequuntur eius, quibusdam doloribus minus
                    vero! Earum, nulla officia! Lorem ipsum dolor, sit amet
                    consectetur adipisicing elit. Dolore, eaque provident
                    tenetur autem voluptate quidem libero ex dicta non in
                    maiores consequuntur eius, quibusdam doloribus minus vero!
                    Earum, nulla officia! Lorem ipsum dolor, sit amet
                    consectetur adipisicing elit. Dolore, eaque provident
                    tenetur autem voluptate quidem libero ex dicta non in
                    maiores consequuntur eius, quibusdam doloribus minus vero!
                    Earum, nulla officia!
                </p>
            </div>
        </div>
    );
}

export const server_url =
  "https://itiiotreactjs-nodejs-project.abdelaziz-elshr.repl.co/";