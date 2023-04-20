// 13.1 here firstly i'll import of mongoose than..

const mongoose = require("mongoose");

const adminModel = mongoose.model("adminData", {
  // here type String is define that this is a admin or subadmin
  type: String,
  userName: String,
  password: String,
  status: String,
  date: String,
});

module.exports = adminModel;

//13.2 admin or user create profile function and when i'll export on serviceModel file than it'll auto create file name in "adminData" in "mongoose Compass" after save, but here admin data will automatically save more than one bcs not mention any check condition that our data save only one time.
// This is for Demo checkup
// adminModel.create({
//   type: "ADMIN",
//   userName: "admin-default",
//   password: "pass123",
//   status: "ACTIVE",
//   date: new Date(),
// });

//13.3 now i'll create of api so that i can add all admin data after click on create admin data button than now i'll create a "adminController.js file" and now i'll go on this file with 13.4 point
