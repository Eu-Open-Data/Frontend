import "./App.css";

import LogIn from "../pages/Authentication/PageLogIn/LogIn.jsx";
import { ContentWrapper } from "../pages/Miscellaneous/ContentWrapper.jsx";
function App() {
  return (
    <div className="App">
      <ContentWrapper type="vertical">
        <LogIn />
      </ContentWrapper>
    </div>
  );
}

export default App;
