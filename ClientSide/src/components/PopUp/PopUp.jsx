import "./PopUp.css";

function PopUp({
  message,
  option1,
  option2,
  className1,
  className2,
  onClick1,
  onClick2,
}) {
  return (
    <div id="pop-up-cont">
      <div id="pop-up">
        <p id="pop-up-message">{message}</p>
        {option1 ? (
          <button
            id="option1"
            className={className1 ? "option " + className1 : "option"}
            onClick={onClick1}
          >
            {option1}
          </button>
        ) : (
          ""
        )}
        {option2 ? (
          <button
            id="option2"
            className={className2 ? "option " + className2 : "option"}
            onClick={onClick2}
          >
            {option2}
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default PopUp;
