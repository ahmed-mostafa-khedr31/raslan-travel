const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
var jwt = require("jsonwebtoken");

require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const homeRoutes = require("./routes/home.route");
const aboutRoutes = require("./routes/aboutRoutes");
const usersRoutes = require("./routes/users.route");
const { httpStatus, httpMessage } = require("./utils/httpStatus");

const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5000",
  "http://localhost:5173",
  "http://localhost:4173",
  "https://raslan-travel.vercel.app",
];

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // to access the images from the uploads folder
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

function getMongoUri() {
  return `${process.env.MONGODB_URI}`;
}
let connectionPromise;
function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return Promise.resolve();
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(getMongoUri(), {
        family: 4,
        serverSelectionTimeoutMS: 8000,
      })
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((err) => {
        connectionPromise = null;
        throw err;
      });
  }

  return connectionPromise;
}

connectDB().catch((err) => {
  console.log(err);
});
// http://localhost:5000/swagger
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: httpMessage.INTERNAL_SERVER_ERROR,
      error: err.message ?? httpMessage.INTERNAL_SERVER_ERROR,
    });
  }
});

app.get("/", (req, res) => {
  res.status(httpStatus.OK).json({
    message: httpMessage.SUCCESS,
    error: null,
  });
});

app.use("/api/home", homeRoutes);
app.use("/api", usersRoutes);
app.use("/api/about", aboutRoutes);

app.use((req, res) => {
  console.log(req.path);
  res.status(httpStatus.NOT_FOUND).json({
    message: httpMessage.ROUTE_NOT_FOUND,
    error: null,
  });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Swagger is running on http://localhost:${port}/swagger`);
});
