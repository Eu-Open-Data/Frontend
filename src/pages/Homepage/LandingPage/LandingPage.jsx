import landingBg from "../../../assets/landingbg.jpg";
import { Background } from "../../Miscellaneous/Background";
import "./LandingPage.css";
export const LandingPage = () => {
  //const bg = "../../../assets/landingbg.jpg";
  return (
    <>
      <Background url={landingBg} />
      <p className="landing-page-title">Discover Europe</p>
      <p className="landing-page-subtitle">
        Plan your perfect getaways with us!
      </p>
      <div className="get-started-button">
        <p>GET STARTED</p>
      </div>
    </>
  );
};
