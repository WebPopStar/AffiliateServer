const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UsersModel = mongoose.Schema(
	{
		fullName: {
			type: String,
			required: [true, "Please enter your full name."],
		},
		email: {
			type: String,
			// unique: true,
			requried: [true, "Please enter your email."],
		},
		password: {
			type: String,
			required: [true, "Please enter a new password"],
		},
		phoneNumber: {
			type: String,
			required: [true, "Please enter a your phone number."],
		},
		country: {
			type: String,
			required: [true, "Please enter a your coutnry"],
		},
		affiliateId: {
			type: String,
		},
		postCount: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// populate the posts
UsersModel.virtual("Posts", {
	ref: "Post",
	foreignField: "author",
	localField: "_id",
});
// encrypt password before saving
UsersModel.pre("save", async function (next) {
	// Only run this line if password gets modded but not on other update functions
	if (!this.isModified("password")) return next();

	// hash password with strength of 10
	const saltRounds = 10;
	// vs code might suggest await is unneccessary so remove it but then the hashing won't work(tried and tested)
	this.password = await bcrypt.hash(this.password, saltRounds);

	// affilitId generate
	const d = new Date();
	let year = d.getFullYear();
	let month = d.getMonth();
	const ida = this.email
    const aaa = ida.split("@",1)
    // console.log(ida)
	let affiliateId = year + "" + month + this.email + aaa;
    // console.log(affiliateId)
	this.affiliateId = affiliateId;
	next();
});

UsersModel.methods.CheckPass = async function (pass) {
	return await bcrypt.compare(pass, this.password);
};

const Users = mongoose.model("Users", UsersModel);
module.exports = Users;
