const router = require("express").Router();
const passport = require("passport");
const genPassword = require("../lib/passwordUtils").genPassword;
const connection = require("../config/database");
const User = require("../models/user/model");
const isAuth = require("./authMiddleware").isAuth;
const isAdmin = require("./authMiddleware").isAdmin;
const Post = require("../models/post/model");

var nodemailer = require("nodemailer");
const { check, validationResult } = require("express-validator");
// const nodemailer = require("nodemailer");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { uploadSingleFile, downloadFIle } = require("../helper/fileUpload");
/**
 * -------------- POST ROUTES ----------------
 */
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com", //replace with your email provider
//   port: 3000,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASSWORD,
//   },
// });
// transporter.verify(function (error, success) {
//   if (error) {
//     console.log("error aa gyi h ", error);
//   } else {
//     console.log("Server is ready to take our messages");
//   }
// });
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

router.post("/updateavataar", async (req, res, next) => {
  const url = await uploadSingleFile(req.files.file);
  if (!url) {
    return res.status(210).json({
      status: "210",
      msg: "error in uploading avataar",
    });
  }
  const date = new Date();
  const avataar = {
    dateModified: date,
    link: url,
  };
  User.findOneAndUpdate(
    {
      _id: req.user._id,
    },
    {
      avataar: avataar,
    },
    {
      new: true,
    },
    (err, updatedUser) => {
      if (err) {
        res.status(210).json({
          status: "400",
          msg: "Cannot update profile ",
        });
      } else {
        console.log(updatedUser);
        res.status(200).json({
          status: "200",
          msg: "avataar updated",
          updatedUser: updatedUser,
        });
      }
    }
  );
});

router.post("/updateprofile", (req, res, next) => {
  console.log(req.body);

  User.findOneAndUpdate(
    {
      _id: req.user._id,
    },
    {
      isTeacher: req.body.isTeacher,
      areasOfInterest: req.body.areasOfInterest,
      qualifications: req.body.qualifications,
      email: req.body.email,
      username: req.body.username,
      phone: req.body.phone,
    },
    {
      new: true,
    },
    (err, updatedUser) => {
      if (err) {
        res.status(200).json({
          status: "400",
          msg: "Cannot update profile ",
        });
      } else {
        console.log(updatedUser);
        res.status(200).json({
          status: "200",
          msg: "profile updated",
          updatedUser: updatedUser,
        });
      }
    }
  );
});
router.post("/giveRating", (req, res, next) => {
  console.log("Rating ", req.body);
  const loggedInUserId = req.user._id;
  User.find(
    {
      _id: req.body.profileId,
    },
    (err, profileUser) => {
      if (!err) {
        let rating = profileUser[0].Rating;
        let Rating = {
          senderId: loggedInUserId,
          description: req.body.description,
          rating: parseInt(req.body.rating),
        };
        let flag = false;
        rating = rating.filter(
          (element) =>
            !(element.senderId && element.senderId.equals(req.user._id))
        );
        rating.push(Rating);
        let sumRating = 0;
        rating.map((element) => {
          sumRating = sumRating + (element.rating ? element.rating : 0);
        });
        let globalRating =
          rating.length > 0 ? (sumRating / rating.length).toPrecision(2) : 0;
        User.findOneAndUpdate(
          {
            _id: req.body.profileId,
          },
          { Rating: rating, globalRating: globalRating },
          (err, profileUser1) => {
            if (err) {
              res.status(200).json({
                status: "400",
                msg: "Cannot add rating",
              });
            } else {
              console.log("rating done", profileUser1);
              res.status(200).json({
                status: "200",
                msg: "added rating successfully",
                profileUser: profileUser1,
              });
            }
          }
        );
      }
    }
  );
});

// let userRating = {
//   $push: {
//     Rating: rating,
//   },
// };

