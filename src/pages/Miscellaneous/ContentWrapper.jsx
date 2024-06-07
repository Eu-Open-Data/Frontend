import "./ContentWrapper.css";

export const ContentWrapper = ({ children, type }) => {
  if (type === "vertical")
    return <div style={{padding: 0, margin: 0, display: 'flex', justifyContent: 'center'}} className="container vertical-container">{children}</div>;
  else if (type === "horizontal")
    return <div className="container horizontal-container">{children}</div>;
  else if (type === "center")
    return <div className="container center-container">{children}</div>;
};
