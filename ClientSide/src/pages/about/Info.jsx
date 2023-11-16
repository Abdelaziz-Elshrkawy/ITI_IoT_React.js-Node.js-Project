import React from "react";

function Info({ src, name }) {
  return (
    <div className="info">
      <div id="img">
        <img src={src} alt="developer-image" />
          </div>
          <div id="name">
              <h3>
                  {name}
              </h3>
          </div>
    </div>
  );
}

export default Info;
