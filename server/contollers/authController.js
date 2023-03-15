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
      !user?.confirmPassword?.length
    ) {
      throw new Error("Username or password fields cannot be empty.");
    }

    if (user.password !== user.confirmPassword) {
      throw new Error("Password fields do not match.");
    }

    const isExistingUser = await db
      .select("username")
      .from("users")
      .where("username", user.username)
      .first();

    if (isExistingUser) {
      throw new Error("User already exists.");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    user.password = hashedPassword;

    const insertedUser = await db("users")
      .insert({
        username: user.username,
        password: hashedPassword,
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

  try {
    const user = await db("users").where("email", email).first();

    if (!user) {
      throw new Error("Invalid email address");
    }

    return res.json({ success: "success" });
  } catch (e) {
    return res.status(400).json({ error: e.message });
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
    return res.status(400).json({ error: e.message });
  }
};

exports.getSession = async (req, res) => {
  // console.log('getSession: ', req.session);
  return res.send(req.session.cookie);
};
