import { useEffect, useState } from "react";
import axios from 'axios'
import { API_URL } from "../constants.jsx";
import {Link} from "react-router-dom"

export const FilmsLayout = () => {
    const [filmsData, setFilmsData] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/films`)
            .then(async res => setFilmsData(res.data.payload))
            .catch(e => console.log(e))
}, []);

  return (
      <div className="films">
          {filmsData && filmsData.map((film, i) => (
              <Link to={film.id.toString()} className="film" key={i}>
                  <p>{film.title}</p>
            </Link>
          ))}
      </div>
  );
}