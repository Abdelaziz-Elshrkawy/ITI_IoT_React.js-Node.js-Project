import './post.css';

export default function Post() {
    return (
        <div className="post">
            <img
                className="postImg"
                src="https://asset.gallup.com/p/POLL/5065b5a2-7818-4828-b79e-542acef7943a.jpg"
                alt="pr"
            />
            <div className="postInfo">
                <div className="postCats">
                    <span className="postCat">Music Life</span>
                </div>
                <span className="postTitle">Lorem ipsum dolor sit amet</span>
                <hr />
                <span className="postDate">1 hour ago</span>
            </div>
            <p className="postDesc">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Consequatur, quas ullam quidem culpa eos maxime earum
                architecto, iste ducimus nisi itaque labore officiis incidunt.
                Consectetur non ipsum maiores quibusdam in. Lorem ipsum dolor,
                sit amet consectetur adipisicing elit. Consequatur, quas ullam
                quidem culpa eos maxime earum architecto, iste ducimus nisi
                itaque labore officiis incidunt. Consectetur non ipsum maiores
                quibusdam i Lorem ipsum dolor, sit amet consectetur adipisicing
                elit. Consequatur, quas ullam quidem culpa eos maxime earum
                architecto, iste ducimus nisi itaque labore officiis incidunt.
                Consectetur non ipsum maiores quibusdam i
            </p>
        </div>
    );
}
