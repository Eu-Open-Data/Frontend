import "./ContentWrapper.css";

export const ContentWrapper = ({ children, type }) => {
  if (type === "vertical")
    return <div className="container vertical-container">{children}</div>;
  else if (type === "horizontal")
    return <div className="container horizontal-container">{children}</div>;
  else if (type === "center")
    return <div className="container center-container">{children}</div>;
};
