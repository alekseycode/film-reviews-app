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

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Incorrect username or password.");
    }

    //give the user a session

    const utcMilliseconds = new Date().getTime();
    const expiration = new Date(utcMilliseconds + THIRTY_SECONDS);

    const [session] = await db("sessions").returning("id").insert({
      user_id: user.id,
      expiration,
    });

    res.cookie("sessionId", session.id, {
      httpOnly: true,
      signed: true,
      maxAge: THIRTY_SECONDS * 240,
      domain: process.env.COOKIE_DOMAIN,
      path: "/",
      secure: true,
    });

    return res.json({ username, id: user.id, sessionId: session.id });
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
  const { username, password, confirmPassword, email } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  try {
    if (
      !username?.length ||
      !password?.length ||
      !confirmPassword?.length ||
      !email?.length
    ) {
      throw new Error("Username, password or email fields cannot be empty.");
    }

    const isExistingUser = await db
      .select("username")
      .from("users")
      .where("username", username)
      .first();

    if (isExistingUser) {
      throw new Error("User already exists.");
    }

    if (password !== confirmPassword) {
      throw new Error("Password fields do not match.");
    }

    if (!emailRegex.test(email)) {
      throw new Error("Please enter a valid email address.");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const insertedUser = await db("users")
      .insert({
        username,
        password: hashedPassword,
        email,
      })
      .returning("*");

    if (insertedUser) {
      return res.json({ success: "Success" });
    }
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  try {
    if (!email?.length) {
      throw new Error("Field cannot be empty.");
    }
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email address.");
    }

    const user = await db("users").where("email", email).first();

    if (!user) {
      throw new Error("No user associated with this email");
    }

    return res.json({ success: "success" });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

exports.newPassword = async (req, res) => {
  const { username, password, confirmPassword } = req.body;
  try {
    if (!username?.length || !password?.length || !confirmPassword?.length) {
      throw new Error("Username or password fields cannot be empty.");
    }

    const isExistingUser = await db
      .select("username")
      .from("users")
      .where("username", username)
      .first();

    if (!isExistingUser) {
      throw new Error("No user associated with that username.");
    }

    if (password !== confirmPassword) {
      throw new Error("Password fields do not match.");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await db("users")
      .where("username", username)
      .update("password", hashedPassword);

    return res.json({ success: "Successfully updated password" });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

exports.getSession = async (req, res) => {
  const { sessionId } = req.signedCookies;
  try {
    if (!sessionId?.length) {
      return res.status(200).json({ session: undefined });
    }
    const getSessionById = await db("sessions")
      .join("users", "sessions.user_id", "=", "users.id")
      .select("sessions.*", "users.username")
      .where("sessions.id", sessionId);
    if (!getSessionById?.length) {
      throw new Error("No session found");
    }
    return res.status(200).json({ session: getSessionById });
  } catch (e) {
    return res.json({ error: e.message });
  }
};
