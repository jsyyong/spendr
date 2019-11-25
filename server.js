let express = require("express");
let app = express();
let reloadMagic = require("./reload-magic.js");
let multer = require("multer"); ///handles http requests from form submissions. It places data in the body property of the request object
let upload = multer({ dest: __dirname + "/uploads/" }); // we will be uploading images, signing up and logging in
let cookieParser = require("cookie-parser");
app.use(cookieParser());
let passwords = {};
let sessions = {};
let MongoClient = require("mongodb").MongoClient; //used to initiate connection
ObjectID = require("mongodb").ObjectID; //convert string to objectID
reloadMagic(app);

app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/uploads", express.static("uploads"));
let dbo = undefined;
let url =
  "mongodb+srv://jeff:pwd123@cluster0-uckdj.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, db) => {
    dbo = db.db("media-board");
  }
);

//Sessions Id Generator
let generateId = () => {
  return "" + Math.floor(Math.random() * 100000000);
};

// Your endpoints go after this line

//add newReview endpoint
app.post("/newReview", upload.none(), (req, res) => {
  let username = req.body.username;
  let message = req.body.msg;
  console.log("inside /newReview endpoint msg:" + message + " name" + username);
  dbo
    .collection("reviews")
    .insertOne(
      { message: message, username: username },
      (err, messageObject) => {
        if (err) {
          console.log("/newReview failed :(");
          res.send(JSON.stringify({ success: false }));
          return;
        }
        console.log("/newReview success!!");
        res.send(JSON.stringify({ success: true }));
      }
    );
});

//reviewMssages endpoint
app.post("/reviews", function(req, res) {
  if (sessions[req.cookies.sid] === undefined) {
    res.send(JSON.stringify({ loggedOut: true }));
    return;
  }
  let msgs = [...messages];
  while (msgs.length > 20) msgs.shift();
  res.send(JSON.stringify(msgs));
});

//deleteAll Endpoint
app.post("/deleteAll", upload.none(), (req, res) => {
  console.log("inside /deleteAll");
  dbo.collection("products").deleteMany({});
  res.json({ success: true });
});

//check-login endpoint
app.post("/check-login", upload.none(), (req, res) => {
  let sessionId = req.cookies.sessionId;
  console.log("session id", sessionId);
  dbo.collection("sessions").findOne({ sessionId: sessionId }, (err, user) => {
    if (err || user === null) {
      console.log("/check-login failed");
      res.send(JSON.stringify({ success: false }));
      return;
    }
    console.log("the name", user.username);
    let username = user.username;
    if (username !== undefined) {
      res.send(
        JSON.stringify({
          success: true,
          username: username,
          sessionId: sessionId
        })
      );
      return;
    }
    res.send(JSON.stringify({ success: false }));
  });
});

//cart endpoint
app.post("/cart", upload.none(), (req, res) => {
  console.log("request to /cart");
  // let name = req.query.username;
  // console.log("query username:", name);
  console.log("querystring", req.query);
  dbo
    .collection("cart")
    .find(req.query) //sort by everything the seller is selling. later on we will sort his wishlist and purchases
    // .find({})
    .toArray((err, cartItems) => {
      if (err) {
        console.log("error", err);
        res.send(JSON.stringify({ success: false }));
        return;
      }
      console.log("res.sending cartItems");
      res.send(JSON.stringify(cartItems));
    });
});

//addToCart endpoint
app.post("/addToCart", upload.none(), (req, res) => {
  let sessionId = req.body.sessionId;
  console.log("session id from /addToCart", sessionId);
  dbo.collection("sessions").findOne({ sessionId: sessionId }, (err, user) => {
    if (err || user === null) {
      console.log("/addToCart failed");
      res.send(JSON.stringify({ success: false }));
      return;
    }
    console.log("adding the product to user's session");
    dbo.collection("cart").insertOne({
      sessionId: sessionId,
      brand: req.body.brand,
      id: req.body.id,
      username: req.body.username,
      description: req.body.description,
      imgPath: req.body.imgPath,
      price: req.body.price,
      productName: req.body.productName,
      seller: req.body.seller,
      size: req.body.size,
      stock: req.body.stock
    });
    res.send(JSON.stringify({ success: true }));
  });
  return;
});

//deleteSingle endpoint
app.post("/deleteSingle", upload.none(), (req, res) => {
  console.log("inside /deleteSingle");
  let imgPath = req.query.imgPath;
  console.log("req query", imgPath);
  dbo.collection("products").remove({ imgPath: imgPath }, err => {
    if (err) {
      console.log("/deleteSingle fail");
      res.send(JSON.stringify({ success: false }));
    }
    res.send(JSON.stringify({ success: true }));
  });
});

