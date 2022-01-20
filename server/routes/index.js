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

// router.get("/search/:key", async(req, res) => {
//   // console.log(req.body);
// let data=await User.find(
//   {
//   "$or" : [
//       {"username":{$regex:req.params.key}},
//       {"email":{$regex:req.params.key}},
//       // {"phone":{$regex:req.params.key}},
//       // {"areasOfInterest":{it$regex:req.params.key}}
//       {"qualifications":{$regex:req.params.key}}
//     ]
// });
// res.send(data);
//   // User.find({ $text: { $regex: /s/ } }).then((user) => {
//   //   console.log("user", user);
//     // if (err) {
//     //   console.log(err);
//     //   res.status(210).json({ message: "Failed to add post" });
//     // } else {
//     //   res.status(201).json({ message: "Post registered successfully" });
//     // }
//   // });
// });
router.post("/search", async (req, res, next) => {
  console.log(req.body.name);
  await User.find(
    {
      $or: [
        {
          username: {
            $regex: req.body.name,
          },
        },
        {
          email: {
            $regex: req.body.name,
          },
        },
        // // {"phone":{$regex:req.params.key}},
        // // {"areasOfInterest":{$regex:req.params.key}}
        {
          qualifications: {
            $regex: req.body.name,
          },
        },
      ],
    },
    (err, search) => {
      console.log("search ", search);
      if (err) {
        console.log(err);
        res.status(200).json({
          status: "400",
          msg: "Cannot search icon ",
        });
      } else {
        res.status(200).json({
          status: "201",
          msg: "Search successful",
          users: search,
        });
      }
    }
  );
});
router.post("/addteacher", (req, res, next) => {
  console.log(req.body);

  User.findOneAndUpdate(
    {
      _id: req.user._id,
    },
    {
      isTeacher: true,
      Rating: 0,
      areasOfInterest: req.body.areasOfInterest,
      Posts: [],
      Messages: [],
      qualifications: req.body.qualifications,
    },
    {
      new: true,
    },
    (err, updatedUser) => {
      if (err) {
        res.status(200).json({
          status: "400",
          msg: "Cannot add as a teacher ",
        });
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
  console.log("post ko add kiya",req.body);
  var currentdate = new Date();
  var datetime = currentdate.getDate() + "/"
    + (currentdate.getMonth() + 1) + "/"
    + currentdate.getFullYear() + " "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes();
    var startDate = new Date(req.body.post.startDate);
    var formattedStartDate = startDate.toLocaleString('en-US', {
      weekday: 'short', // long, short, narrow
      day: 'numeric', // numeric, 2-digit
      year: 'numeric', // numeric, 2-digit
      month: 'long', // numeric, 2-digit, long, short, narrow
      hour: 'numeric', // numeric, 2-digit
      minute: 'numeric', // numeric, 2-digit
      // numeric, 2-digit
  });
    console.log("formatted start date",formattedStartDate);+ "/"
   
    
        var endDate= new Date(req.body.post.endDate);
    
   // console.log("Date check kar rhe", startDate);

  const newPost = new Post({
    name: req.user.username,
    senderId: req.user._id,
    heading: req.body.post.heading,
    link: req.body.post.link,
    description: req.body.post.description,
    dateTime: currentdate,
    startDate: startDate,
    endDate: endDate,
    formattedDateTime: datetime,
    formattedStartDate: formattedStartDate,
    comments: [],
    attendees: [],
  });
  console.log(newPost);
  newPost.save().then((err, post) => {
    console.log(post);
    if (err) {
      console.log(err);
      res.status(210).json({
        message: "Failed to add post",
      });
    } else {
      res.status(201).json({
        message: "Post registered successfully",
      });
    }
  });
});

router.get("/getComments/:postId", (req, res, next) => {
  console.log("Getting comments");
  const postId = req.params.postId;
  let search = {};
  console.log("in post", postId);
  let loggedInUser = req.user;
  search = {
    _id: postId,
  };
  Post.find(search, function (err, post) {
    if (err) {
      console.log(err);
      res.status(400).json({
        message: "can't get comments",
      });
    } else {
      console.log("sare post", post[0].comments);
      res.status(200).json({
        status: 200,
        msg: "successfully",
        comments: post[0].comments,
      });
    }
  });
  //res.status(200).json({status:200, post: posts});
});

router.post("/addComment", (req, res, next) => {
  var currentdate = new Date();
  var datetime =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes();
  console.log(req.body);
  const loggedInUserId = req.user._id;
  const postid = req.body.postid;
  let comment = {
    senderName: req.user.username,
    senderId: loggedInUserId,
    description: req.body.desc,
    dateTime: datetime,
  };
  let searchPost = {
    $push: {
      comments: comment,
    },
  };
  Post.findOneAndUpdate(
    {
      _id: postid,
    },
    searchPost,
    {
      new: true,
    },
    (err, Post) => {
      if (err) {
        res.status(200).json({ status: "400", msg: "Cannot follow " });
      } else {
        res
          .status(200)
          .json({
            status: "200",
            msg: "Comment added",
            comments: Post.comments,
          });
      }
    }
  );
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
    res.status(201).json({
      message: "User registered successfully",
      user: user,
    });
  });
});
router.post("/changeFollower", (req, res, next) => {
  console.log(req.body);
  const loggedInUserId = req.user._id;
  const profileUserId = req.body.userId;
  const userId = req.body.userId; //profile
  const isFollowing = req.body.isFollowing;

  console.log("Is following", isFollowing);
  let searchFollowersOfProfile = {
    $push: {
      followers: loggedInUserId,
    },
  };
  let searchFollowingOfLoggedIn = {
    $push: {
      following: profileUserId,
    },
  };
  if (isFollowing) {
    searchFollowersOfProfile = {
      $pull: {
        followers: loggedInUserId,
      },
    };
    searchFollowingOfLoggedIn = {
      $pull: {
        following: profileUserId,
      },
    };
  }

  User.findOneAndUpdate(
    {
      _id: loggedInUserId,
    },
    searchFollowingOfLoggedIn,
    {
      new: true,
    },
    (err, loggedInUser) => {
      if (err) {
        res.status(200).json({
          status: "400",
          msg: "Cannot follow ",
        });
      } else {
        User.findOneAndUpdate(
          {
            _id: profileUserId,
          },
          searchFollowersOfProfile,
          {
            new: true,
          },
          (err, profileUser) => {
            if (err) {
              res.status(200).json({
                status: "400",
                msg: "Cannot add as a teacher ",
              });
            } else {
              console.log("follow wale part", profileUser);
              res.status(200).json({
                status: "200",
                msg: "Follow and following done",
                profileUser: profileUser,
                loggedInUser: loggedInUser,
              });
            }
          }
        );
      }
    }
  );
});

router.post("/changeattendee", (req, res, next) => {
  console.log(req.body);
  const isAttending = req.body.isAttending;
  let searchAttendee = {
    $push: {
      attendees: req.user._id,
    },
  };
  if (isAttending) {
    searchAttendee = {
      $pull: {
        attendees: req.user._id,
      },
    };
  }
  Post.findOneAndUpdate(
    {
      _id: req.body.postId,
    },
    searchAttendee,
    {
      new: true,
    },
    (err, post) => {
      if (err) {
        res.status(200).json({
          status: "400",
          msg: "Cannot follow ",
        });
      } else {
        console.log("attending ", post);
        res.status(200).json({
          status: "200",
          post: post,
          msg: "Attendees changed",
          isAttending: !isAttending,
        });
      }
    }
  );
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

  res.status(200).json({
    message: "Successful",
  });
  //res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
});

router.get("/login-failure", (req, res, next) => {
  console.log("login failure");
  res.status(400).json({
    message: "Login failure",
  });
});
router.get("/auth", isAuth, (req, res, next) => {
  res.status(200).json({
    status: 200,
    msg: "You made it to the route.",
    Authenticated: true,
    userId: req.user._id,
  });
});

router.get("/profile/:userId", async (req, res, next) => {
  const userId = req.params.userId;
  console.log("userId", userId);

  if (userId === "userkiprofile") {
    console.log("in if part ", req.user);
    res.status(200).json({
      status: 200,
      msg: "current user profile",
      user: req.user,
    });
  } else if (userId != null) {
    let data = await User.find(
      {
        _id: userId,
      },
      (err, User) => {
        console.log("in profile", User);
        if (!err)
          res.status(200).json({
            status: 200,
            msg: "current user profile",
            user: User[0],
          });
      }
    );
  } else
    res.status(210).json({
      message: "Can't get current user",
    });
});
router.get("/logout", (req, res, next) => {
  console.log("Logged out");
  req.logout();
  res.status(200).json({
    status: 200,
    msg: "current user logged out",
  });
});
router.get("/getpost/:userId", (req, res, next) => {
  console.log("Getting feeds");
  const userId = req.params.userId;
  let search = {};
  console.log("in post", userId);
  let loggedInUser = req.user;

  let isFollowing = loggedInUser.following.includes(userId);
  if (userId !== "userkiprofile") {
    search = {
      senderId: userId,
    };
  } else {
    console.log("post mai aa gaye", req.user);
    // search ={ following:{$elemMatch:  } }
    search = {
      senderId: req.user.following,
    };
  }

  Post.find(search, function (err, allPost) {
    if (err) {
      console.log(err);
      res.status(400).json({
        message: "can't get feeds",
      });
    } else {
      console.log("sare post", allPost);
      res.status(200).json({
        status: 200,
        post: allPost.sort((p1, p2) => (p1.dateTime > p2.dateTime ? -1 : 1)),
        isFollowing: isFollowing,
<<<<<<< HEAD
=======
        
>>>>>>> 951c5187a795649a9560a7aad64112c8fc4cc881
      });
    }
  });

  //res.status(200).json({status:200, post: posts});
});

router.get("/getfollowing", (req, res, next) => {
  console.log("get following praya");
  User.find({ _id: req.user.following }, (err, followingList) => {
    if (err) {
      res.json({ status: 200, following: [] });
    } else {
      followingList = followingList.map((element) => {
        return {
          username: element.username,
          _id: element._id,
        };
      });
      console.log("following list", followingList);
      res.json({ status: 200, following: followingList });
    }
  });
});

module.exports = router;
