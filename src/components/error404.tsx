import Err404 from "../assets/Error404.svg";
import "../style/error404.css";

const Error404 = () => {
  return (
    <div className="error-main-container">
      <div className="error-sub-container">
        <img src={Err404} alt="error-image" width={400} height={400} />
        <div className="error-sub-container">
          <p className="error-typography-style">
            The page you’re looking was not found!.
          </p>
          <button
            className="error-button-style"
            onClick={() => (window.location.href = "/")}
          >
            Back Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error404;
