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
  const { review } = req.body;

  await db("reviews").insert({
    review: review,
    created_at: db.raw("now()"),
  });

  res.json({ message: "Success" });
};
