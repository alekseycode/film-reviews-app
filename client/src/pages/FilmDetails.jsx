import "../stylesheets/filmDetails.css";
import { useLoaderData } from "react-router-dom";
import { API_URL } from "../constants";
import axios from "axios";
import { useState } from "react";

const FilmDetails = () => {
  const { filmPayload, reviewsPayload } = useLoaderData();
  const [form, setForm] = useState({ review: "" });
  const { review } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  const updateForm = (e) => {
    setForm({ [e.target.name]: e.target.value });
    console.log(form);
  };

  return (
    <div className="film-details">
      <h1 className="film-title">{filmPayload.payload[0].title}</h1>
      {reviewsPayload.payload.map((review) => (
        <div className="review" key={review.id}>
          <span className="username">{review.username}:</span> ’{review.review}’
        </div>
      ))}

      <form className="add-review" onSubmit={handleSubmit}>
        <label htmlFor="review">Add your review</label>
        <input
          type="textarea"
          id="review"
          name="review"
          value={review}
          onChange={updateForm}
        />
        <button type="submit">Add</button>
      </form>
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
