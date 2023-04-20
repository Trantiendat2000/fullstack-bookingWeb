import "./featured.css";

const Featured = (props) => {
  return (
    <div className="featured">
      {props.featured.map((feature, i) => (
        <div className="featuredItem" key={i}>
          <img
            src={feature.photos[2]}
            alt={feature.name}
            className="featuredImg"
          />
          <div className="featuredTitles">
            <h1>{feature.city}</h1>
            <h2>{feature.rooms.length} properties</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Featured;
