import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants.jsx";
import { Link } from "react-router-dom";
import "../stylesheets/filmsLayout.css";
import LoadingScreen from "../components/LoaderingScreen.jsx";

export const FilmsLayout = () => {
  const [filmsData, setFilmsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/films`)
      .then(async (res) => {
        setFilmsData(res.data.payload);
        setTimeout(() => setIsLoading(false), 1000);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="films">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        filmsData &&
        filmsData.map((film, i) => (
          <Link to={film.id.toString()} className="film" key={i}>
            <h3>{film.title}</h3>
          </Link>
        ))
      )}
    </div>
  );
};
