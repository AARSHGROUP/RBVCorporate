// this field is the mongoDB connection
// Mongoose is a connection of Database
require("dotenv").config();
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Db connected to the mongoose successfully"))
  .catch((err) => console.log("Db connection error", err));

// and this field is the PORT connection from mongoDB to node js throw express
// Express is a framework for backend
const express = require("express");

// 17.8 Multer function, Here multer are read of file, and bodyParser are read fi text from input field.
const multer = require("multer");
const path = require("path");

// 17.8.1 here i'll give of this destination path for upload of file with making const upload variable, and this upload variable will have to mention in post method of "api/services" of ".addServices" in "serviceController.js" file api path than..
// const upload = multer({ dest: "uploads/" });
const app = express();
const PORT = "https://rbvcorporate.onrender.com" || process.env.PORT_HOST;

// if i'm not use of this packages than i'll not getting any response like that title, description or etc.

// Cors use is a i can call from frontend or any url
const cors = require("cors");

// bodyParser is a passed of req and res
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 17.13 here ("/uploads")it's means i can get of image url in only this folder path, after give of static path than i'll copy of the image url "/99179ccae0cc1aaf1684ff99b8d5de11" from the terminal console and again open of "http://localhost:8000/99179ccae0cc1aaf1684ff99b8d5de11" in browser than i'll get of image (this image are not save in a viewing formate than now here i'll give the function is diskStorage for save in filename and fieldName) and than i'll open in paint sowftware than i can see of images it's means our images are goin on correct than.. but firstly i'll check for output in Vehicle Services than i'll go on "Vehicle.js" file with point 17.14
app.use("/uploads", express.static("uploads"));

// const upload = multer({ dest: "uploads/" });
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + "-" + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
}).single("images");

// SERVICES CONTROLLER API CALL
// 2.2
const serviceController = require("./controller/servicesController");
// 2.1.4 whenever i'll received request on PORT than our request is going on ServiceController's addServices throw "/api/services", and i can also take must request like that "addServices"
// THIS SECTION FOR USE GET ADD PRODUCT IN REDUCER
app.get("/api/services", serviceController.getServices);

//1. this is for demo that if i send the TC or postman of this /api/services than i'll get below object and send code
// app.get("/api/services", (req, res) => {
//   const _data = [{}, {}];
//   res.send({ code: 200, message: "success", data: _data });
// });

// 2. as soon i'll get the request from here to servicescontroller.js app.post with /api/services like that i'll received the data in servicescontroller.js, but here giving all commond on this that folder is servicescontroller than firstly i'll have to imPORT or required here so taht i can take all access throw api than..

// 17.8.2 and also here mention with (.single) funciton this functin are upload only single "file or image" and here "images" is bring from useState of firstArgument of file's input field from "serviceAdmin.js file" and now i'll go on "servicesController.js" file with point 17.9

app.post("/api/services", upload, serviceController.addServices);

//C1 CRUD OPERATION
// OUTPUT AFTER ADD PRODUCT for output
app.post("/api/edit-product", serviceController.editProduct);

// THIS SECTION FOR EDIT FILE INTERFACE AFTER CLICK ON EDIT BUTTON
app.get("/api/get-products/:id", serviceController.getProductById);

// THIS IS THE SECTION FOR EDIT
app.post("/delete-products", serviceController.deleteProducts);

// ADMIN CONTROLLER API CALL
// 13.9 firstly here i'll imPORT of this file so that i can give the all get admins data from admin to admincontroller
const adminController = require("./controller/adminController");

// 13.8 here i'll create of endpoint for get admins data from "/admin" api, if i hit of this "/admin/admins" (here not mention /api bcs now i'll find all data from admin so )api on our localhost than i'll get all admins lest by ".getAdmins" from adminController thats it.
// here if i want check of admins data in localhost than i mention this "/admin/admins" after localhost than can show
// now i'll go on client >> app.js file with point 13.9
// This api for get data for frontend
app.get("/admin/admins", adminController.getAdmins);

// 13.13 here i'll make addAdmins api using post method for tak all authentication using post method than.. and now i'll exPORT of this api where i was exPORT of ".getAdmins" in "adminController" than.. with point 13.14
// This api for add data for frontend to backend
app.post("/admin/admins", adminController.addAdmins);

// 14.3 here now i'll create the post api so that i can get login data frontend to backend an alos can generate of "jwt,  token for authenticate" , now i'll go on server >> "adminController.js" file with point 14.4
app.post("/admin/loginadmin", adminController.loginAdmin);

// 10.1 than here firstly i'll give the api call for backend and now go on servicesController file insdie of server >> controller >> servicesController file. with point 10.2
app.get("/api/slider", serviceController.getSlider);

app.get("/api/vehicleslider", serviceController.vehicleSlider);

// Step-1. host of our website firstly i'll bring of client folder inside of server and switch on client folder with help of cd client and hit enter and run "npm run build" and hit enter and then

// Step-2. const path = require("path")
app.use(express.static(path.join(__dirname, "./client/build")));

// "*" its means i'll get of all and here i'll sendFile of index.html get with this path
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
  // Step-3. now i'll login of github account and create new repository, after create repoository then, i'll download of github desktop and install of it and then login with github account with alread created github password enter and hit enter then, after login git desktop click on second right option (show in explorer) for git and then i'll create a "client" folder and copy of build folder inside of which generated inside of "client" folder and "paste inside of git "client" created folder and then i'll copy of all data which stored inside of server where i've give the code in rbvcorporate folder or rbvclone in and paste on outof gitdesktop below of client floder of all server copied data and then come again on git desktop software and give the comment with "file name e.g." and click on "commit to main" and after click on this button then i'll click come on new window on git desktop and click on published button, after published of this web code and go on github account for check, and then i'll show the code after publish on github account., and also change of concurrently code for "\npm run server\" after change get "\npm start\", and afte change of on the server >> pachakge.json then i'll go on again "git desktop" and again click on "commit button" and published and then refresh of github account thats it.

  // Step-4, After upload on github of mern code then i'll login on render.com and verified with our mail and then click on "click on webservice" and then i'll again clik on "right side github account in (connect account)", and also click on install with select of "all repository" and then i'll give the "github account password" for connect success login and then i'll get of all repository and which i want connect of repository then i'll click on "connect on the button then" i'll give the "name - rbvcorporate web", "select branch", "Runtime- Node", "Build Command -  "npm install"", "Start Command - npm start", "select free option", and click on last submit button "if i create of any .env file then will provide"
});

app.get("/", (req, res) => {
  res.send("Hello Er. Avinash!");
});

app.listen(PORT, () => {
  console.log(`AARSHPROJECT is running on PORT at : ${PORT}`);
});
