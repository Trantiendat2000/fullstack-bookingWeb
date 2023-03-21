import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const [user, setUser] = useState(location.state ? location.state.user : null);

  const [featured, setFeatured] = useState([]);
  const [hotel, setHotel] = useState([]);
  const [bestRatedHotel, setBestRatedHotel] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/hotels")
      .then((res) => res.json())
      .then((data) => {
        setHotel(data);
        setFeatured(data.filter((feature) => feature.featured === true));
        setBestRatedHotel(
          data
            .filter((hotel) => {
              if (hotel.rating) {
                return hotel;
              }
            })
            .sort((a, b) => b.rating - a.rating)
        );
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Navbar user={user} />
      <Header user={user} />
      <div className="homeContainer">
        <Featured featured={featured} />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList hotel={hotel} />
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties
          rating={bestRatedHotel.length > 0 ? bestRatedHotel : featured}
        />
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
