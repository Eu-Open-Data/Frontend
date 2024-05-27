import { useState } from "react";
import { ContentWrapper } from "../../Miscellaneous/ContentWrapper";
import "../../../pages/Authentication/PageLogIn/LogIn.css";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateFormLogin = () => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){8,}$/;
    if (!passwordRegex.test(password)) {
      alert("Password must contain at least 8 characters, including at least one number.");
      return false;
    }
    if (username === "" || password === "") {
      alert("Username and password cannot be empty.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFormLogin()) {
      const userData = {
        username,
        password,
      };

      try {
        const response = await fetch(
          "http://54.167.96.255:8081/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error: ${response.statusText} - ${errorText}`);
        }

        const contentType = response.headers.get("Content-Type");
        let result;
        if (contentType && contentType.includes("application/json")) {
          result = await response.json();
        } else {
          result = await response.text();
        }

        console.log("Success:", result);
        navigate("/map");
      } catch (error) {
        console.error("Error:", error);
        setLoginError("Failed to log in. Please check your credentials.");
      }
    }
  };

  return (
    <ContentWrapper type="vertical">
      <div className="container-login">
        <form onSubmit={handleSubmit}>
          <h1>Log In</h1>
          <div className="input-box">
            <p>Please enter your username:</p>
            <input
              type="text"
              placeholder="WorldTraveller11"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-box">
            <p>Please enter your password:</p>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img className="login-hide" src="../src/assets/password-hide.png" alt="toggle visibility" onClick={toggleShowPassword} />
          </div>
          {loginError && <p className="error">{loginError}</p>}
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