router.post("/addpost", (req, res, next) => {
  console.log("post ko add kiya", req.body);
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
  var startDate = new Date(req.body.post.startDate);
  var formattedStartDate = startDate.toLocaleString("en-US", {
    weekday: "short", // long, short, narrow
    day: "numeric", // numeric, 2-digit
    year: "numeric", // numeric, 2-digit
    month: "long", // numeric, 2-digit, long, short, narrow
    hour: "numeric", // numeric, 2-digit
    minute: "numeric", // numeric, 2-digit
    // numeric, 2-digit
  });

  console.log("formatted start date", formattedStartDate);
  +"/";

  var endDate = new Date(req.body.post.endDate);

  var duration = Math.abs(endDate - startDate);

  duration = duration / (1000 * 60 * 60);
  duration = duration.toPrecision(2);
  console.log("difference", duration);

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
    duration: duration,
    comments: [],
    attendees: [],
    likes: [],
    senderAvataar: req.user.avataar ? req.user.avataar.link : null,
  });
  //console.log(newPost);
  newPost
    .save()
    .then((post) => {
      console.log("asdfgh");
      let newNotification = {
        $push: {
          notifications: {
            type: "post",
            senderId: req.user._id,
            description: req.user.username + " sent a post",
            clickableLink: "/posts/" + newPost._id,
            senderName: req.user.username,
            senderAvatar: req.user.avataar.link,
            Date: currentdate,
          },
        },
      };
      console.log("asdf", post);
      let followers = req.user.followers;
      followers.map((id) => {
        console.log("iddddddddddddd", id);
        User.findOneAndUpdate(
          {
            _id: id,
          },
          newNotification,
          {
            new: true,
          },
          (err, loggedInUser) => {
            //console.log("@@@@@@",loggedInUser);
            if (err) {
              res.status(200).json({
                status: "400",
                msg: "Cannot add post ",
              });
            } else {
              if (loggedInUser) {
                console.log("successful", loggedInUser.username);
              }
            }
          }
        );
      });
      res.status(200).json({ status: "200", msg: "Added post successfully" });
    })
    .catch((error) =>
      res.status(200).json({ status: "400", message: "error" })
    );
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
        res.status(200).json({
          status: "400",
          msg: "Cannot follow ",
        });
      } else {
        let newNotification = {
          $push: {
            notifications: {
              type: "comments",
              senderId: req.user._id,
              description: req.user.username + " commented on your post",
              clickableLink: "/posts/" + postid,
              senderName: req.user.username,
              senderAvatar: req.user.avataar.link,
              Date: currentdate,
            },
          },
        };
        User.findOneAndUpdate(
          {
            _id: Post.senderId,
          },
          newNotification,
          {
            new: true,
          },
          (err, loggedInUser) => {
            //console.log("@@@@@@",loggedInUser);
            if (err) {
              res.status(200).json({
                status: "400",
                msg: "Cannot update notification",
              });
            } else {
              if (loggedInUser) {
                console.log("successful", loggedInUser.username);
              }
            }
          }
        );
        res.status(200).json({
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
  let recieveremail = req.body.email;
  let recievername = req.body.username;
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  User.find({ email: req.body.email }, (err, user) => {
    if (err) {
      res.status(210).json({
        msg: "Some error occurred",
        status: "210",
      });
    }

    if (user.length) {
      res.status(210).json({
        status: "210",
        msg: "User already exist",
      });
    }
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
      Rating: [],
    });

    const token = jwt.sign(
      {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
      },
      process.env.JWT_KEY,
      { expiresIn: "60m" }
    );
    const CLIENT_URL = "http://" + req.headers.host;
    const output = `<h2>Please click on below link to activate your account</h2>
                    <p>${CLIENT_URL}/activate/${token}</p>   
                    <p><b>NOTE: </b> The above activation link expires in 60 minutes.</p>
                                  `;
    const transporter = nodemailer.createTransport({
      // host: 'mail.google.com',
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const mailOptions = {
      from: '"GYAANDAAN"',
      to: req.body.email,
      subject: "Account Verification:",
      text: "",
      html: output,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(210).json({
          status: "210",
          msg: "Some error occurred",
        });
        // req.flash('error',"Something went wrong on our end. Please register again");
        // res.redirect('/register');
      } else {
        console.log("Message sent: %s", info.messageId);
        res.status(200).json({
          status: "200",
          msg: "Mail has been sent to you email for verification",
        });
        // req.flash('success',"Activation link sent to registered email ID. Please activate to log in.");
        //res.redirect('/login');
      }
    });
  });
});

