import "../stylesheets/filmDetails.css";
import { useLoaderData, useNavigate } from "react-router-dom";
import { API_URL } from "../constants";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const FilmDetails = () => {
  const { filmPayload, reviewsPayload } = useLoaderData();
  const [form, setForm] = useState({ review: "" });
  const { review } = form;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submissionData = {
        review,
        user_id: user.userId,
        film_id: filmPayload.payload[0].id,
      };

      await axios.post(`${API_URL}/api/addReview`, submissionData);
      setForm({ review: "" });
      navigate(`/films/${filmPayload.payload[0].id}`);
    } catch (e) {
      console.log(e);
    }
  };

  const updateForm = (e) => setForm({ [e.target.name]: e.target.value });

  return (
    <div className="film-details">
      <h1 className="film-title">{filmPayload.payload[0].title}</h1>
      {reviewsPayload.payload.map((review) => (
        <div className="review" key={review.id}>
          <span className="username">{review.username}:</span> ’{review.review}’
        </div>
      ))}

      {user.userId ? (
        <form className="add-review" onSubmit={handleSubmit}>
          <label className="review-label" htmlFor="review">
            Add your review
          </label>
          <input
            className="review-input"
            type="textarea"
            id="review"
            name="review"
            value={review}
            onChange={updateForm}
          />
          <button className="submit-review-btn" type="submit">
            Add
          </button>
        </form>
      ) : (
        <p className="disclaimer">Log in to add a review</p>
      )}
    </div>
  );
};

export const filmDetailsAndReviewsLoader = async ({ params }) => {
  const { id } = params;

  const [filmRes, reviewsRes] = await axios.all([
    axios.get(`${API_URL}/api/films/${id}`),
    axios.get(`${API_URL}/api/usersReviews/${id}`),
  ]);

  if (filmRes.status !== 200 || reviewsRes.status !== 200) {
    throw new Error("Could not load film details and reviews");
  }

  return {
    filmPayload: filmRes.data,
    reviewsPayload: reviewsRes.data,
  };
};

export default FilmDetails;
