import "./featuredProperties.css";

const FeaturedProperties = (props) => {
  return (
    <div className="fp">
      {props.rating.map((hotel) => (
        <div className="fpItem" key={hotel._id}>
          <img src={hotel.photos[3]} alt={hotel.name} className="fpImg" />
          <span className="fpName">
            <a href="./hotels/0" target="_blank">
              {hotel.title}
            </a>
          </span>
          <span className="fpCity">{hotel.city}</span>
          <span className="fpPrice">Starting from ${hotel.cheapestPrice}</span>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProperties;
