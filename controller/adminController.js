// require("dotenv").config();
var jwt = require("jsonwebtoken");
// 13.4 here i'll make the add and get service for admin Data than same i'll create like serviceController than some data i'll copy from their

// 13.5 firstly i'll import of it "AdminModel" Schemas and get all schema's data from AdminModel to adminController
const AdminModel = require("../models/AdminModel");

// 13.6 here i'll find of all data and get all schema's data from AdminModel to adminController
//13.7 and now i'll go on server >> index.js file for import and create of getAdmin EndPoint with point 13.8

// this is the getAdmins for get request
module.exports.getAdmins = async (req, res) => {
  const _data = await AdminModel.find({});
  if (_data) {
    return res.send({ code: 200, message: "success", data: _data });
  } else {
    return res.send({ code: 500, message: "Backend Server Error" });
  }
};

// 13.14 here i'll built of this code and than firstly get the all mandate data with const destructuring variable with help of req body using async await func than..
module.exports.addAdmins = async (req, res) => {
  // 13.15 here all data will bring from frontend when i'll create api than..
  const { userName, password, type, status, date } = req.body;

  // 13.16 here i'll create which is pass of object inside of ".create()" function than.. and get result in making const variable is "_adminresult" and below make the condition for get or not get data, now i'll go on "POSTMAN APP or TC" for check the data using "post method" than.. now i'll show of our all list in frontend >> listAdmins.js file than i'll go with point 13.17
  const _adminresult = await AdminModel.create({
    userName,
    password,
    type,
    status,
    date,
  });
  if (_adminresult) {
    return res.send({ code: 200, message: "success", data: _adminresult });
  } else {
    return res.send({ code: 500, message: "Backend Server Error" });
  }
};

// 14.4 now i'll find the username or password from adminModel with the help of "findOne()" by the req body than
module.exports.loginAdmin = async (req, res) => {
  const { userName, password } = req.body;
  // 14.4.1 now i'll find the of user that user are exist or not making variable "userExists" than.. with the help of findOne base of of "userName and password" than..
  const userExists = await AdminModel.findOne({ userName: userName });
  // 14.4.2 and also here give the "if condition" if "userExists" than give true otherwise error..
  if (userExists) {
    // 14.4.3 and also give the condition is that if "userExists" that password (which password received from Backend AdminModel's password in created schema's password) not matched or not equal to with received password from frontend input password field of body with help of "req.body" if both password matched than
    if (userExists.password !== password) {
      return res.send({
        code: 400,
        message: "Username or Password does not exist",
      });
    }

    // 14.4.4 but our userName or password matched than i'll return of "userExists" and also converted on token and return success for next step like succcess messages, with the making const variable "_token" otherwise if not matched than give message is above mention error is "Username or Password does not exist" than..

    // 14.4.5 and than i'll token generate with help of "npm jwt search in browser and copy the package" thna i'll install packages of "npm i jsonwebtoken" in server in new terminal, and here i can give here the expairy date or validate of "jsonwebtoken", and also import with require above, and also below described of jwt with ".sign()" function this ".sign() is taken the one of the object like "userExists"". If this userExists than i'll get the success message and along with i'll give the privateKey (this privatekey "PRIV_123" is defined manually about me so that our password made strong). When i'll get the error than i'll give the code is like this type "{ ...userExists } it's means i can get one by one value which is send of all value" and now i'll get finally token with this type process on console than..
    const _token = jwt.sign({ ...userExists }, "PRIV_123");
    console.log("admin token getting error", _token, 61);

    // and here i can show on console of it
    console.log(userExists, 61);
    // 14.4.6 and now i'll return of user type (this user type which is exist in adminModel's Schema type, here userExists are give me type which is above import is "AdminModel.js file") with token after successive message than..
    return res.send({
      code: 200,
      message: "Backend Server LoginAdmin found success",
      token: _token,
      //14.4.7 here i'll show the content based of user type. and now i'll go on "LoginAdmin.js" file with point 14.5
      type: userExists.type,
    });
  } else {
    return res.send({
      code: 500,
      message: "Backend Server LoginAdmin found Error",
    });
  }
};