router.post("/changeLike", (req, res, next) => {
  console.log(req.body);
  const loggedInUserId = req.user._id;
  const postid = req.body.postid;
  const isLiked = req.body.isLiked;
  const currentdate = new Date();

  let searchPost = {
    $push: {
      likes: loggedInUserId,
    },
  };
  if (isLiked) {
    searchPost = {
      $pull: {
        likes: loggedInUserId,
      },
    };
  }
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
        res.status(210).json({
          status: "210",
          msg: "Cann't like ",
        });
      } else {
        if (!isLiked) {
          let newNotification = {
            $push: {
              notifications: {
                type: "likes",
                senderId: req.user._id,
                description: req.user.username + " liked your post",
                clickableLink: "/posts/" + postid,
                senderName: req.user.username,
                senderAvatar: req.user.avataar.link,
                Date: currentdate,
              },
            },
          };
          User.findOneAndUpdate(
            {
              _id: Post.senderId,
            },
            newNotification,
            {
              new: true,
            },
            (err, loggedInUser) => {
              //console.log("@@@@@@",loggedInUser);
              if (err) {
                res.status(200).json({
                  status: "400",
                  msg: "Cannot update notification",
                });
              } else {
                if (loggedInUser) {
                  console.log("successful", loggedInUser.username);
                }
              }
            }
          );
        }

        console.log(Post, "Like");
        res.status(200).json({
          status: "200",
          msg: "Liked",
          likes: Post.likes,
          isLiked: Post.likes.includes(loggedInUserId),
        });
      }
    }
  );
});
//   var mail = {
//     from: recievername,
//     to: recieveremail, // receiver email,
//   };

//   transporter.sendMail(mail, (err, data) => {
//     if (err) {
//       res.json({
//         status: "fail",
//       });
//     } else {
//       res.json({
//         status: "success",
//       });
//     }
//   });
// });
//   newUser.save().then((user) => {
//     console.log(user);
//     res.status(201).json({
//       message: "User registered successfully",
//       user: user,
//     });
//   });
// });

