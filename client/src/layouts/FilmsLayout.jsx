import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants.jsx";
import { Link } from "react-router-dom";
import "../stylesheets/filmsLayout.css";

export const FilmsLayout = () => {
  const [filmsData, setFilmsData] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/films`)
      .then(async (res) => setFilmsData(res.data.payload))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="films">
      {filmsData &&
        filmsData.map((film, i) => (
          <Link to={film.id.toString()} className="film" key={i}>
            <h3>{film.title}</h3>
          </Link>
        ))}
    </div>
  );
};
