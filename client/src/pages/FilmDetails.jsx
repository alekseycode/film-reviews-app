import "../stylesheets/filmDetails.css";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../constants";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import LoadingScreen from "../components/LoaderingScreen";

const FilmDetails = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ review: "" });
  const [isLoading, setIsLoading] = useState(true);
  const { review } = form;
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submissionData = {
        review,
        user_id: user.userId,
        film_id: film.id,
      };

      await axios.post(`${API_URL}/api/addReview`, submissionData);
      setForm({ review: "" });
    } catch (e) {
      console.log(e);
    }
  };

  const updateForm = (e) => setForm({ [e.target.name]: e.target.value });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [filmRes, reviewsRes] = await axios.all([
          axios.get(`${API_URL}/api/films/${id}`),
          axios.get(`${API_URL}/api/usersReviews/${id}`),
        ]);
        if (filmRes.status !== 200 || reviewsRes.status !== 200) {
          throw new Error("Could not load film details and reviews");
        }
        setFilm(filmRes.data.payload[0]);
        setReviews(reviewsRes.data.payload);
        setTimeout(() => setIsLoading(false), 200);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [id, reviews]);

  return (
    <div className="film-details">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        film && (
          <>
            <h1 className="film-title">{film.title}</h1>
            {reviews.map((review) => (
              <div className="review" key={review.id}>
                <span className="username">{review.username}:</span> "
                {review.review}"
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
              <p className="disclaimer">
                <Link to="/login">Log in</Link> to add a review
              </p>
            )}
          </>
        )
      )}
    </div>
  );
};

export default FilmDetails;
