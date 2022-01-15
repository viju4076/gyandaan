const router = require("express").Router();
const passport = require("passport");
const genPassword = require("../lib/passwordUtils").genPassword;
const connection = require("../config/database");
const User = require("../models/user/model");
const isAuth = require("./authMiddleware").isAuth;
const isAdmin = require("./authMiddleware").isAdmin;
const Post = require("../models/post/model");
/**
 * -------------- POST ROUTES ----------------
 */
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login-failure",
    successRedirect: "/login-success",
  })
);

router.post("/search", (req, res, next) => {
  console.log(req.body);

  // User.find({ $text: { $search: req.body.name } }).then((user) => {
  //   console.log("user", user);
  //   // if (err) {
  //   //   console.log(err);
  //   //   res.status(210).json({ message: "Failed to add post" });
  //   // } else {
  //   //   res.status(201).json({ message: "Post registered successfully" });
  //   // }
  // });
  User.find({ username: { $regex: "/^vi/" } }).then((user) => {
    console.log("user", user);
    // if (err) {
    //   console.log(err);
    //   res.status(210).json({ message: "Failed to add post" });
    // } else {
    //   res.status(201).json({ message: "Post registered successfully" });
    // }
  });
});

router.post("/addteacher", (req, res, next) => {
  console.log(req.body);

  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      isTeacher: true,
      Rating: 0,
      areasOfInterest: req.body.areasOfInterest,
      Posts: [],
      Messages: [],
      qualifications: req.body.qualifications,
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        res
          .status(200)
          .json({ status: "400", msg: "Cannot add as a teacher " });
      } else {
        console.log(updatedUser);
        res.status(200).json({
          status: "200",
          msg: "Added as a teacher",
          updatedUser: updatedUser,
        });
      }
    }
  );
});
router.post("/addpost", (req, res, next) => {
  console.log(req.body);
  const newPost = new Post({
    name: req.user.username,
    senderId: req.user._id,
    heading: req.body.post.heading,
    link: req.body.post.link,
    description: req.body.post.description,
    dateTime: new Date(),
    comments: [],
  });
  console.log(newPost);
  newPost.save().then((err, post) => {
    console.log(post);
    if (err) {
      console.log(err);
      res.status(210).json({ message: "Failed to add post" });
    } else {
      res.status(201).json({ message: "Post registered successfully" });
    }
  });
});
router.post("/register", (req, res, next) => {
  console.log("Hii");
  const saltHash = genPassword(req.body.password);
  console.log(req.body);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    cpassword: req.body.cpassword,
    hash: hash,
    salt: salt,
    isTeacher: false,
    followers: [],
    following: [],
    qualifications: "",
    areasOfInterest: [],
  });

  newUser.save().then((user) => {
    console.log(user);
    res
      .status(201)
      .json({ message: "User registered successfully", user: user });
  });
});

/**
 * -------------- GET ROUTES ----------------
 */

router.get("/", (req, res, next) => {
  res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
});

// When you visit http://localhost:3000/login, you will see "Login Page"
router.get("/login", (req, res, next) => {
  const form =
    '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="uname">\
    <br>Enter Password:<br><input type="password" name="pw">\
    <br><br><input type="submit" value="Submit"></form>';

  res.send(form);
});

// When you visit http://localhost:3000/register, you will see "Register Page"
router.get("/register", (req, res, next) => {
  const form =
    '<h1>Register Page</h1><form method="post" action="register">\
                    Enter Username:<br><input type="text" name="uname">\
                    <br>Enter Password:<br><input type="password" name="pw">\
                    <br><br><input type="submit" value="Submit"></form>';

  res.send(form);
});

/**
 * Lookup how to authenticate users on routes with Local Strategy
 * Google Search: "How to use Express Passport Local Strategy"
 *
 * Also, look up what behaviour express session has without a maxage set
 */

router.get("/login-success", (req, res, next) => {
  console.log("login success");
  console.log(req.body);

  res.status(200).json({ message: "Successful" });
  //res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
});

router.get("/login-failure", (req, res, next) => {
  console.log("login failure");
  res.status(400).json({ message: "Login failure" });
});
router.get("/auth", isAuth, (req, res, next) => {
  res.status(200).json({
    status: 200,
    msg: "You made it to the route.",
    Authenticated: true,
    userId: req.user._id,
  });
});

router.get("/profile", (req, res, next) => {
  if (req.user)
    res
      .status(200)
      .json({ status: 200, msg: "current user profile", user: req.user });
  else res.status(400).json({ message: "Can't get current user" });
});
router.get("/logout", (req, res, next) => {
  console.log("Logged out");
  req.logout();
  res.status(200).json({ status: 200, msg: "current user logged out" });
});
router.get("/getpost", (req, res, next) => {
  console.log("Getting feeds");
  Post.find({}, function (err, allPost) {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "can't get feeds" });
    } else {
      console.log(allPost);
      res.status(200).json({
        status: 200,
        post: allPost.sort((p1, p2) => (p1.dateTime > p2.dateTime ? -1 : 1)),
      });
    }
  });

  //res.status(200).json({status:200, post: posts});
});

module.exports = router;
