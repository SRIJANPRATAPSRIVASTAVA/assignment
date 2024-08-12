const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path")
const bannerRoutes = require("./routes/banner.routes")
require("dotenv").config();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());


const __dirname1 = path.resolve()

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname1, "../frontend/dist")))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"))
    })
} else {
    app.use('/', (req, res) => {
        res.status(200).json({
            success: true
        })
    });
}

// endpoints
app.use("/api", bannerRoutes)

app.listen(PORT, () => {
    console.log("app is running on PORT : ", PORT);
})