const { db } = require("../db/weviewsDB");

exports.getReviews = async (req, res) => {
  try {
    const reviews = await db("reviews");
    return res.json({ message: "reviews", payload: reviews });
  } catch (e) {
    console.log(e);
  }
};

exports.getReviewsByFilmId = async (req, res) => {
  try {
    const { id } = req.params;
    const rows = await db("reviews").where({ film_id: id });
    return res.json({ message: "reviews", payload: rows });
  } catch (e) {
    console.log(e);
  }
};

exports.postReview = async (req, res) => {
  try {
    const { review, user_id, film_id } = req.body;

    if (!review?.length) {
      throw new Error("Review field cannot be empty");
    }

    await db("reviews").insert({
      review,
      user_id,
      film_id,
      created_at: db.raw("now()"),
    });

    res.json({ message: "Success" });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};
