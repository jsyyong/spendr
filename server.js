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
  let username = dbo
    .collection("session")
    .find({ session: sessionId }, (err, user) => {
      if (err) {
        console.log("/check-login failed");
        return;
      }
      return user.username;
    });
  console.log("username", username);
  if (username !== undefined) {
    res.send(JSON.stringify({ success: true }));
    return;
  }
  res.send(JSON.stringify({ success: false }));
});

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
              res.send(JSON.stringify({ success: true }));
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
              res.send(JSON.stringify({ success: true }));
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
