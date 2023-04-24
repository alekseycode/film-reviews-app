import { Link } from "react-router-dom";
import "../stylesheets/home.css";

export const Home = () => {
  return (
    <div className="home">
      <section className="main-image-container"></section>
      <h2 className="featured-content-heading">Browse the latest reviews</h2>
      <section className="latest-reviews-section">
        <div className="grid-wrapper">
          <div className="featured-content">
            <h2>Black Adam</h2>
            <Link to="/films/1">
              <div className="image-container black-adam"></div>
            </Link>
            <p>
              ’’ It’s distinguished itself just enough to satiate action film
              fans, entertain future streaming audiences and warrant further
              merging into the DC universe. ’’
            </p>
            <Link to="/films/1">Read More . . .</Link>
          </div>

          <div className="featured-content">
            <h2>Black Widow</h2>
            <Link to="/films/2">
              <div className="image-container black-widow"></div>
            </Link>
            <p>
              ’’ The mostly self-contained story packs a surprising amount of
              heart and finally gives this long-running MCU character a proper
              send off. ’’
            </p>
            <Link to="/films/2">Read More . . .</Link>
          </div>

          <div className="featured-content">
            <h2>Man of Steel</h2>
            <Link to="/films/4">
              <div className="image-container man-of-steel"></div>
            </Link>
            <p>
              ’’ Zack Snyder's Man of Steel is a gritty and realistic take on
              one of the most iconic superheroes ever. It's visually astonishing
              and action-packed. ’’
            </p>
            <Link to="/films/4">Read More . . .</Link>
          </div>

          <div className="featured-content">
            <h2>Captain America</h2>
            <Link to="/films/5">
              <div className="image-container captain-america"></div>
            </Link>
            <p>
              ’’A whizz-bang, retro-futuristic adventure offers an exhilarating
              thrill ride that perfectly captures the enduring optimism of the
              1940s. ’’
            </p>
            <Link to="/films/5">Read More . . .</Link>
          </div>
        </div>
      </section>
    </div>
  );
};
