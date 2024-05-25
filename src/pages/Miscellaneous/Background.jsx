import "./Background.css";

// eslint-disable-next-line react/prop-types
export const Background = ({ url }) => {
  console.log(url);
  return (
    <div className="bg-container">
      <img className="bg-img" src={url} alt="Background Image" />
    </div>
  );
};
