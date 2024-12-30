const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

connectDb();
const app = express();

app.use(express.json());
app.use("/api/register",require("./routes/registrationroutes"));
app.use("/api/users",require("./routes/userRoutes"));
app.use(errorHandler);
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