router.get("/activate/:token", function (req, res) {
  const token = req.params.token;
  if (token) {
    jwt.verify(token, process.env.JWT_KEY, function (err, decodedToken) {
      if (err) {
        console.log(err);
        //req.flash('error','Incorrect or expired link! Please register again.');
        // res.redirect('/register');
      } else {
        User.findOne({ email: decodedToken.email }).then((foundUser) => {
          if (foundUser) {
            res.render("response", {
              url: process.env.FRONT_END_URL,
              msg: "Account already verified, now u can login",
            });
            // req.flash('error','Email ID already registered! Please log in.');
            // res.redirect('/login');
          } else {
            const saltHash = genPassword(decodedToken.password);
            // console.log(req.body);
            const salt = saltHash.salt;
            const hash = saltHash.hash;
            const newUser = new User({
              username: decodedToken.username,
              email: decodedToken.email,
              password: decodedToken.password,
              phone: decodedToken.phone,
              hash: hash,
              salt: salt,
              isTeacher: false,
              followers: [],
              following: [],
              qualifications: "",
              areasOfInterest: [],
              Rating: [],
            });
            newUser.save().then((user) => {
              console.log(user);
              res.render("response", {
                url: process.env.FRONT_END_URL,
                msg: "Account verified, now you can login",
              });
            });
          }
        });
      }
    });
  } else {
    console.log("Account activation error");
    req.flash("error", "INTERNAL SERVER ERROR");
  }
});
router.post("/changeFollower", (req, res, next) => {
  console.log(req.body);
  const loggedInUserId = req.user._id;
  const profileUserId = req.body.userId;
  const userId = req.body.userId; //profile
  const isFollowing = req.body.isFollowing;
  const currentdate = new Date();

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
              if (!isFollowing) {
                let newNotification = {
                  $push: {
                    notifications: {
                      type: "follow",
                      senderId: req.user._id,
                      description: req.user.username + " started following you",
                      clickableLink: "/profile/" + req.user._id,
                      senderName: req.user.username,
                      senderAvatar: req.user.avataar.link,
                      Date: currentdate,
                    },
                  },
                };
                User.findOneAndUpdate(
                  {
                    _id: profileUserId,
                  },
                  newNotification,
                  {
                    new: true,
                  },
                  (err, profileUser) => {
                    //console.log("@@@@@@",profileUser);
                    if (err) {
                      res.status(200).json({
                        status: "400",
                        msg: "Cannot update notification",
                      });
                    } else {
                      if (profileUser) {
                        console.log("successful", profileUser.username);
                      }
                    }
                  }
                );
              }
              console.log("follow wale part", profileUser);
              res.status(200).json({
                status: "200",
                msg: isFollowing
                  ? "Unfollowed sucessfully"
                  : "Followed successfully",
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
router.get("/posts/:postId", async (req, res, next) => {
  const postId = req.params.postId;
  console.log("postId", postId);
  let data = await Post.find(
    {
      _id: postId,
    },
    (err, Post) => {
      if (Post && Post.length) {
        res.status(200).json({
          status: 200,
          msg: "current Post",
          post: Post[0],
          user: req.user,
        });
      } else {
        res.status(210).json({
          msg: "Can't get current post",
        });
      }
    }
  );
});
router.get("/profile/:userId", async (req, res, next) => {
  console.log("getprofile");
  let currentdate = new Date();
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
    console.log("ab to dikha do profile");
    let data = await User.find(
      {
        _id: userId,
      },
      (err, Users) => {
        console.log("in profile", Users[0].Rating);

        if (!err) {
          let sumRating = 0;

          var userRating = Users[0].Rating.find(
            ({ senderId }) =>
              senderId && senderId.equals(req.user ? req.user._id : 0)
          );
          User.find(
            {
              _id: userId,
            },
            (err, profileUser) => {
              //console.log("@@@@@@",profileUser);
              if (err) {
                res.status(200).json({
                  status: "400",
                  msg: "Cannot update notification",
                });
              } else {  
                var senderAlreadyPresent = false;
                if (profileUser) {
                  console.log("55555555", profileUser[0].notifications);
                  notifications = profileUser[0].notifications;
                  notifications.forEach((notification) => {
                    notification = notification.toJSON();
                    if (notification.type === "viewed" && notification.senderId.equals(req.user._id)) {
                        senderAlreadyPresent = true;
                        console.log("99999999999");
                    }
                  });
                  if (senderAlreadyPresent===false){
                    let newNotification = {
                      $push: {
                        notifications: {
                          type: "viewed",
                          senderId: req.user._id,
                          description: req.user.username + " viewed your profile",
                          clickableLink: "/profile/" + req.user._id,
                          senderName: req.user.username,
                          senderAvatar: req.user.avataar ? req.user.avataar.link : "",
                          Date: currentdate,
                        },
                      },
                    };
                    User.findOneAndUpdate(
                      {
                        _id: userId,
                      },
                      newNotification,
                      {
                        new: true,
                      },
                      (err, profileUser) => {
                        //console.log("@@@@@@",profileUser);
                        if (err) {
                          res.status(200).json({
                            status: "400",
                            msg: "Cannot update notification",
                          });
                        } else {
                          if (profileUser) {
                            console.log("successful", profileUser.username);
                          }
                        }
                      }
                    );
                    res.status(200).json({
                      status: 200,
                      msg: "current user profile",
                      user: Users[0],
                      userRating: userRating ? userRating : "0",
                      loggedInUser: req.user,
                      globalRating: Users[0].globalRating,
                    });
              }
              else{
                res.status(200).json({
                  status: 200,
                  msg: "current user profile",
                  user: Users[0],
                  userRating: userRating ? userRating : "0",
                  loggedInUser: req.user,
                  globalRating: Users[0].globalRating,
                });
              }
            }
          }
        });
          //   User.findOneAndUpdate(
          //     {
          //       _id: userId,
          //     },
          //     newNotification,
          //     {
          //       new: true,
          //     },
          //     (err, profileUser) => {
          //       //console.log("@@@@@@",profileUser);
          //       if (err) {
          //         res.status(200).json({
          //           status: "400",
          //           msg: "Cannot update notification",
          //         });
          //       } else {
          //         if (profileUser) {
          //           console.log("successful", profileUser.username);
          //         }
          //       }
          //     }
          //   );
          // res.status(200).json({
          //   status: 200,
          //   msg: "current user profile",
          //   user: Users[0],
          //   userRating: userRating ? userRating : "0",
          //   loggedInUser: req.user,
          //   globalRating: Users[0].globalRating,
          // });
        }
    else{
    res.status(210).json({
      message: "Can't get current user",
    });
  }
});
  }
}
);
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
      let currentDate = new Date();
      let past = [];
      let upcoming = [];
      allPost.map((post) => {
        if (post.startDate && post.duration) {
          console.log("**************", post.endDate, "   ", post.startDate);
          if (post.endDate < currentDate) {
            past.push(post);
          } else {
            upcoming.push(post);
          }
        }
      });

      upcoming = upcoming.map((post) => {
        post = post.toJSON();
        return {
          ...post,
          isLive: currentDate >= post.startDate && currentDate <= post.endDate,
        };
      });

      res.status(200).json({
        status: 200,
        post: allPost.sort((p1, p2) => (p1.dateTime > p2.dateTime ? -1 : 1)),
        isFollowing: isFollowing,
        past: past.sort((p1, p2) => (p1.endDate > p2.endDate ? -1 : 1)),
        upcoming: upcoming.sort((p1, p2) =>
          p1.startDate > p2.startDate ? 1 : -1
        ),
      });
    }
  });

  //res.status(200).json({status:200, post: posts});
});

