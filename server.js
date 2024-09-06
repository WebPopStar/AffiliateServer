const express = require("express");
const cors = require("cors");
const DbCon = require("./config/db/DbCon");
const UserRoutes = require("./routes/UserRoutes");
const { notFound, errorHandler } = require("./middlewares/ErrHandler");
require("dotenv").config();

const app = express();
app.get("/redirect", async (req, res) => {
  res.redirect(302, "http://localhost:5173/homepage");
  // return;
});

const port = process.env.PORT || 4000;

// Databas connection
DbCon();

// regular middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = ["https://*"];
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "OPTIONS"], // Specify allowed methods
    credentials: true, // Allow credentials if needed
  })
); // allow cross origin requests from client side (browser) to server side

// routes
app.use("/api/user/", UserRoutes);

// handling errors
app.use(notFound);
app.use(errorHandler);

// listen on port
const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
