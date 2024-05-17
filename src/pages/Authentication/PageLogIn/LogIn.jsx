import "../../../pages/Authentication/PageLogIn/LogIn.css";
import { ContentWrapper } from "../../Miscellaneous/ContentWrapper";
//import { ContentWrapper } from "../../Miscellaneous/ContentWrapper";

const LogIn = () => {
  return (
    <ContentWrapper type="vertical">
      <div className="container-login">
        <form action="">
          <h1>Log In</h1>
          <div className="input-box">
            <p>Please enter your email:</p>
            <input type="text" placeholder="example@mail.com" required />
          </div>
          <div className="input-box">
            <p>Please enter your password:</p>
            <input type="text" placeholder="********" required />
          </div>
          <a href="/forgotPwd">
            <div className="forgot-password">Forgot password</div>
          </a>
          <button type="submit">Log In</button>
        </form>
      </div>
    </ContentWrapper>
  );
};
export default LogIn;
