let express = require("express");
let app = express();
let reloadMagic = require("./reload-magic.js");
let multer = require("multer"); ///handles http requests from form submissions. It places data in the body property of the request object
let upload = multer({ dest: __dirname + "/uploads/" }); // we will be uploading images, signing up and logging in
let MongoClient = require("mongodb").MongoClient; //used to initiate connection
ObjectID = require("mongodb").ObjectID; //convert string to objectID
reloadMagic(app);

app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/uploads", express.static("uploads")); // Needed for local assets
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
      console.log(name + "is available!");
      dbo.collection("users").insertOne({ username: name, password: pwd });
      res.send(JSON.stringify({ success: true }));
      return;
    }
    console.log(name + " unavailable");
    res.send(JSON.stringify({ success: false }));
  });
});

//Upload Form Endpoint
app.post("/new-upload", upload.single("img"), (req, res) => {
  console.log("request to /new-post. body: ", req.body);
  let description = req.body.description;
  let file = req.file;
  let frontendPath = "/uploads/" + file.filename;
  dbo
    .collection("posts")
    .insertOne({ description: description, frontendPath: frontendPath });
  res.send(JSON.stringify({ success: true }));
});

//All Images Endpoint
// Your endpoints go before this line

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
