const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const router = express.Router();
const sequelize=require('./utils/db');
app.use(express.json());
app.use(cors());

const Home = require("./controllers/controller");
const LoginRoute = require("./routes/LoginRoute");
const RegisterRoute = require("./routes/RegisterRoute");
const verifyToken = require("./middleware/middleware");
const RecipeRoute = require("./routes/RecipeRoute");
const collectionRoutes = require('./routes/collection');
const followRoutes = require('./routes/followRoute');

// app.use("/", router);
// app.use('/followers', followRoutes);
// app.use('/favorites', collectionRoutes);
app.use("/auth", LoginRoute);
app.use("/auth", RegisterRoute);
app.use("/recipes", RecipeRoute);


// router.get("/", verifyToken, Home.Home);


module.exports = router;


sequelize
.sync({ alter: true })
.then(d=>{
    app.listen(process.env.PORT,()=>{
        console.log("server running at default 3002 port")
    })
}).catch(e=>{
    console.log(e)
})
