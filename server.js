let express = require("express");
let app = express();
let reloadMagic = require("./reload-magic.js");
let multer = require("multer"); ///handles http requests from form submissions. It places data in the body property of the request object
let upload = multer({ dest: __dirname + "/uploads/" }); // we will be uploading images, signing up and logging in
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
// Your endpoints go after this line
app.post("/deleteAll", upload.none(), (req, res) => {
  console.log("inside /deleteAll");
  dbo.collection("products").deleteMany({});
  res.json({ success: true });
});
//Login Endpoint
app.post("/login", upload.none(), (req, res) => {
  console.log("login", req.body);
  let name = req.body.username;
  let pwd = req.body.password;
  dbo.collection("users").findOne({ username: name }, (err, user) => {
    if (err) {
      console.log("/login error", err);
      res.send(JSON.stringify({ success: false }));
      return;
    }
    if (user === null) {
      console.log("user = null");
      res.send(JSON.stringify({ success: false }));
      return;
    }
    if (user.password === pwd) {
      console.log("user pwd = pwd");
      res.send(JSON.stringify({ success: true }));
      return;
    }
    console.log("else, fail");
    res.send(JSON.stringify({ success: false }));
  });
});

//Signup Endpoint
app.post("/signup", upload.none(), (req, res) => {
  console.log("signup", req.body); //body is the data from signup from post component
  let name = req.body.username;
  let pwd = req.body.password;
  dbo.collection("users").findOne({ username: name }, (err, user) => {
    if (err) {
      console.log("/login error", err);
      res.send(JSON.stringify({ success: false }));
      return;
    }
    if (user === null) {
      console.log(name + " is available!");
      dbo.collection("users").insertOne({ username: name, password: pwd });
      res.send(JSON.stringify({ success: true }));
      return;
    }
    console.log(name + " unavailable");
    res.send(JSON.stringify({ success: false }));
  });
});

//Upload Form Endpoint
app.post("/createItem", upload.single("img"), (req, res) => {
  console.log("request to /createItem. body: ", req.body);
  let description = req.body.description;
  let brand = req.body.brand;
  let size = req.body.size;
  let price = req.body.price;
  let stock = req.body.stock;
  let seller = req.body.seller;
  let file = req.file; // the image file
  let frontendPath = "/uploads/" + file.filename;
  dbo.collection("products").insertOne({
    description: description,
    brand: brand,
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
    .find(req.query)
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

/*app.get("/image-userPage", upload.none(), (req, res) => {
  console.log("request to /image-userPage");
  let name = req.query.username;
  dbo
    .collection("products")
    .find({ seller: name }) //sort by everything the seller is selling. later on we will sort his wishlist and purchases
    .toArray((err, ps) => {
      if (err) {
        console.log("error", err);
        res.send(JSON.stringify({ success: false }));
        return;
      }
      console.log("products", ps);
      res.send(JSON.stringify(ps));
    });
});*/
// Your endpoints go before this line

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
