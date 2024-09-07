// const FetchMyPosts = require("../controllers/User/FetchMyPosts");
const GetTime = require("../controllers/User/GetTime.js");
const Login= require("../controllers/User/Login.js");
const Register = require("../controllers/User/Register.js");
const ChangePsd = require('../controllers/User/ChangePsd.js')
const AuthHandler = require("../middlewares/AuthHandler.js");
// const AuthHandler = require("../middlewares/Auth");
// const FetchUsersCtrl = require("../controllers/User/FetchUsers");

const UserRoutes = require("express").Router();

UserRoutes.route("/").post(Register);

UserRoutes.route("/login").post(Login);

// for development purposes
UserRoutes.route('/time').get( GetTime);
UserRoutes.route('/changePsd').get(AuthHandler, ChangePsd);
// UserRoutes.route("/fetch").get(AuthHandler, FetchUsersCtrl);

// UserRoutes.route("/myPosts").get(AuthHandler, FetchMyPosts)

module.exports = UserRoutes;
