import './settings.css';
import Sidebar from '../../components/sidebar/Sidebar';
import TopBar from '../../components/Topbar/TopBar';

export default function Settings() {
    return (
        <>
            <TopBar />
            <div className="settings">
                <div className="settingsWrapper">
                    <div className="settingsTitle">
                        <span className="settingsTitleUpdate">
                            Update Your Account
                        </span>
                        <span className="settingsTitleDelete">
                            Delete Account
                        </span>
                    </div>
                    <form className="settingsForm">
                        <label>Profile Picture</label>
                        <div className="settingsPP">
                            <img
                                src="https://i.pinimg.com/236x/b8/c0/94/b8c094ee0d608354b49a1493a15dff89.jpg"
                                alt=""
                            />
                            <label htmlFor="fileInput">
                                <i className="settingsPPIcon far fa-user-circle"></i>
                            </label>
                            <input
                                id="fileInput"
                                type="file"
                                style={{ display: 'none' }}
                                className="settingsPPInput"
                            />
                        </div>
                        <label>Username</label>
                        <input
                            type="text"
                            placeholder="User name"
                            name="name"
                        />
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="username@gmail.com"
                            name="email"
                        />
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                        />
                        <button className="settingsSubmitButton" type="submit">
                            Update
                        </button>
                    </form>
                </div>
                <Sidebar />
            </div>
        </>
    );
}
