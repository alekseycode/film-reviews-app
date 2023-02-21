import { useEffect, useState } from "react";
import axios from 'axios'
// import { API_URL } from "../constants";

export const FilmsLayout = () => {
    const [filmsData, setFilmsData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/films`)
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