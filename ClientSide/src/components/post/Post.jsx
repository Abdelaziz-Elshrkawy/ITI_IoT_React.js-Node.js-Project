import './post.css';

export default function Post() {
    return (
        <div className="post">
            <img
                className="postImg"
                src="https://rukminim1.flixcart.com/image/850/1000/k0zlsi80/poster/d/g/n/large-nature-wallpaper-cscs009-original-imafknyqwyewf238.jpeg?q=90"
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
