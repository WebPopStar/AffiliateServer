const expressAsyncHandler = require("express-async-handler");
const Users = require("../../models/UsersModel");
const getToken = require("../../config/token/GetToken");

const Login = expressAsyncHandler(async (req, res) => {
	const { affiliateId, password } = req.body;
	const user = await Users.findOne({ affiliateId });
	console.log(user);
	if (!user) throw new Error("Affiliate or Password not correct.");
	if (await user.CheckPass(password)) {
		res.json({
			name: user.fullName,
			token: getToken(user._id),
			message: "Login Successful",
		});	
	} else {
		res.status(500)
		throw new Error("Invalid Password");
	}
});
module.exports = Login;