//deleteSingleCart endpoint
app.post("/deleteSingleCart", upload.none(), (req, res) => {
  console.log("inside /deleteSingleCart");
  let _id = req.query._id;
  console.log("req query", _id);
  dbo.collection("cart").remove({ _id: ObjectID(_id) }, err => {
    if (err) {
      console.log("/deleteSingleCart fail");
      res.send(JSON.stringify({ success: false }));
    }
    console.log("cart deletion success!!");
    res.send(JSON.stringify({ success: true }));
  });
});

app.post("/deleteSession", upload.none(), (req, res) => {
  console.log("inside /deleteSession");
  let sessionId = req.query.sessionId;
  console.log("req query to be removed", sessionId);
  dbo.collection("sessions").remove({ sessionId: sessionId }, err => {
    if (err) {
      console.log("/deleteSession fail");
      res.send(JSON.stringify({ success: false }));
    }
    res.send(JSON.stringify({ success: true }));
  });
});

//Login Endpoint
app.post("/login", upload.none(), (req, res) => {
  console.log("login", req.body);
  let name = req.body.username;
  let enteredPassword = req.body.password;
  dbo.collection("users").findOne({ username: name }, (err, user) => {
    if (err || user === null || user.password !== enteredPassword) {
      console.log("/login error", err);
      res.send(JSON.stringify({ success: false }));
      return;
    }
    let sessionId = req.cookies.sessionId;
    dbo.collection("user").findOne({ sessionId: sessionId }, (err, session) => {
      if (session === null) {
        let sessionId = generateId();
        console.log("session", sessionId);
        dbo
          .collection("sessions")
          .insertOne(
            { username: name, sessionId: sessionId },
            (error, insertedSession) => {
              res.cookie("sessionId", sessionId);
              res.send(JSON.stringify({ success: true, sessionId: sessionId }));
            }
          );
      }
    });
    return;
  });
});

//Signup Endpoint
app.post("/signup", upload.none(), (req, res) => {
  console.log("signup", req.body); //body is the data from signup from post component
  let name = req.body.username;
  let pwd = req.body.password;

  dbo.collection("users").findOne({ username: name }, (err, user) => {
    if (err || user !== null) {
      console.log("/login error", err);
      res.send(JSON.stringify({ success: false }));
      return;
    }

    console.log(name + " is available!");
    //console.log("generate session id: ", sessionId);

    dbo
      .collection("users")
      .insertOne({ username: name, password: pwd }, (error, insertedUser) => {
        let sessionId = generateId();
        console.log("generated id", sessionId);

        dbo
          .collection("sessions")
          .insertOne(
            { username: name, sessionId: sessionId },
            (error, insertedSession) => {
              res.cookie("sessionId", sessionId);
              res.send(JSON.stringify({ success: true, sessionId: sessionId }));
              //return;
            }
          );
      });
    //res.send(JSON.stringify({ success: true }));
    return;
  });
});

//Upload Form Endpoint
app.post("/createProduct", upload.single("img"), (req, res) => {
  console.log("request to /createProduct. body: ", req.body);
  let description = req.body.description;
  let brand = req.body.brand;
  let productName = req.body.productName;
  let size = req.body.size;
  let price = req.body.price;
  let stock = req.body.stock;
  let seller = req.body.seller;
  let file = req.file; // the image file
  let frontendPath = "/uploads/" + file.filename;
  dbo.collection("products").insertOne({
    description: description,
    brand: brand,
    productName: productName,
    size: size,
    price: price,
    stock: stock,
    seller: seller,
    imgPath: frontendPath
  });
  res.send(JSON.stringify({ success: true }));
});

app.get("/searchResults", (req, res) => {
  console.log("request to /searchResults");
  console.log("queryString", req.query);
  dbo
    .collection("products")
    .find({ description: { $regex: req.query.description } })
    .toArray((err, ps) => {
      if (err) {
        console.log("error", err);
        res.send("fail");
        return;
      }
      console.log("product", ps);
      res.json(ps);
    });
});
//Images Endpoint
app.post("/product", upload.none(), (req, res) => {
  console.log("request to /product");
  // let name = req.query.username;
  // console.log("query username:", name);
  console.log("querystring", req.query);
  dbo
    .collection("products")
    .find(req.query) //sort by everything the seller is selling. later on we will sort his wishlist and purchases
    // .find({})
    .toArray((err, ps) => {
      if (err) {
        console.log("error", err);
        res.send(JSON.stringify({ success: false }));
        return;
      }
      //   console.log("products", ps);
      res.send(JSON.stringify(ps));
    });
});
// Your endpoints go before this line

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
