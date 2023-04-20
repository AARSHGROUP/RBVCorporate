const ServiceModel = require("../models/ServiceModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// 2.1 than i'll export of services to /api/services than

// this is the getServices for get request
module.exports.getServices = async (req, res) => {
  // 2.1.3 when i click on TC send button than i was get the of this data on ouput body for "addServices" and now i'll get the data "from serviceModel" using "find()" funciton for criteria like.
  //2.1.5 here if i give the empty code "ServiceModel.find({});" than i'll get all data from model and also i'll have to import on "index.js file" like addServices, and i can now get fetch the all data for frontend and now i'll go on frontend with point 3
  const _data = await ServiceModel.find({});
  if (_data) {
    return res.send({ code: 200, message: "success", data: _data });
  } else {
    return res.send({ code: 500, message: "Backend Server Error" });
  }
};

//2.1.1 this is the addServices for save request
module.exports.addServices = async (req, res) => {
  // 17.7 now i'll check that what do i get in console of req.body when i'll check on console just like that i get the blank object array (blank array bcs i'm not set a multer function (this function are store of image or file) so now i'll set the multer funciton and also will install of multer packages in backend) with given line on console than.., and now i'll go on server >> index.js file for give the multer function for import file with point 17.8
  // console.log(req.body, 37);

  // 17.9 here now i can give the only req so that i can get of fileName or body type than give the is only req and now give the deatail in input form with upload images and show the console result in Terminal, when i hit of "Add service" form's button than i get many result in servers' terminal like that file details or text input field details and etc.  than i'll alos check now of "file (for images) and body (for text input field)" with req method than..
  // console.log(req, 37);

  // 17.10 when i'll hit of Add Service Button than i can get on console and also on servers' terminal is "req.file's file details" and "req.body' input text details", and our images also send on our given "upload folder but this file is not readable because still now not set a "diskStorage function" so.." when i get of file and body in our console than i'll get of images using req.file.(path or filename (still then i'll not mention of diskStorage till then i can't use of filename only use of path like "req.file.path")) on backend than i'll mention in our below making const variable with point 17.11 than..
  console.log(req.file, req.body, 27);

  try {
    //15.4 and now will give here of some check or authentication for token bcs if user can get of the token and can change but not change from the backend than i'll give condition for check is...

    if (!req.headers.authorization) {
      // its means if any user want change or edit from frontend than backend authentication check are not give any access and will return again that same as place than i'll give the function is using return function than..
      return res.send({
        code: 403,
        message: "Not found Data for matching of credential data",
      });
    }

    // 15.2 now i'll make the const variable is "userDetail" with await function for bring of token with help of req from headers (where token is saved on fronted in authorization) neither body from backend with ".verify" function of jwt. token this is the first parameters and second paramaeters is secret key "PRIV_123" (this key is bring from server >> controller >> adminController.js file from ".loginAdmin" exports argument) bcs its .verify is taken a two argument and also above mention of "jwt" so that than..

    const userDetail = await jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    // 15.3 now i'll check on console and after giving console than i'll get the "iat (issue at tijme in milliseconds)" with some userDetails and than.
    // console.log(userDetail, 44);

    // 15.4 now i'll get the details of type inside of _doc from console than will give the code is ..
    // console.log(userDetail._doc.type, 47);

    // 15.5 now i'll check with give if condition for user type that if backend user type is not equal to from "userDetail._doc.type" will return error according to the given in return function but if equal with both than i'll get the success than..
    if (
      userDetail._doc.type !== "ADMIN" &&
      userDetail._doc.type !== "SUBADMIN" &&
      userDetail._doc.type !== "CUSTOMER"
    ) {
      return res.send({ code: 403, message: "Unauthorized data" });
    }

    // 15.6 here if userDetail.iat time and - (currentDate)is greaterThan or one "hour (3.06e6 miliseconds)" than return expired message. and now i'll go on frontend or client >> "ServicesAdmin.js" with point 15.7
    if (userDetail.iat - new Date().getTime() > 3.6e6) {
      return res.send({ code: 403, message: "Session has been expired" });
    }

    // 2.1.2 here i can bring of servicess like "title, description" from req (i can get much like that body, params etc.) and send to the servicess on "index.js", according to the "ServicesModel" than firstly i'll required of bring the access of model than above will import.
    const title = req.body.title;
    const description = req.body.description;
    // 17.11 get of req.file's path making const variable imagesUrl and also give condition below if any issues than..
    const imagesUrl = req.file.path;

    // 21.2 also here should mentioned
    const servicetype = req.body.servicetype;
    const amount = req.body.amount;
    const seller = req.body.seller;

    // 21.3 and also here
    // here give condtion when didn't get of it than
    if (
      !title ||
      !description ||
      !imagesUrl ||
      !servicetype ||
      !amount ||
      !seller
    ) {
      return res.send({ code: 400, message: "Bad Request" });
    }

    const newServices = new ServiceModel({
      title: title,
      description: description,
      //17.12 here imageFile are bring from ServiceModel Schema and imagesUrl is bring from above mention const variable. and now when i hit on add services than i'll get a data array on console but not get and find error messages bcs i did not specify of static folder by the diskStorage than firstly i'll set of this static folder and will send again than i'll go on server >> index.js file with point 17.13 than..
      imageFile: imagesUrl,

      // 21.4 and also here will mention for save method
      servicetype: servicetype,
      amount: amount,
      seller: seller,
    });

    const success = await newServices.save();
    if (success) {
      return res.send({ code: 200, message: "success" });
    } else {
      return res.send({ code: 500, message: "Backend Server Error" });
    }
  } catch (err) {
    res.send({ code: 500, message: "Internal Server Err." });
  }
};

// UPDATE-PRODUCT AFTER CLICK ON UPDATE BUTTON FOR CHANGE DATA FOR SHOW OUTPUT
// 8.1
module.exports.editProduct = async (req, res) => {
  let newData = {};

  console.log(req.body, 102);
  console.log(req.body.title, 103);

  if (req.body.title) {
    newData["title"] = req.body.title;
    // or
    // newData = { ...newData, title: req.body.title };
  } else {
    return console.log("data not found");
  }

  if (req.body.description) {
    newData["description"] = req.body.description;
  }
  if (req.body.amount) {
    newData["amount"] = req.body.amount;
  }
  if (req.body.imageFile) {
    newData["imageFile"] = req.body.imageFile;
  }
  if (req.body.servicetype) {
    newData["servicetype"] = req.body.servicetype;
  }
  if (req.body.seller) {
    newData["seller"] = req.body.seller;
  }

  const id = req.body.id;
  console.log(req.body.id, 136);

  let filter = { _id: id };

  let doc = await ServiceModel.findOneAndUpdate(filter, newData, {
    new: true,
  });

  console.log(doc, 145);

  if (doc) {
    res.send({ code: 200, message: "data updated success", data: doc });
  } else {
    res.send({
      code: 500,
      message: "Updated data not found from the server",
    });
  }
};

// GET-EDIT_PRODUCT_ById FOR UPDATE
// 9 here if i get product by id for edit which i want update data with id than i can give this function then..
module.exports.getProductById = async (req, res) => {
  console.log(req.params, 162);
  console.log(req.query, 163);
  let data = await ServiceModel.findById(req.params.id);

  // 9.1 now i'll check if data available with "if condition", after giving this function i call of it module in server >> index.js file with point 9.2
  if (data) {
    res.send({ code: 200, message: "fetch data by id success", data: data });
  } else {
    res.send({
      code: 500,
      message: "fetching data not found from the server",
    });
  }
};

// DELETE SELECTED PRODUCT...
// 11.6 here i'll give the backend code for controller of delete function with help module expter and this "deleteProducts" have already done api call then...
module.exports.deleteProducts = async (req, res) => {
  console.log(req.body, 185);

  const ids = req.body;
  const response = await ServiceModel.deleteMany({ _id: { $in: ids } });

  if (response) {
    res.send({
      code: 200,
      message: "server data deleted success",
      data: response,
    });
  } else {
    res.send({
      code: 500,
      message: "server delete getting some error",
    });
  }
};

// 10.2 now i'll create and export of Slider in "servicesController.js file" by the ServiceModel.js file than.. same as per above created and export of .getSlider so that firstly i'll gett all data with fetch api and after than addServices than..
module.exports.getSlider = (req, res) => {
  // and now i'll return of array[] and these array will be images which is created by the admin now i'll go on client >> components >> Carousel.js with point 10.3 for get images from backned to frontend for show than..
  const url1 =
    "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  const url2 =
    "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  const url3 =
    "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=600";
  const url4 =
    "https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=600";
  const array = [url1, url2, url3, url4];
  return res.send({ code: 200, message: "success", data: array });
};

module.exports.vehicleSlider = (req, res) => {
  const url3 =
    "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=600";
  const url4 =
    "https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=600";
  const array = [url3, url4];
  return res.send({ code: 200, message: "success", data: array });
};
