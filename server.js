let express = require("express");
let app = express();
let reloadMagic = require("./reload-magic.js");
let express = require("express"); //creates endpoints
let multer = require("multer"); ///handles http requests from form submissions. It places data in the body property of the request object
let app = express(); // we will be creating endpoints for the images we upload
let upload = multer(); // we will be uploading images, signing up and logging in
let MongoClient = require("mongodb").MongoClient; //used to initiate connection
ObjectID = require("mongodb").ObjectID; //convert string to objectID
reloadMagic(app);

app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/", express.static("public")); // Needed for local assets
let dbo = undefined;
let url =
  "mongodb+srv://jeff:pwd123@cluster0-uckdj.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
  dbo = db.db("media-board");
});
// Your endpoints go after this line
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
// Your endpoints go before this line

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

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
app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
