const { db } = require("../db/weviewsDB");
const bcrypt = require("bcrypt");
const THIRTY_SECONDS = 30000;

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    //check if fields are empty
    if (!username?.length || !password?.length) {
      throw new Error("Username or password cannot be empty");
    }

    const user = await db("users")
      .where("username", username)
      .select("username", "password", "id")
      .first();

    if (!user) {
      throw new Error("Incorrect username or password.");
    }

    await bcrypt.compare(password, user.password);

    //give the user a session

    const utcMilliseconds = new Date().getTime();
    const expiration = new Date(utcMilliseconds + THIRTY_SECONDS);

    const [session] = await db("sessions").returning("id").insert({
      user_id: user.id,
      expiration,
    });

    res.cookie("sessionId", session.id, {
      signed: true,
      maxAge: THIRTY_SECONDS * 10,
    });

    return res.json({ username, id: user.id });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

exports.logOut = async (req, res) => {
  const sessionId = req.signedCookies.sessionId;

  if (sessionId) {
    await db("sessions").delete().where({ id: sessionId });
  }

  res
    .cookie("sessionId", "", {
      maxAge: 0,
    })
    .send("Nom Nom");
};

exports.postRegister = async (req, res) => {
  const user = req.body;

  try {
    if (
      !user?.username?.length ||
      !user?.password?.length ||
      !user?.email?.length
    ) {
      return res.json({
        error: "Username, password or email fields cannot be empty",
      });
    }

    const isExistingUser = await db
      .select("username")
      .from("users")
      .where("username", user.username)
      .first();

    if (isExistingUser) {
      return res.json({ error: "User already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    user.password = hashedPassword;

    const insertedUser = await db("users").insert(user).returning("*").first();

    if (insertedUser) {
      return res.json({ success: "Success" });
    }
  } catch (e) {
    console.log(e);
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await db("users").where("email", email).first();

    if (!user) {
      return res.json({ error: "Invalid email address" });
    }

    return res.json({ success: "success" });
  } catch (e) {
    console.log(e);
  }
};

exports.newPassword = async (req, res) => {
  const { username, password } = req.body;
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await db("users")
      .where("username", username)
      .update("password", hashedPassword);

    return res.json({ success: "Successfully updated password" });
  } catch (e) {
    console.log(e);
  }
};

exports.getSession = async (req, res) => {
  // console.log('getSession: ', req.session);
  return res.send(req.session.cookie);
};
