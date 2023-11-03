import React from "react";
import TopBar from "../../components/Topbar/TopBar";
import Info from "./Info";
import "./About.css";
function About() {
  return (
    <div id="about">
      <TopBar />
      <div id="developers">
        <Info
          name="Abdelaziz Ibrahim Abdelaziz"
          src="https://avatars.githubusercontent.com/u/106397839?s=400&u=6a325390ffbca9171dfc12c08a229a50b4afe9c4&v=4"
        />
        <Info
          name="Manar Abo-Emira"
          src="https://avatars.githubusercontent.com/u/107116739?v=4"
        />
        <Info
          name="Aya Abdelmoez"
          src="https://avatars.githubusercontent.com/u/112432604?v=4"
        />
      </div>
      <div id="story">
        This is a full stack application built using{" "}
        <strong>React.js/Node.js/MongoDB</strong>{" "}
        the clientSide implementation have done by{" "}
        <strong>Aya Abdelmoez</strong> and <strong>Manar Abo-Emira</strong> and
        the ServerSide implementation have done by{" "}
        <strong>Abdelaziz Ibrahim Abdelaziz</strong>
      </div>
    </div>
  );
}

export default About;
