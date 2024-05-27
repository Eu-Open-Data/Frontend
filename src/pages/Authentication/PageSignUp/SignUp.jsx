import { useState } from "react";
import { ContentWrapper } from "../../Miscellaneous/ContentWrapper";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // useEffect(() => {
  //   const data = fetch("http://54.167.96.255:8081/registration/register", {
  //     method: "GET",
  //   })
  //     .then((response) => response.json())
  //     .then((response) => console.log(response))
  //     .catch((err) => console.log(err));
  //   console.log(data);
  // }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    } else {
      setPasswordError("");
    }

    const userData = {
      firstName,
      lastName,
      email,
      username,
      password,
    };

    try {
      const response = await fetch(
        "http://54.167.96.255:8081/registration/register",
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
      // Optionally handle the error (e.g., display an error message)
    }
  };

  return (
    <ContentWrapper type="vertical">
      <div className="container-signup">
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <div className="input-box">
            <p>Your username:</p>
            <input
              type="text"
              placeholder="WorldTraveller11"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-box">
            <p>Your email:</p>
            <input
              type="text"
              placeholder="example@mail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-box-name">
            <div>
              <p className="first-name">First Name:</p>
              <input
                type="text"
                placeholder="eg: Adrian"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <p className="last-name">Last Name:</p>
              <input
                type="text"
                placeholder="eg: Popescu"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="input-box">
            <p>Your password:</p>
            <input
              type="password"
              placeholder="********"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-box">
            <p>Confirm password:</p>
            <input
              type="password"
              placeholder="*******"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {passwordError && <p className="error">{passwordError}</p>}
          <button type="submit">Submit</button>
        </form>
      </div>
    </ContentWrapper>
  );
}

export default SignUp;
