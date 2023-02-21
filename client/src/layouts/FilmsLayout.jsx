import { useEffect, useState } from "react";
import axios from 'axios'
import { API_URL } from "../constants.jsx";

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
              <div className="film" key={i}>
                  <p>{film.title}</p>
            </div>
        ))}
      </div>
  );
}