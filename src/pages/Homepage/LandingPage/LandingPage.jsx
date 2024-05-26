import { useEffect } from "react";
import landingBg from "../../../assets/landingbg.jpg";
import NavBar from "../../DemoNav/NavBar";
import { Background } from "../../Miscellaneous/Background";

import "./LandingPage.css";
const LandingPage = () => {
  //const bg = "../../../assets/landingbg.jpg";
  console.log("Landing");
  useEffect(() => {
    const data = fetch("http://54.167.96.255:5000/location/Cluj-Napoca", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => console.log(response));
    console.log(data);
  }, []);
  return (
    <>
      <NavBar />
      <Background url={landingBg} />{" "}
      <div className="temporary-wrapper">
        <p className="landing-page-title">Discover Europe</p>
        <p className="landing-page-subtitle">
          Plan your perfect getaways with us!
        </p>
        <a className="button-hyperlink" href="/login">
          <div className="get-started-button">
            <p>GET STARTED</p>
          </div>
        </a>
      </div>
    </>
  );
};
export default LandingPage;
