const express = require("express");
const cors = require("cors");
const DbCon = require("./config/db/DbCon");
const UserRoutes = require("./routes/UserRoutes");
const { notFound, errorHandler } = require("./middlewares/ErrHandler");
require("dotenv").config();

const app = express();


const port = process.env.PORT || 4000;

// Databas connection
DbCon();

// regular middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// const corsOptions = {
//   origin: "https://(https://proaffiliate.vercel.app)", // Allow this origin
//   methods: ["GET", "POST", "OPTIONS"], // Specify allowed methods
//   allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
//   credentials: true, // Allow credentials if needed
// }; // allow cross origin requests from client side (browser) to server side
// app.use(cors(corsOptions)); // Apply CORS
// app.options("*", cors(corsOptions));

// routes
app.use(cors());
app.use("/api/user/", UserRoutes);

// handling errors
app.use(notFound);
app.use(errorHandler);

// listen on port
const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