router.get("/getfollowing", (req, res, next) => {
  console.log("get following praya");

  User.find(
    {
      _id: req.user ? req.user.following : 0,
    },
    (err, followingList) => {
      if (err) {
        res.json({
          status: 200,
          following: [],
        });
      } else {
        followingList = followingList.map((element) => {
          return {
            username: element.username,
            _id: element._id,
          };
        });
        console.log("following list", followingList);
        res.json({
          status: 200,
          following: followingList,
        });
      }
    }
  );
});

router.get("/getTopRated", (req, res) => {
  //let users ;
  console.log("top");
  User.find({}, (err, users) => {
    if (!err) {
      console.log("bissu", users);
      users.map((user) => {
        username: user.username;
        id: user._id;
        globalRating: user.globalRating;
      });
      res.status(200).json({ message: "toprated users", users });
    }
  })
    .sort({ globalRating: -1 })
    .limit(7);
});

//   }).sort({ "globalRating": -1 }).limit(7);

// })

router.get("/getTopContributors", (req, res) => {
  //let users ;
  console.log("top");
  Post.aggregate([
    {
      $match: { endDate: { $lt: new Date() } },
    },
    {
      $group: {
        _id: { senderId: "$senderId", name: "$name" },
        totalPosts: { $sum: 1 },
      },
    },
    {
      $sort: {
        totalPosts: -1,
      },
    },
  ])
    .limit(7)
    .then((result) =>
      res.status(200).json({ message: "***top contributors***", result })
    )
    .catch((error) => res.status(200).json({ message: "error", result: {} }));
});

router.get("/getUpcomingClasses", (req, res) => {
  let currentDate = new Date();
  Post.find(
    { attendees: req.user._id, startDate: { $gt: currentDate } },
    (err, classes) => {
      if (!err) {
        console.log("upcoming classes", classes);

        let newClasses = classes.map((newClass) => {
          newClass = newClass.toJSON();
          console.log("date di jaa chuki", newClass.startDate, currentDate);
          const diffTime = Math.abs(newClass.startDate - currentDate);
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
          const diffHours = diffTime / 36e5;
          return {
            ...newClass,
            difference:
              diffDays < 1
                ? Math.floor(diffHours) + " hours"
                : diffDays + " days",
          };
        });

        res
          .status(200)
          .json({ message: "upcoming classes", classes: newClasses });
      }
    }
  )
    .sort({ startDate: 1 })
    .limit(2);
});
router.get("/getNotifications", (req, res) => {
  let recentNotifications = [],
    earlierNotifications = [];
  var HOUR = 60 * 60 * 1000;
  var currentDate = new Date();

  req.user.notifications.map((notification) => {
    notification = notification.toJSON();

    //console.log('inside notifications',notification.Date,currentDate-notification.Date<10*HOUR);
    const diffTime = Math.abs(notification.Date - currentDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / 36e5);
    const diffMinutes = Math.floor(diffTime / 6e4);
    let notification1 = notification;
    if (diffMinutes < 60)
      notification1 = { ...notification1, difference: diffMinutes + " m" };
    else if (diffHours < 24)
      notification1 = { ...notification1, difference: diffHours + " h" };
    else notification1 = { ...notification1, difference: diffDays + " d" };
    console.log("changed notification", notification1);
    if (currentDate - notification.Date < 10 * HOUR)
      recentNotifications.push(notification1);
    else earlierNotifications.push(notification1);
  });
  earlierNotifications.sort((p1, p2) => (p1.Date > p2.Date ? -1 : 1));
  recentNotifications.sort((p1, p2) => (p1.Date > p2.Date ? -1 : 1));

  res.status(200).json({
    status: "200",
    message: "notification",
    earlierNotifications: earlierNotifications,
    recentNotifications: recentNotifications,
  });
});
module.exports = router;
