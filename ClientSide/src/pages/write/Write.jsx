import TopBar from '../../components/Topbar/TopBar';
import './write.css';

export default function Write() {
    return (
        <>
            <TopBar />
            <div className="write">
                <img
                    className="writeImg"
                    src="https://assets3.thrillist.com/v1/image/2875152/1200x630/flatten;crop_down;webp=auto;jpeg_quality=70"
                    alt=""
                />
                <form className="witeForm">
                    <div className="writeFormGroup">
                        <label htmlFor="fileInput">
                            <i className="writeIcon fas fa-plus"></i>
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: 'none' }}
                        />
                        <input
                            type="text"
                            placeholder="Title"
                            className="writeInput"
                            autoFocus={true}
                        />
                    </div>
                    <div className="writeFormGroup">
                        <textarea
                            placeholder="Tell your story...."
                            typeof="text"
                            className="writeInput writeText"
                        ></textarea>
                    </div>
                    <button className="writeSubmit">Publish</button>
                </form>
            </div>
        </>
    );
}
