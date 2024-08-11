const express = require("express");
const app = express();
const cors = require("cors");
const bannerRoutes = require("./routes/banner.routes")
require("dotenv").config();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// test
app.use('/test', (req, res) => {
    res.status(200).json({
        success: true
    })
});

app.listen(PORT, () => {
    console.log("app is running on PORT : ", PORT);
})