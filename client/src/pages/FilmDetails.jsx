import { useLoaderData } from "react-router-dom";
import { API_URL } from "../constants";

const FilmDetails = () => {

    const film = useLoaderData();
    console.log(film)
  return (
      <div className="film-details">
          <p>{film.payload[0].title}</p>   
     </div>
  );
}

export const filmDetailsLoader = async ({ params }) => {
    const { id } = params;

    const res = await fetch(`${API_URL}/films/` + id)

    if (!res.ok) {
        throw Error('Could not find that film')
    }

    return res;
}

export default FilmDetails;