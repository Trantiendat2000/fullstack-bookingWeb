import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Hotel = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const user = location.state.user;
  const date = location.state.date;
  const options = location.state.options;
  const startDate = new Date(date[0].startDate);
  const endDate = new Date(date[0].endDate);
  const hotel = location.state.hotel;

  const photos = hotel.photos;

  const lengthOfPhotos = photos.length - 1;

  const dateDiff =
    Math.floor(endDate.getTime() - startDate.getTime()) / (24 * 3600 * 1000);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? lengthOfPhotos : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === lengthOfPhotos ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleBooking = () => {
    navigate("/booking", { state: { date, user, hotel, options } });
  };

  return (
    <div>
      <Navbar user={user} hotel={hotel} />
      <Header type="list" user={user} />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={photos[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <button className="bookNow" onClick={() => handleBooking()}>
            Reserve or Book Now!
          </button>
          <h1 className="hotelTitle">{hotel.title}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{hotel.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location – {hotel.distance}m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over ${hotel.cheapestPrice} at this property and get a
            free airport taxi
          </span>
          <div className="hotelImages">
            {photos.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo}
                  alt={hotel.name}
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">Stay in the heart of City</h1>
              <p className="hotelDesc">{hotel.desc}</p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {dateDiff}-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>${dateDiff * hotel.cheapestPrice}</b> ({dateDiff} nights)
              </h2>
              <button onClick={() => handleBooking()}>
                Reserve or Book Now!
              </button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;
