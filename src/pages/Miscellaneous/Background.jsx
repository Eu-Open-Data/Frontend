import "./Background.css";

export const Background = ({ url }) => {
  console.log(url);
  return (
    <div className="bg-container">
      <img className="bg-img" src={url} alt="Background Image" />
    </div>
  );
};
