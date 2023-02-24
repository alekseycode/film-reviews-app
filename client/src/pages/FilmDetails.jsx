import { useLoaderData } from "react-router-dom";
import { API_URL } from "../constants";

const FilmDetails = () => {

    const { filmPayload, reviewsPayload } = useLoaderData();
    
  return (
      <div className="film-details">
          <h1>{filmPayload.payload[0].title}</h1>  
          <ul>
        {reviewsPayload.payload.map((review) => (
          <li key={review.id}>{review.review}</li>
        ))}
      </ul>
     </div>
  );
}


export const filmDetailsAndReviewsLoader = async ({ params }) => {
    const { id } = params;
  
    const filmPromise = fetch(`${API_URL}/films/${id}`);
    const reviewsPromise = fetch(`${API_URL}/reviews/${id}`);
  
    const [filmRes, reviewsRes] = await Promise.all([filmPromise, reviewsPromise]);
  
    if (!filmRes.ok || !reviewsRes.ok) {
      throw Error('Could not load film details and reviews');
    }
  
    const filmPayload = await filmRes.json();
    const reviewsPayload = await reviewsRes.json();
  
    return {
      filmPayload,
      reviewsPayload,
    };
}
  
export default FilmDetails;