import '../stylesheets/filmDetails.css'
import { useLoaderData } from "react-router-dom";
import { API_URL } from "../constants";
import axios from 'axios';

const FilmDetails = () => {

    const { filmPayload, reviewsPayload } = useLoaderData();
    console.log(reviewsPayload)
  return (
      <div className="film-details">
          <h1>{filmPayload.payload[0].title}</h1>  
          
          {reviewsPayload.payload.map((review) => (
            <div className="review" key={review.id}>
               {review.username}: {review.review }
              </div>
        ))}
     </div>
  );
}


export const filmDetailsAndReviewsLoader = async ({ params }) => {
    const { id } = params;
  
    const [filmRes, reviewsRes] = await axios.all([
        axios.get(`${API_URL}/films/${id}`),
        axios.get(`${API_URL}/usersReviews/${id}`)
      ]);
  
    if (filmRes.status !== 200 || reviewsRes.status !== 200) {
      throw new Error('Could not load film details and reviews');
    }
  
    return {
      filmPayload: filmRes.data,
      reviewsPayload: reviewsRes.data,
    };
  };
  
export default FilmDetails;