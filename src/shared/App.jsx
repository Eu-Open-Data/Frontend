
import "../pages/Authentication/PageSignUp/SignUp.css"
import SignUp from "../pages/Authentication/PageSignUp/SignUp.jsx";
import "../pages/Authentication/PageLogIn/LogIn.css"
import LogIn from "../pages/Authentication/PageLogIn/LogIn.jsx";
import "../pages/Authentication/PageForgotPassword/ForgotPassword.css"
import ForgotPassword from "../pages/Authentication/PageForgotPassword/ForgotPassword.jsx";
import "../pages/Authentication/PagePasswordReset/PasswordReset.css"
import PasswordReset from "../pages/Authentication/PagePasswordReset/PasswordReset.jsx";

function App() {
 

  return (
    <div>
        <SignUp/> <br/>
        <LogIn/>  <br/>
        <ForgotPassword/>  <br/>
        <PasswordReset/>  <br/>
    </div>
    
  );
}

export default App;
